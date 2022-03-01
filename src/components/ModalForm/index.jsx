import React from 'react';

import { Button, Image, Modal, Upload, Space } from 'antd';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ProForm, {
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProSkeleton from '@ant-design/pro-skeleton';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

const ModalForm = (props) => {
  const {
    showModal,
    titleModal,
    widthModal,
    handleCancelModel,
    formRef,
    buttonSubmitter,
    handleSubmitForm,
    formField,
    beforeUpload,
    onChange,
    customUpload,
    imgLinkFirebase,
    stateEditor,
    handleChangeStateEditor,
    editorRef,
    handleUploadImgInEditor,
  } = props;
  const Quill = ReactQuill.Quill;
  let AlignStyle = Quill.import('attributors/style/align');
  let BackgroundStyle = Quill.import('attributors/style/background');
  let ColorStyle = Quill.import('attributors/style/color');
  let DirectionStyle = Quill.import('attributors/style/direction');
  let FontStyle = Quill.import('attributors/style/font');
  let SizeStyle = Quill.import('attributors/style/size');

  let Font = Quill.import('formats/font');

  Font.whitelist = ['asap', 'roboto'];
  Quill.register(Font, true);

  Quill.register(AlignStyle, true);
  Quill.register(BackgroundStyle, true);
  Quill.register(ColorStyle, true);
  Quill.register(DirectionStyle, true);
  Quill.register(FontStyle, true);
  Quill.register(SizeStyle, true);

  const handleCancelModelChild = (valuses) => {
    if (handleCancelModel) {
      handleCancelModel();
    }
  };
  const handleSubmitFormChild = async (values) => {
    if (handleSubmitForm) {
      await handleSubmitForm(values);
    }
  };
  const handleButtonResetForm = (value) => {
    if (value) {
      value.form?.resetFields();
    }
  };
  const handleButtonSubmitForm = (value) => {
    if (value) {
      value.form?.submit();
    }
  };

  const handleChangeImgChild = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const beforeUploadChild = (file) => {
    if (beforeUpload) {
      beforeUpload(file);
    }
  };

  const handleChangeStateEditorChild = (state) => {
    if (handleChangeStateEditor) {
      handleChangeStateEditor(state);
    }
  };

  const customUploadChild = (e) => {
    if (customUpload) {
      customUpload(e);
    }
  };

  const handleImg = () => {
    handleUploadImgInEditor();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Modal
        visible={showModal}
        title={titleModal}
        centered={true}
        width={widthModal ? widthModal : ''}
        onCancel={() => handleCancelModelChild()}
        footer={[
          <Button key="cancelModel" type="danger" onClick={() => handleCancelModelChild()}>
            Cancel
          </Button>,
        ]}
      >
        {
          <ProForm
            // form={form}
            onReset={true}
            formRef={formRef}
            submitter={{
              render: (props, doms) => {
                return [
                  <>
                    {buttonSubmitter?.map((button) => (
                      <Button
                        key={button?.key}
                        type={button?.type}
                        onClick={
                          button?.click === 'submit'
                            ? () => handleButtonSubmitForm(props)
                            : () => handleButtonResetForm(props)
                        }
                        loading={button?.loading}
                      >
                        {button?.name}
                      </Button>
                    ))}
                  </>,
                ];
              },
            }}
            onFinish={async (values) => await handleSubmitFormChild(values)}
          >
            {formField?.map((item) => (
              <>
                {item?.fieldType === 'formText' && (
                  <ProForm.Group>
                    <ProFormText
                      key={item?.key}
                      label={item?.label}
                      width={item?.width}
                      placeholder={item?.placeholder}
                      name={item?.name}
                      rules={[
                        {
                          required: item?.requiredField,
                          message: item?.ruleMessage,
                        },
                      ]}
                    />
                  </ProForm.Group>
                )}
                {item?.fieldType === 'formSelect' && (
                  <ProForm.Group>
                    <ProFormSelect
                      name={item?.name}
                      label={item?.label}
                      options={item?.valueEnum?.map((valueItem) => ({
                        label: valueItem.valueDisplay,

                        value: valueItem.valueName,
                      }))}
                      placeholder={item?.placeholder}
                      rules={[
                        {
                          required: item?.requiredField,
                          message: item?.ruleMessage,
                        },
                      ]}
                    />
                  </ProForm.Group>
                )}
                {item?.fieldType === 'formCalendar' && (
                  <ProForm.Group>
                    <ProFormDigit
                      name={item?.nameTimeDay}
                      label={item?.labelTimeDay}
                      min={item?.minTimeDay}
                      max={item?.maxTimeDay}
                      placeholder={item?.placeholderTimeDay}
                    />
                    <ProFormDigit
                      name={item?.nameTimeMonth}
                      label={item?.labelTimeMonth}
                      min={item?.minTimeMonth}
                      max={item?.maxTimeMonth}
                      placeholder={item?.placeholderTimeMonth}
                    />
                  </ProForm.Group>
                )}
                {item?.fieldType === 'formInputFileImg' && (
                  <ProForm.Group>
                    <ProFormText
                      key={item?.key}
                      label={item?.label}
                      width={item?.width}
                      placeholder={item?.placeholder}
                      name={item?.name}
                      rules={[
                        {
                          required: item?.requiredField,
                          message: item?.ruleMessage,
                        },
                      ]}
                      readonly={item?.readonly}
                    />

                    <Upload
                      name={item?.nameUpload}
                      beforeUpload={beforeUploadChild}
                      onChange={handleChangeImgChild}
                      customRequest={customUploadChild}
                      maxCount={1}
                    >
                      <Space
                        size="middle"
                        align="center"
                        style={{
                          marginBottom: '20px',
                        }}
                      >
                        <Image
                          width={100}
                          height={100}
                          src="error"
                          fallback="data:image/png;base64,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"
                        />
                      </Space>
                    </Upload>
                    {imgLinkFirebase && (
                      <Space
                        size="middle"
                        align="center"
                        style={{
                          marginBottom: '20px',
                        }}
                      >
                        <Image width={100} src={imgLinkFirebase} />
                      </Space>
                    )}
                  </ProForm.Group>
                )}
                {item?.fieldType === 'formTextArea' && (
                  <ProForm.Group>
                    <ProFormTextArea
                      key={item?.key}
                      label={item?.label}
                      width={item?.width}
                      placeholder={item?.placeholder}
                      name={item?.name}
                      rules={[
                        {
                          required: item?.requiredField,
                          message: item?.ruleMessage,
                        },
                      ]}
                    />
                  </ProForm.Group>
                )}
                {item?.fieldType === 'zodiacEditorMainContent' && (
                  <>
                    <ReactQuill
                      ref={editorRef}
                      value={stateEditor}
                      modules={{
                        toolbar: {
                          container: [
                            [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
                            [{ size: [] }],
                            [
                              { align: '' },
                              { align: 'center' },
                              { align: 'right' },
                              { align: 'justify' },
                            ],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link'],
                            ['image'],
                          ],
                          handlers: {
                            image: handleImg,
                          },
                        },
                      }}
                      formats={[
                        'header',
                        'font',
                        'size',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'bullet',
                        'indent',
                        'link',
                        'image',
                        'color',
                        'align',
                      ]}
                      onChange={(state) => handleChangeStateEditorChild(state)}
                    />

                    <ProForm.Group
                      style={{
                        display: 'none',
                      }}
                    >
                      <ProFormTextArea name={item?.nameTextArea} />
                    </ProForm.Group>
                  </>
                )}
                {item?.fieldType === 'checkEdit' && (
                  <ProForm.Group
                    style={{
                      display: 'none',
                    }}
                  >
                    <ProFormText name={item?.name} initialValue={item?.value} />
                  </ProForm.Group>
                )}
              </>
            ))}
          </ProForm>
        }
      </Modal>
    </>
  );
};

export default React.memo(ModalForm);
