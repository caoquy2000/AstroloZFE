import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, message, Space } from 'antd';
import React from 'react';
import { addHouse, getHouses, deleteHouse, updateHouse } from '@/services/house';
import { uploadFile } from '@/utils/uploadFile';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ModalForm from '@/components/ModalForm';
const House = () => {
  //config column table
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
      width: '25%',
    },
    {
      title: 'House Name',
      dataIndex: 'name',
      copyable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter House Name to search',
          },
        ],
      },
      width: '25%',
    },
    {
      title: 'House Icon',
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
                key="editHouse"
                type="primary"
                size="middle"
                block={true}
                icon={<EditOutlined />}
                onClick={() => handleEditHouseForm(record)}
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
                key="deleteHouse"
                type="danger"
                size="middle"
                block="true"
                icon={<DeleteOutlined />}
                onClick={() => handleOkDeleteHouse(record)}
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
      key: 'clearFieldFormHouse',
      type: 'default',
      click: 'reset',
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddHouse',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
      loading: false,
    },
  ];

  const formFieldAdd = [
    {
      fieldType: 'formText',
      key: 'fieldAddHouseName',
      label: 'House Name',
      width: 'lg',
      placeholder: 'Enter House Name',
      name: 'name',
      requiredField: 'true',
      ruleMessage: 'Input House Name before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddHouseTitle',
      label: 'House Title',
      width: 'lg',
      placeholder: 'Enter House Title',
      name: 'title',
      requiredField: 'true',
      ruleMessage: 'Input House Title before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddHouseTag',
      label: 'House Tag',
      width: 'lg',
      placeholder: 'Enter House Tag',
      name: 'tag',
      requiredField: 'true',
      ruleMessage: 'Input House Tag before submit',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'House Icon',
      width: 'lg',
      placeholder: 'Icon Link',
      name: 'icon',
      nameUpload: 'iconHouse',
      nameInputFile: 'houseFileToFirebase',
      readOnly: 'true',
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddHouseDescription',
      label: 'Description',
      width: 'lg',
      placeholder: 'Enter House description',
      name: 'description',
      requiredField: 'true',
      ruleMessage: 'Input description before submit',
    },
    {
      fieldType: 'EditorMainContent',
      nameTextArea: 'mainContent',
    },
  ];

  const formFieldEdit = [
    {
      fieldType: 'formText',
      key: 'fieldAddHouseName',
      label: 'House Name',
      width: 'lg',
      placeholder: 'Enter House Name',
      name: 'name',
      requiredField: 'true',
      ruleMessage: 'Input House Name before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddHouseTitle',
      label: 'House Title',
      width: 'lg',
      placeholder: 'Enter House Title',
      name: 'title',
      requiredField: 'true',
      ruleMessage: 'Input House Title before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddHouseTag',
      label: 'House Tag',
      width: 'lg',
      placeholder: 'Enter House Tag',
      name: 'tag',
      requiredField: 'true',
      ruleMessage: 'Input House Tag before submit',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'House Icon',
      width: 'lg',
      placeholder: 'Icon Link',
      name: 'icon',
      nameUpload: 'iconHouse',
      nameInputFile: 'houseFileToFirebase',
      readOnly: 'true',
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddHouseDescription',
      label: 'Description',
      width: 'lg',
      placeholder: 'Enter House description',
      name: 'description',
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

  //ref cua table, editor, form
  const tableHouseRef = React.useRef();
  const formHouseRef = React.useRef();
  const editorRef = React.useRef();
  //state cua upload img len firebase
  const [imgLinkFirebase, setImgLinkFirebase] = React.useState(null);
  const [loadingUploadImgFirebase, setLoadingUploadingImgFirebase] = React.useState(false);
  //state cua editor
  const [stateEditor, setStateEditor] = React.useState(null);
  //state cua modal add or edit
  const [showModal, setShowModal] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [houseRecord, setHouseRecord] = React.useState(null);
  const [flagEditForm, setFlagEditForm] = React.useState('');
  const [buttonSubmitterHouse, setButtonSubmitterHouse] = React.useState(buttonSubmitter);
  const [formFieldAddHouse, setFormFieldAddHouse] = React.useState(formFieldAdd);
  const [formFieldEditHouse, setFormFieldEditHouse] = React.useState(formFieldEdit);

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

  //xuli loading button submit form add or edit house
  React.useEffect(() => {
    const newButtonSubmitHouse = buttonSubmitterHouse.map((item) => {
      if (item.name === 'Submit') {
        item.loading = buttonLoading;
      }
      return item;
    });
    setButtonSubmitterHouse(newButtonSubmitHouse);
  }, [buttonLoading]);

  //xuli pass house record
  React.useEffect(() => {
    if (houseRecord) {
      formHouseRef?.current?.setFieldsValue(houseRecord);
    }
  }, [houseRecord]);

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
      const imgLink = await uploadFile(file, 'house');

      if (imgLink) {
        setImgLinkFirebase(imgLink);
        formHouseRef?.current?.setFieldsValue({
          ['icon']: imgLink,
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
    setHouseRecord(null);
    setImgLinkFirebase(null);
  };

  //xuli dong modal
  const handleCancelModal = () => {
    setShowModal(false);
    setButtonLoading(false);
    setFlagEditForm('');
    setHouseRecord(null);
    setImgLinkFirebase(null);
    setStateEditor(null);
    if (formHouseRef) {
      formHouseRef?.current?.resetFields();
    }
  };

  //xuli reset form
  const handleResetForm = () => {
    formHouseRef?.current?.resetFields();
    setImgLinkFirebase(null);
  };

  //xuli submit form
  const handleSubmitFormHouse = async (values) => {
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

      console.log('dataEdit', dataEdit);
      handleCancelModal();
      await updateHouse(houseRecord.id, dataEdit);
    } else {
      await addHouse(values);
      handleResetForm();
      setStateEditor(null);
    }
    tableHouseRef?.current?.reload();
    setButtonLoading(false);
  };

  //xuli mo form edit zodiac
  const handleEditHouseForm = (record) => {
    setFlagEditForm('edit');
    const newObjRecord = { ...record };
    newObjRecord.description = newObjRecord.decription;
    delete newObjRecord.decription;
    setShowModal(!showModal);
    console.log('record', record);
    setHouseRecord(newObjRecord);
    setStateEditor(record.mainContent);
  };

  //xuli delete house
  const handleOkDeleteHouse = async (record) => {
    const result = await deleteHouse(record.id);
    if (result) {
      tableHouseRef?.current?.reload();
    }
  };

  //xuli change text in editor
  const handleChangeStateEditor = (state) => {
    if (state) {
      // setStateEditor(state);
      console.log('stateEditor', state);
      formHouseRef?.current?.setFieldsValue({
        ['mainContent']: state,
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
          actionRef={tableHouseRef}
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
              key="buttonAddHouse"
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
                  if (key === 'name') {
                    item.name = params[key];
                  } else {
                    item[key] = params[key];
                  }
                }
                return item;
              }, {});
              console.log('params', newParams);

              await getHouses(newParams).then((res) => {
                res?.map((item, index) => {
                  item.number = index + 1;
                  data[index] = item;
                });
              });
            } else {
              params.pageSize = 12;
              await getHouses(params).then((res) => {
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
          titleModal={`Edit ${houseRecord.name}`}
          widthModal="900"
          handleCancelModel={handleCancelModal}
          formRef={formHouseRef}
          buttonSubmitter={buttonSubmitterHouse}
          handleSubmitForm={handleSubmitFormHouse}
          formField={formFieldEditHouse}
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
          titleModal="Add New House"
          widthModal="900"
          handleCancelModel={handleCancelModal}
          formRef={formHouseRef}
          buttonSubmitter={buttonSubmitterHouse}
          handleSubmitForm={handleSubmitFormHouse}
          formField={formFieldAddHouse}
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

export default House;
