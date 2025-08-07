import { Menu } from '@components/menu/menu';
import { UserMenu } from '@components/user-menu/user.menu.component';
import { Logo } from '@sk-web-gui/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import NextLink from 'next/link';

interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
  postTitle?: string;
  headerSubtitle?: string;
  logoLinkHref?: string;
}

export default function DefaultLayout({ title, postTitle, headerSubtitle, children }: DefaultLayoutProps) {
  const layoutTitle = `${process.env.NEXT_PUBLIC_APP_NAME} admin${headerSubtitle ? ` - ${headerSubtitle}` : ''}`;
  const fullTitle = postTitle ? `${layoutTitle} - ${postTitle}` : `${layoutTitle}`;

  const { t } = useTranslation();

  const setFocusToMain = () => {
    const contentElement = document.getElementById('content');
    contentElement.focus();
  };

  return (
    <div className="DefaultLayout full-page-layout">
      <Head>
        <title>{title ? title : fullTitle}</title>
        <meta name="description" content={`${process.env.NEXT_PUBLIC_APP_NAME} admin`} />
      </Head>

      <NextLink
        href="#content"
        passHref
        onClick={setFocusToMain}
        accessKey="s"
        className="next-link-a"
        data-cy="systemMessage-a"
      >
        {t('layout:header.goto_content')}
      </NextLink>

      <div className="flex w-full min-h-screen h-full">
        <nav className="flex flex-col justify-between p-24 shadow-100 bg-background-content min-h-full">
          <div className="flex flex-col gap-24">
            <NextLink href="/">
              <Logo title={process.env.NEXT_PUBLIC_APP_NAME} className="rounded-button" />
            </NextLink>
            <Menu />
          </div>
          <div className="relative flex flex-col w-full">
            <UserMenu />
          </div>
        </nav>

        <div className="flex-grow relative w-full flex max-h-screen overflow-hidden">
          <div className="px-24 py-16 md:py-28 md:px-40 grow max-h-full overflow-y-scroll">{children}</div>
        </div>
      </div>
    </div>
  );
}
