import React from 'react';
import { Button, message, Space, Image } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ModalForm from '@/components/ModalForm';
import { uploadFile } from '@/utils/uploadFile';
import {
  addZodiac,
  getZodiacs,
  deleteZodiac,
  updateZodiac,
} from '@/services/ant-design-pro/zodiac';
import showConfirm from '@/components/ModalConfirm';

const Zodiac = () => {
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
      width: '25%',
    },
    {
      title: 'Zodiac Name',
      dataIndex: 'name',
      copyable: true,
      sorter: (a, b) => a.zodiacName.localeCompare(b.zodiacName),
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter Zodiac Name to search',
          },
        ],
      },
      width: '25%',
    },

    {
      title: 'Zodiac Icon',
      dataIndex: 'icon',
      copyable: true,
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <Image width={50} src={record.icon} />
          </Space>
        );
      },
      width: '25%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      search: false,
      render: (_, record) => {
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '50%',
                marginRight: '8px',
              }}
            >
              <Button
                key="editZodiac"
                type="primary"
                size="middle"
                block={true}
                icon={<EditOutlined />}
                onClick={() => handleEditZodiacForm(record)}
              >
                Edit
              </Button>
            </div>
            <div
              style={{
                width: '50%',
              }}
            >
              <Button
                key="deleteZodiac"
                type="danger"
                size="middle"
                block="true"
                icon={<DeleteOutlined />}
                onClick={() => handleOkDeleteZodiac(record)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      },
      width: '25%',
    },
  ];

  const buttonSubmitter = [
    {
      key: 'clearFieldFormZodiac',
      type: 'default',
      click: 'reset',
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddZodiac',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
      loading: false,
    },
  ];

  const formFieldAdd = [
    {
      fieldType: 'formText',
      key: 'fieldAddZodiacName',
      label: 'Zodiac Name',
      width: 'lg',
      placeholder: 'Enter Zodiac Name',
      name: 'zodiacName',
      requiredField: 'true',
      ruleMessage: 'Input Zodiac Name before submit',
    },
    {
      fieldType: 'formCalendar',
      labelTimeDay: 'Zodiac Time Day Start',
      nameTimeDay: 'zodiacDayStart',
      minTimeDay: '1',
      maxTimeDay: '31',
      placeholderTimeDay: 'Zodiac Day Start',
      controlsTimeDay: 'false',

      labelTimeMonth: 'Zodiac Time Month Start',
      nameTimeMonth: 'zodiacMonthStart',
      minTimeMonth: '1',
      maxTimeMonth: '12',
      placeholderTimeMonth: 'Zodiac Month Start',
      controlsTimeMonth: 'false',
    },
    {
      fieldType: 'formCalendar',
      labelTimeDay: 'Zodiac Time Day End',
      nameTimeDay: 'zodiacDayEnd',
      minTimeDay: '1',
      maxTimeDay: '31',
      placeholderTimeDay: 'Zodiac Day End',
      controlsTimeDay: 'false',

      fieldType: 'formCalendar',
      labelTimeMonth: 'Zodiac Time Month End',
      nameTimeMonth: 'zodiacMonthEnd',
      minTimeMonth: '1',
      maxTimeMonth: '12',
      placeholderTimeMonth: 'Zodiac Month End',
      controlsTimeMonth: 'false',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Zodiac Icon',
      width: 'lg',
      placeholder: 'Icon Link',
      name: 'zodiacIcon',
      nameUpload: 'iconZodiac',
      nameInputFile: 'zodiacFileToFirebase',
      readOnly: 'true',
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddZodiacDescription',
      label: 'Description',
      width: 'lg',
      placeholder: 'Enter Zodiac description',
      name: 'zodiacDescription',
      requiredField: 'true',
      ruleMessage: 'Input description before submit',
    },
    {
      fieldType: 'EditorMainContent',
      nameTextArea: 'zodiacMainContent',
    },
  ];

  const formFieldEdit = [
    {
      fieldType: 'formText',
      key: 'fieldEditZodiacName',
      label: 'Zodiac Name',
      width: 'lg',
      placeholder: 'Enter Zodiac Name',
      name: 'name',
      requiredField: 'true',
      ruleMessage: 'Input Zodiac Name before submit',
    },
    {
      fieldType: 'formCalendar',
      labelTimeDay: 'Zodiac Time Day Start',
      nameTimeDay: 'zodiacDayStart',
      minTimeDay: '1',
      maxTimeDay: '31',
      placeholderTimeDay: 'Zodiac Day Start',
      controlsTimeDay: 'false',

      labelTimeMonth: 'Zodiac Time Month Start',
      nameTimeMonth: 'zodiacMonthStart',
      minTimeMonth: '1',
      maxTimeMonth: '12',
      placeholderTimeMonth: 'Zodiac Month Start',
      controlsTimeMonth: 'false',
    },
    {
      fieldType: 'formCalendar',
      labelTimeDay: 'Zodiac Time Day End',
      nameTimeDay: 'zodiacDayEnd',
      minTimeDay: '1',
      maxTimeDay: '31',
      placeholderTimeDay: 'Zodiac Day End',
      controlsTimeDay: 'false',

      fieldType: 'formCalendar',
      labelTimeMonth: 'Zodiac Time Month End',
      nameTimeMonth: 'zodiacMonthEnd',
      minTimeMonth: '1',
      maxTimeMonth: '12',
      placeholderTimeMonth: 'Zodiac Month End',
      controlsTimeMonth: 'false',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Zodiac Icon',
      width: 'lg',
      placeholder: 'Icon Link',
      name: 'icon',
      nameUpload: 'iconZodiac',
      nameInputFile: 'zodiacFileToFirebase',
      readOnly: 'true',
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddZodiacDescription',
      label: 'Description',
      width: 'lg',
      placeholder: 'Enter Zodiac description',
      name: 'descreiption',
      requiredField: 'true',
      ruleMessage: 'Input description before submit',
    },
    {
      fieldType: 'EditorMainContent',
      nameTextArea: 'mainContent',
    },
    {
      fieldType: 'checkEdit',
      name: 'edit',
      value: 'edit',
    },
  ];

  const tableZodiacRef = React.useRef();
  const formZodiacRef = React.useRef();
  const editorRef = React.useRef();
  //state của uploadimg lên firebase
  const [imgLinkFirebase, setImgLinkFirebase] = React.useState(null);
  const [loadingUploadImgFirebase, setLoadingUploadingImgFirebase] = React.useState(false);
  //state cua text editor
  const [stateEditor, setStateEditor] = React.useState(null);
  //state cua modal add or edit
  const [showModal, setShowModal] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [zodiacRecord, setZodiacRecord] = React.useState(null);
  const [flagEditForm, setFlagEditForm] = React.useState('');
  const [buttonSubmitterZodiac, setButtonSubmitterZodiac] = React.useState(buttonSubmitter);
  const [formFieldAddZodiac, setFormFieldAddZodiac] = React.useState(formFieldAdd);
  const [formFieldEditZodiac, setFormFieldEditZodiac] = React.useState(formFieldEdit);

  //xuli loading upload img firebase
  React.useEffect(() => {
    if (loadingUploadImgFirebase) {
      message.loading('Uploading', 9999);
    } else {
      message.destroy();
    }
    return () => {
      message.destroy();
    };
  }, [loadingUploadImgFirebase]);

  //xuli loading button submit form add or edit zodiac
  React.useEffect(() => {
    const newButtonSubmitZodiac = buttonSubmitterZodiac.map((item) => {
      if (item.name === 'Submit') {
        item.loading = buttonLoading;
      }
      return item;
    });
    setButtonSubmitterZodiac(newButtonSubmitZodiac);
  }, [buttonLoading]);

  //xuli pass zodiac record
  React.useEffect(() => {
    if (zodiacRecord) {
      formZodiacRef?.current?.setFieldsValue(zodiacRecord);
      setStateEditor(zodiacRecord.mainContent);
    }
  }, [zodiacRecord]);

  //customupload img
  const customUpload = async ({ onError, onSuccess, file }) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      setLoadingUploadingImgFirebase(false);
      message.destroy();
      message.error('You can only upload IMAGE file!');
      return isImage;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
      return isLt4M;
    }
    try {
      setLoadingUploadingImgFirebase(true);
      const imgLink = await uploadFile(file, 'zodiac');

      if (imgLink) {
        setImgLinkFirebase(imgLink);
        formZodiacRef?.current?.setFieldsValue({
          ['zodiacIcon']: imgLink,
        });
        setLoadingUploadingImgFirebase(false);
        message.success('Upload Image Success!');
      }
    } catch (error) {
      setLoadingUploadingImgFirebase(false);
      onError(error);
    }
  };

  //xu li dong mo modal
  const handleModal = () => {
    setShowModal(!showModal);
    setFlagEditForm('');
    setZodiacRecord(null);
    setImgLinkFirebase(null);
  };

  //xuli dong modal
  const handleCancelModal = () => {
    setShowModal(false);
    setButtonLoading(false);
    setFlagEditForm('');
    setZodiacRecord(null);
    setImgLinkFirebase(null);
    setStateEditor(null);
    if (formZodiacRef) {
      formZodiacRef?.current?.resetFields();
    }
  };

  //xuli reset form
  const handleResetForm = () => {
    formZodiacRef?.current?.resetFields();
    setImgLinkFirebase(null);
  };

  //xuli submit form
  const handleSubmitFormZodiac = async (values) => {
    setButtonLoading(true);
    if (values.edit) {
      console.log('valuesFormBeforeFix', values);
      const newValues = Object.assign({}, values);
      const attr = 'edit';
      const dataEdit = Object.keys(newValues).reduce((item, key) => {
        if (key !== attr) {
          item[key] = newValues[key];
        }
        return item;
      }, {});
      dataEdit.zodiacDescription = dataEdit.descreiption;
      delete dataEdit.descreiption;
      dataEdit.zodiacName = dataEdit.name;
      delete dataEdit.name;
      dataEdit.zodiacIcon = dataEdit.icon;
      delete dataEdit.icon;
      dataEdit.zodiacMainContent = dataEdit.mainContent;
      delete dataEdit.mainContent;
      console.log('dataEdit', dataEdit);
      await updateZodiac(zodiacRecord.id, dataEdit);
    } else {
      await addZodiac(values);
      handleResetForm();
      setStateEditor(null);
    }
    tableZodiacRef?.current?.reload();
    setButtonLoading(false);
  };

  //xuli mo form edit zodiac
  const handleEditZodiacForm = (record) => {
    setFlagEditForm('edit');
    setShowModal(!showModal);
    setZodiacRecord(record);
  };

  //xuli delete zodiac
  const handleOkDeleteZodiac = async (record) => {
    const result = await deleteZodiac(record.id);
    if (result) {
      tableZodiacRef?.current?.reload();
    }
  };

  //xuli change text in editor
  const handleChangeStateEditor = (state) => {
    if (state) {
      // setStateEditor(state);
      console.log('stateEditor', state);
      formZodiacRef?.current?.setFieldsValue({
        ['zodiacMainContent']: state,
      });
    }
  };

  //xuli up anh trong text editor
  const handleUploadImgInEditor = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    console.log('A');
    input.onchange = async () => {
      console.log('b');

      try {
        console.log('c');

        let file = input.files[0];
        const imgLinkEditor = await uploadFile(file, 'editor');
        if (imgLinkEditor) {
          message.success('Add Image Success!');
          const range = editorRef?.current?.getEditorSelection();
          editorRef?.current?.getEditor().insertEmbed(range.index, 'image', imgLinkEditor);
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <>
      <PageContainer>
        <ProTable
          columns={column}
          actionRef={tableZodiacRef}
          pagination={{
            pageSize: 8,
          }}
          search={{
            labelWidth: 'auto',
            searchText: 'Search',
            submittext: 'Submit',
            resetText: 'Reset',
          }}
          toolBarRender={(action) => [
            <Button
              size="middle"
              key="buttonAddUser"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleModal()}
            >
              Add
            </Button>,
          ]}
          request={async (params, sort, filter) => {
            const currentAttr = 'current';
            const pageSizeAttr = 'pageSize';
            console.log(params);
            const data = [];
            if (params.name) {
              const newParams = Object.keys(params).reduce((item, key) => {
                if (key != currentAttr && key != pageSizeAttr) {
                  if (key === 'zodiacName') {
                    item.name = params[key];
                  } else {
                    item[key] = params[key];
                  }
                }
                return item;
              }, {});
              console.log('params', newParams);

              await getZodiacs(newParams).then((res) => {
                res?.map((item, index) => {
                  item.number = index + 1;
                  data[index] = item;
                });
              });
            } else {
              params.pageSize = 12;
              await getZodiacs(params).then((res) => {
                res?.map((item, index) => {
                  item.number = index + 1;
                  data[index] = item;
                });
              });
            }

            return {
              data: data,
              success: true,
            };
          }}
        />
      </PageContainer>
      {flagEditForm === 'edit' ? (
        <ModalForm
          showModal={showModal}
          titleModal={`Edit ${zodiacRecord.name}`}
          widthModal="900"
          handleCancelModel={handleCancelModal}
          formRef={formZodiacRef}
          buttonSubmitter={buttonSubmitterZodiac}
          handleSubmitForm={handleSubmitFormZodiac}
          formField={formFieldEditZodiac}
          customUpload={customUpload}
          imgLinkFirebase={imgLinkFirebase}
          stateEditor={stateEditor}
          handleChangeStateEditor={handleChangeStateEditor}
          editorRef={editorRef}
          handleUploadImgInEditor={handleUploadImgInEditor}
          handleResetForm={handleResetForm}
        />
      ) : (
        <ModalForm
          showModal={showModal}
          titleModal="Add New Zodiac"
          widthModal="900"
          handleCancelModel={handleCancelModal}
          formRef={formZodiacRef}
          buttonSubmitter={buttonSubmitterZodiac}
          handleSubmitForm={handleSubmitFormZodiac}
          formField={formFieldAddZodiac}
          customUpload={customUpload}
          imgLinkFirebase={imgLinkFirebase}
          stateEditor={stateEditor}
          handleChangeStateEditor={handleChangeStateEditor}
          editorRef={editorRef}
          handleUploadImgInEditor={handleUploadImgInEditor}
          handleResetForm={handleResetForm}
        />
      )}
    </>
  );
};

export default Zodiac;
