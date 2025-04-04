import resources from '@config/resources';
import { Button, cx, FormControl, FormErrorMessage, FormLabel, Input } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import { EditResourceObject } from './edit-resource-object.component';
import { Plus, Minus } from 'lucide-react';
import { fieldpathWithoutIndex } from '@utils/fieldpath-without-index';
import { ResourceName } from '@interfaces/resource-name';
import { useEffect } from 'react';

interface EditResourceArrayProps {
  property: string;
  resource: ResourceName;
  parents?: string;
  level?: number;
}

export const EditResourceArray: React.FC<EditResourceArrayProps> = ({
  property,
  resource,
  parents,
  level: _level = 2,
}) => {
  const { create, update, defaultValues, requiredFields } = resources[resource];
  const level = _level > 6 ? 6 : _level;

  const { t } = useTranslation();

  type CreateType = Parameters<typeof create>[0];
  type UpdateType = Parameters<typeof update>[1];
  type DataType = CreateType | UpdateType;

  const dataTypeKey = parents ? `${parents}.${property}` : property;
  const i18nKey = fieldpathWithoutIndex(dataTypeKey) as string;

  const {
    register,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext<DataType>();

  const formdata = watch(dataTypeKey as keyof DataType);

  const addEntry = () => {
    if (Array.isArray(formdata)) {
      const newEntry = dataTypeKey.split('.').reduce((entries, part) => {
        const numberTest = new RegExp(/^\d+$/);
        const property = numberTest.test(part) ? 0 : part;
        return entries?.[property] || defaultValues?.[property];
      }, []);
      const entries = [...formdata, ...(Array.isArray(newEntry) ? newEntry : [newEntry])];
      setValue(dataTypeKey as keyof DataType, entries as unknown as DataType[keyof DataType]);
    }
  };

  const removeEntry = (index: number) => {
    if (Array.isArray(formdata)) {
      const entries = [...formdata];
      entries.splice(index, 1);
      setValue(dataTypeKey as keyof DataType, entries as unknown as DataType[keyof DataType]);
    }
  };

  useEffect(() => {
    if (fieldpathWithoutIndex(requiredFields).includes(i18nKey)) {
      if (formdata.length < 1) {
        setError(dataTypeKey as keyof DataType, {
          message: t('common:required', { resource: capitalize(t(`${resource}:properties.${i18nKey}.DEFAULT_many`)) }),
        });
      } else {
        setError(dataTypeKey as keyof DataType, null);
      }
    }
  }, [formdata]);

  const error = dataTypeKey.split('.').reduce((errorpart, key) => {
    return errorpart ? errorpart?.[key] : errors?.[key];
  }, undefined);

  const Headercomp: React.ElementType = `h${level}` as React.ElementType;

  return (
    <div className="flex flex-col gap-16">
      <header className="flex gap-24">
        <Headercomp className={cx('font-header', level < 3 ? 'text-h3-lg' : 'text-h4-md')}>
          {capitalize(t(`${resource}:properties.${i18nKey}.DEFAULT_many`))}
        </Headercomp>
        <Button size="sm" color="success" leftIcon={<Plus />} onClick={() => addEntry()}>
          {capitalize(t('common:add'))} {t(`${resource}:properties.${i18nKey}.DEFAULT`)}
        </Button>
      </header>
      {error?.message && (
        <FormErrorMessage className="font-bold text-error-text-primary">{error.message}</FormErrorMessage>
      )}
      {Array.isArray(formdata) &&
        formdata.map((item, index) => {
          const type = typeof item;
          const isRequired = fieldpathWithoutIndex(requiredFields).includes(i18nKey);
          if (type === 'string' || type === 'number') {
            return (
              <div key={`res-array-${index}`} className="flex justify-between items-start">
                <FormControl key={`formc-${index}`} required={isRequired}>
                  <FormLabel>{capitalize(t(`${resource}:properties.${i18nKey}`))}</FormLabel>
                  <Input
                    type={type === 'number' ? 'number' : 'text'}
                    {...register(`${dataTypeKey}.${index}` as keyof DataType)}
                  />
                </FormControl>
                <Button
                  size="sm"
                  rounded
                  color="error"
                  iconButton
                  aria-label={capitalize(t('common:remove_resource'), {
                    resource: t(`${resource}:properties.${i18nKey}.DEFAULT`),
                  })}
                  onClick={() => removeEntry(index)}
                >
                  <Minus />
                </Button>
              </div>
            );
          }
          if (type === 'object') {
            return Array.isArray(item) ?
                <EditResourceArray
                  key={`res-array-${index}`}
                  resource={resource}
                  parents={parents ? `${parents}.${property}` : property}
                  level={level + 1}
                  property={index.toString()}
                />
              : <EditResourceObject
                  key={`res-array-${index}`}
                  resource={resource}
                  parents={parents ? `${parents}.${property}` : property}
                  level={level + 1}
                  property={index.toString()}
                  index={index}
                  removable
                  onRemove={() => removeEntry(index)}
                />;
          }
        })}
    </div>
  );
};
