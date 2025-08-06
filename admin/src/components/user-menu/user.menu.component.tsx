import { Avatar, ColorSchemeMode, Icon, PopupMenu } from '@sk-web-gui/react';
import { Check, ChevronRight, Monitor, Moon, Sun, Settings } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import React from 'react';
import { capitalize } from 'underscore.string';
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '@services/user-service/user-service';
import { useLocalStorage } from '@utils/use-localstorage.hook';

export const UserMenu: React.FC = () => {
  const user = useUserStore(useShallow((state) => state.user));
  const [colorScheme, setColorScheme] = useLocalStorage(
    useShallow((state) => [state.colorScheme, state.setColorScheme])
  );
  const { t } = useTranslation();

  const colorSchemeIcons: Record<ColorSchemeMode, React.JSX.Element> = {
    light: <Sun />,
    dark: <Moon />,
    system: <Monitor />,
  };

  return (
    <PopupMenu>
      <PopupMenu.Button variant="tertiary" showBackground={false} className="justify-start">
        <Avatar
          initials={`${user.name
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('')}`}
          size="sm"
          rounded
        />
        {user.name}
      </PopupMenu.Button>
      <PopupMenu.Panel className="w-full" position="over">
        <PopupMenu.Items>
          <PopupMenu.Group>
            <PopupMenu.Item>
              <NextLink href="/settings">
                <Icon icon={<Settings />} />
                {capitalize(t('layout:settings'))}
              </NextLink>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <PopupMenu>
                <PopupMenu.Button rightIcon={<ChevronRight />} className="!justify-between">
                  <span className="flex gap-16">
                    {colorSchemeIcons[colorScheme]}
                    {capitalize(t('layout:color_scheme'))}
                  </span>
                </PopupMenu.Button>
                <PopupMenu.Panel>
                  <PopupMenu.Items>
                    {Object.keys(colorSchemeIcons).map((scheme: ColorSchemeMode) => (
                      <PopupMenu.Item key={`cs-${scheme}`}>
                        <button
                          onClick={() => setColorScheme(scheme)}
                          role="menuitemradio"
                          aria-checked={scheme === colorScheme}
                          className="!justify-between min-w-[20rem]"
                        >
                          <span className="flex gap-12">
                            {colorSchemeIcons[scheme]}
                            {capitalize(t(`layout:color_schemes.${scheme}`))}
                          </span>
                          {scheme === colorScheme && <Icon.Padded size={18} rounded icon={<Check />} />}
                        </button>
                      </PopupMenu.Item>
                    ))}
                  </PopupMenu.Items>
                </PopupMenu.Panel>
              </PopupMenu>
            </PopupMenu.Item>
          </PopupMenu.Group>
          <PopupMenu.Item>
            <NextLink href="/logout">{capitalize(t('common:logout'))}</NextLink>
          </PopupMenu.Item>
        </PopupMenu.Items>
      </PopupMenu.Panel>
    </PopupMenu>
  );
};
