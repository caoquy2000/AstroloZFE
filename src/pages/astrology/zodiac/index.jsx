import React from 'react';
import { Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ModalForm from '@/components/ModalForm';
import { uploadFile } from '@/utils/uploadFile';

const Zodiac = () => {
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
    },
    {
      title: 'Zodiac Name',
      dataIndex: 'zodiacName',
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
    },
    {
      title: 'Zodiac Day Start',
      dataIndex: 'zodiacDayStart',
      copyable: true,
      sorter: (a, b) => a.zodiacDayStart.localeCompare(b.zodiacDayStart),
      search: false,
    },
    {
      title: 'Zodiac Month Start',
      dataIndex: 'zodiacMonthStart',
      copyable: true,
      sorter: (a, b) => a.zodiacMonthStart.localeCompare(b.zodiacMonthStart),
      search: false,
    },
    {
      title: 'Zodiac Day End',
      dataIndex: 'zodiacDayEnd',
      copyable: true,
      sorter: (a, b) => a.zodiacDayEnd.localeCompare(b.zodiacDayEnd),
      search: false,
    },
    {
      title: 'Zodiac Month End',
      dataIndex: 'zodiacMonthEnd',
      copyable: true,
      sorter: (a, b) => a.zodiacMonthEnd.localeCompare(b.zodiacMonthEnd),
      search: false,
    },
    {
      title: 'Zodiac Icon',
      dataIndex: 'zodiacIcon',
      copyable: true,
      search: false,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      search: false,
      render: (_, record) => {
        return (
          <div>
            <div>
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
            <div>
              <Button
                key="deleteZodiac"
                type="danger"
                size="middle"
                block="true"
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      },
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
      fieldType: 'zodiacEditorMainContent',
      nameTextArea: 'mainContent',
    },
  ];

  const formFieldEdit = [];

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

  //xuliLoadingImg
  const handleChangeImg = (info) => {
    console.log('info', info);
    if (info.file.status === 'uploading') {
      setLoadingUploadingImgFirebase(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoadingUploadingImgFirebase(false);
      return;
    }
  };

  //xuli cua upload img
  const beforeUpload = (file) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      message.error('You can only upload IMAGE file!');
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
    }
    return isImage && isLt4M;
  };

  //customupload img
  const customUpload = async ({ onError, onSuccess, file }) => {
    try {
      const imgLink = await uploadFile(file, 'zodiac');
      console.log('imgLinkAddZodiacComponent:', imgLink);
      if (imgLink) {
        setImgLinkFirebase(imgLink);
        formZodiacRef?.current?.setFieldsValue({
          ['zodiacIcon']: imgLink,
        });
        message.success('Upload Image Success!');
      }
    } catch (error) {
      onError(error);
    }
  };

  //xu li dong mo modal
  const handleModal = () => {
    setShowModal(!showModal);
    setFlagEditForm('');
    setZodiacRecord(null);
  };

  //xuli dong modal
  const handleCancelModal = () => {
    setShowModal(false);
    setButtonLoading(false);
    setFlagEditForm('');
    setZodiacRecord(null);
    if (formZodiacRef) {
      formZodiacRef?.current?.resetFields();
    }
  };

  //xuli submit form
  const handleSubmitFormZodiac = async (values) => {
    setButtonLoading(true);
    console.log('valuesForm', values);
    console.log('fullHTML', editorRef?.current);
    setButtonLoading(false);
  };

  //xuli mo form edit zodiac
  const handleEditZodiacForm = (record) => {
    setFlagEditForm('edit');
    setShowModal(!showModal);
    setZodiacRecord(record);
  };

  //xuli change text in editor
  const handleChangeStateEditor = (state) => {
    if (state) {
      // setStateEditor(state);
      console.log('stateEditor', state);
      formZodiacRef?.current?.setFieldsValue({
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
          onReset
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
        />
      </PageContainer>
      <ModalForm
        showModal={showModal}
        titleModal="Add New Zodiac"
        widthModal="900"
        handleCancelModel={handleCancelModal}
        formRef={formZodiacRef}
        buttonSubmitter={buttonSubmitterZodiac}
        handleSubmitForm={handleSubmitFormZodiac}
        formField={formFieldAddZodiac}
        beforeUpload={beforeUpload}
        onChange={handleChangeImg}
        customUpload={customUpload}
        imgLinkFirebase={imgLinkFirebase}
        stateEditor={stateEditor}
        handleChangeStateEditor={handleChangeStateEditor}
        editorRef={editorRef}
        handleUploadImgInEditor={handleUploadImgInEditor}
      />
    </>
  );
};

export default Zodiac;
