import { EditResourceInput } from '@components/edit-resource/edit-resource-input.component';
import { EditorToolbar } from '@components/editor-toolbar/editor-toolbar';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { defaultInformationFields } from '@config/defaults';
import resources, { apiService } from '@config/resources';
import { AssistantSetting } from '@data-contracts/backend/data-contracts';
import EditLayout from '@layouts/edit-layout/edit-layout.component';
import { useUserStore } from '@services/user-service/user-service';
import { Button, FormControl, FormLabel, Icon, Input, useSnackbar } from '@sk-web-gui/react';
import { getFormattedFields } from '@utils/formatted-field';
import { useRouteGuard } from '@utils/routeguard.hook';
import { useCrudHelper } from '@utils/use-crud-helpers';
import { useResource } from '@utils/use-resource';
import { Key } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { capitalize } from 'underscore.string';
import { useShallow } from 'zustand/react/shallow';

export const EditAssistant: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { resource: _resource, id: _id } = useParams();
  const resource = 'assistants';

  const { create, update, getOne, defaultValues } = resources[resource];
  const { refresh } = useResource(resource);

  const { handleGetOne, handleCreate, handleUpdate } = useCrudHelper(resource);

  type DataType = Partial<AssistantSetting>;

  const form = useForm<DataType>({
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    reset,
    watch,
    register,
    setValue,
    formState: { isDirty, dirtyFields },
  } = form;

  const id = _id === 'new' ? undefined : parseInt(_id as string, 10);

  const user = useUserStore(useShallow((state) => state.user));
  const snack = useSnackbar();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(!id);
  const [navigate, setNavigate] = useState<boolean>(false);

  const formdata = getFormattedFields(watch());
  const [hasApiKey, setHasApiKey] = useState<boolean>(formdata.apiKey && !dirtyFields.apiKey);

  const [apiKeyError, setApiKeyError] = useState<string>('');

  useRouteGuard(isDirty);

  const generateKey = () => {
    if (!formdata.assistantId) {
      setApiKeyError(capitalize(t('assistants:error.apiKey.assistantId')));
    } else if (!user.apiKey) {
      setApiKeyError(capitalize(t('assistants:error.apiKey.apiKey')));
    } else {
      apiService
        .adminApiKeyControllerGetApiKey(formdata.assistantId)
        .then((res) => {
          if (res.data) {
            setValue('apiKey', res.data.data);
          }
        })
        .catch((e) => {
          snack({
            message: capitalize(t('crud:get_one.error', { resource: t('assistants:properties.apiKey') })),
            status: 'error',
          });
          if (e.response.status === 403) {
            setApiKeyError(capitalize(t('assistants:error.apiKey.forbidden')));
          } else if (e.response.status === 401) {
            setApiKeyError(capitalize(t('assistants:error.apiKey.unauthorized')));
          } else {
            setApiKeyError(capitalize(t('assistants:error.apiKey.servererror')));
          }
        });
    }
  };
  useEffect(() => {
    setHasApiKey(formdata.apiKey && !dirtyFields.apiKey);
  }, [loaded]);

  useEffect(() => {
    setNavigate(false);
    if (id) {
      setIsNew(false);
    }
  }, [id]);

  const newApiKey = () => {
    setValue('apiKey', '');
    setHasApiKey(false);
  };

  useEffect(() => {
    if (id) {
      handleGetOne(() => getOne(id)).then((res) => {
        reset(res);
        setIsNew(false);
        setLoaded(true);
      });
    } else {
      reset(defaultValues);
      setIsNew(true);
      setLoaded(true);
    }
  }, [id]);

  useEffect(() => {
    if (navigate) {
      router.push(`/${resource}/${formdata?.id}`);
    }
  }, [navigate]);

  useEffect(() => {
    if (formdata.id && isNew && !isDirty) {
      setNavigate(true);
    }
  }, [formdata?.id, isNew, isDirty]);

  const onSubmit = (data: DataType) => {
    switch (isNew) {
      case true:
        handleCreate(() => create(data)).then((res) => {
          if (res) {
            reset(res);
            setHasApiKey(true);
            refresh();
          }
        });

        break;
      case false:
        if (id) {
          const updateData = hasApiKey ? { app: data.app, assistantId: data.assistantId } : data;
          handleUpdate(() => update(id, updateData)).then((res) => {
            reset(res);
            setHasApiKey(true);
            refresh();
          });
        }
        break;
    }
  };

  return !loaded ?
      <LoaderFullScreen />
    : <EditLayout
        headerInfo={
          !isNew ?
            <ul className="text-small flex gap-16">
              {defaultInformationFields.map((field, index) => (
                <li key={index + field}>
                  <strong>{capitalize(t(`common:${field}`))}: </strong>
                  {formdata?.[field]}
                </li>
              ))}
            </ul>
          : undefined
        }
        title={
          isNew ?
            capitalize(t('common:create_new', { resource: t(`assistants:name_one`) }))
          : capitalize(t('common:edit', { resource: t(`assistants:name_one`) }))
        }
        backLink={`/${resource}`}
      >
        <FormProvider {...form}>
          <form className="flex flex-row gap-32 justify-between grow flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <EditorToolbar resource={resource} isDirty={isDirty} id={id} />
            <div className="flex flex-col gap-32 grow mb-32">
              <EditResourceInput
                property={'app'}
                index={0}
                required
                label={capitalize(t(`assistants:properties.app`))}
              />
              <EditResourceInput
                property={'assistantId'}
                index={1}
                required
                label={capitalize(t(`assistants:properties.assistantId`))}
              />
              <FormControl className="min-w-[32rem]" required>
                <FormLabel>{capitalize(t('assistants:properties.apiKey'))}</FormLabel>
                <div className="flex gap-12 items-center">
                  <Input {...register('apiKey')} disabled={hasApiKey} />
                  {hasApiKey && (
                    <Button size="sm" onClick={() => newApiKey()}>
                      {capitalize(t('assistants:new-apiKey'))}
                    </Button>
                  )}
                </div>
                {user.apiKey && (
                  <Button
                    onClick={() => generateKey()}
                    className="w-fit"
                    variant="secondary"
                    disabled={hasApiKey}
                    leftIcon={<Icon icon={<Key />} />}
                  >
                    {capitalize(t('assistants:generate-apiKey'))}
                  </Button>
                )}
                {apiKeyError && <div className="text-small font-bold">{apiKeyError}</div>}
              </FormControl>
            </div>
          </form>
        </FormProvider>
      </EditLayout>;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crud', 'layout', ...Object.keys(resources)])),
  },
});

export default EditAssistant;
