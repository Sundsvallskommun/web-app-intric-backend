import { useTranslation } from 'react-i18next';
import { EditLayout } from '../layouts/edit-layout/edit-layout.component';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { capitalize } from 'underscore.string';
import resources from '@config/resources';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@data-contracts/backend/data-contracts';
import { useUserStore } from '@services/user-service/user-service';
import { useShallow } from 'zustand/react/shallow';
import { Api } from '@data-contracts/backend/Api';
import { useCrudHelper } from '@utils/use-crud-helpers';
import { FormControl, FormLabel, Input, Button, Icon } from '@sk-web-gui/react';
import { Save } from 'lucide-react';

export const UserSettings: React.FC = () => {
  const { t } = useTranslation();
  const user = useUserStore(useShallow((state) => state.user));
  const form = useForm<User>({ defaultValues: { ...user } });
  const { handleUpdate } = useCrudHelper('usersettings');
  const apiService = new Api({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    withCredentials: true,
  });
  const update = apiService.adminUserControllerUpdateUser;
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = form;
  const apiKey = watch('apiKey');

  const hasApiKey = apiKey && !isDirty;

  const newApiKey = () => {
    setValue('apiKey', '');
  };

  const onSubmit = (data: User) => {
    handleUpdate(() => update(data)).then((res) => {
      reset(res);
    });
  };

  return (
    <EditLayout title={capitalize(t('usersettings:name_many'))}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-32">
          <FormControl>
            <FormLabel>{t('usersettings:properties.apiKey')}</FormLabel>
            <Input.Group>
              <Input {...register('apiKey')} readOnly={hasApiKey} />
              {hasApiKey && (
                <Input.RightAddin>
                  <Button size="sm" onClick={() => newApiKey()}>
                    {capitalize(t('usersettings:new-apiKey'))}
                  </Button>
                </Input.RightAddin>
              )}
            </Input.Group>
          </FormControl>
          <Button type="submit" className="w-fit" disabled={!isDirty} leftIcon={<Icon icon={<Save />} />}>
            {capitalize(t('common:save'))}
          </Button>
        </form>
      </FormProvider>
    </EditLayout>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'crud', 'usersettings', ...Object.keys(resources)])),
  },
});

export default UserSettings;
