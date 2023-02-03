import { Button, Row, Space, Typography } from 'antd';
import SoundFallback from 'assets/icon/sound.png';
import InputField from 'components/molecules/inputField';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { InnerFormProps, OuterFormProps } from 'types/form';
import convertFileToBlob from 'utils/convertFileToBlob';

import { Fields } from '.';
import { getFields } from './config';
import sm from './styles.module.scss';

interface Props {
  isPartial?: boolean;
}

export type Inner = InnerFormProps<Props>;

export type Outer = OuterFormProps<Props, Fields>;

const spaceStyles = {
  width: '100%'
};

const EditForm = ({
  handleSubmit,
  isPartial,
  invalid,
  submitting,
  change
}: Inner) => {
  const pictureInputRef = useRef<Nullable<HTMLInputElement>>(null);

  const fields = useMemo(() => getFields(isPartial), [isPartial]);

  const handleChangePictureClick = useCallback(() => {
    if (pictureInputRef.current) {
      pictureInputRef.current.click();
    }
  }, []);

  const handlePictureInputChange = useCallback(
    async ({ target: { files } }) => {
      if (!files.length) return;
      const blob = await convertFileToBlob(files[0]);
      change('picture', blob);
    },
    [change]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" size="large" style={spaceStyles}>
        {fields.map(field => (
          <Row key={field.name}>
            <Field
              component={InputField}
              {...((field as unknown) as Field)}
              props={field}
            />
          </Row>
        ))}
        <Row>
          <Field
            name="picture"
            component={memo(({ input }: WrappedFieldProps) => (
              <>
                <input
                  onChange={handlePictureInputChange}
                  type="file"
                  accept="image/*"
                  hidden
                  ref={pictureInputRef}
                />
                <button
                  type="button"
                  className={sm.Upload}
                  onClick={handleChangePictureClick}
                >
                  <Typography.Title level={3} className={sm.Upload_Text}>
                    Змінити обкладинку
                  </Typography.Title>
                  <img
                    className={sm.Upload_Img}
                    src={
                      input.value
                        ? URL.createObjectURL(input.value)
                        : SoundFallback
                    }
                    alt="sound cover"
                  />
                </button>
              </>
            ))}
          />
        </Row>
      </Space>
      <Button
        className={sm.Btn}
        disabled={invalid || submitting}
        type="primary"
        htmlType="submit"
      >
        Редагувати
      </Button>
    </form>
  );
};

export default memo(EditForm);
