import ModalForm from '@/components/ModalForm';
import { uploadFile } from '@/utils/uploadFile';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React from 'react';
import { addProductMaster } from '@/services/productmaster';
import { getProductMasters } from '@/services/productmaster';
const ProductMaster = () => {
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      copyable: true,
      valueType: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter product name to search',
          },
        ],
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      copyable: true,
      valueType: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
      search: false,
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      copyable: true,
      valueType: 'detail',
      sorter: (a, b) => a.detail.localeCompare(b.detail),
      search: false,
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
                key="editProduct"
                type="primary"
                size="middle"
                icon={<EditOutlined />}
                block="true"
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
                key="deleteProduct"
                type="danger"
                size="middle"
                icon={<DeleteOutlined />}
                block="true"
                onClick={() => handleDeleteProduct(record)}
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
      key: 'clearFieldFormProduct',
      type: 'default',
      click: 'reset',
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddProduct',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
      loading: false,
    },
  ];

  const formFieldAdd = [
    {
      fieldType: 'formText',
      key: 'fieldAddName',
      label: 'Name',
      width: 'lg',
      placeholder: 'Enter product name',
      name: 'name',
      requiredField: 'true',
      ruleMessage: 'Input name before submit',
    },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddDescription',
      label: 'Description',
      width: 'lg',
      placeholder: 'Enter product description',
      name: 'description',
      requiredField: 'true',
      ruleMessage: 'Input description before submit',
    },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddDetail',
      label: 'Detail',
      width: 'lg',
      placeholder: 'Enter product detail',
      name: 'detail',
      requiredField: 'true',
      ruleMessage: 'Input detail before submit',
    },
    {
      fieldType: 'formSelect',
      key: 'selectCategoryId',
      name: 'categoryId',
      label: 'Category',
      placeholder: 'Select Category',
      requiredField: 'true',
      ruleMessage: 'Please select category',
      //lấy category và update lại formselect sau
      valueEnum: [
        {
          valueName: 2,
          valueDisplay: 'Áo thun',
        },
      ],
    },
    {
      fieldType: 'uploadListImg',
      nameUpload: 'uploadListImg',
    },
  ];

  const formFieldEdit = [];
  //ref
  const tableProductMasterRef = React.useRef();
  const formProductMasterRef = React.useRef();

  //state cua upload img len firebase
  const [listImgLinkFirebase, setListImgLinkFirebase] = React.useState([]);
  const [loadingUploadImgFirebase, setLoadingUploadingImgFirebase] = React.useState(false);

  // state cua modal add or edit
  const [showModal, setShowModal] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [productMasterRecord, setProductMasterRecord] = React.useState(null);
  const [flagEditForm, setFlagEditForm] = React.useState('');
  const [buttonSubmitterProductMaster, setButtonSubmitterProductMaster] =
    React.useState(buttonSubmitter);
  const [formFieldAddProductMaster, setFormFieldAddProductMaster] = React.useState(formFieldAdd);
  const [formFieldEditProductMaster, setFormFieldEditProductMaster] = React.useState(formFieldEdit);

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
      console.log('fileUploading', file);
      const imgLink = await uploadFile(file, 'productmaster');

      if (imgLink) {
        const newListImg = [...listImgLinkFirebase];
        file.thumbUrl = imgLink;
        newListImg.push(file);
        setListImgLinkFirebase(newListImg);
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
    //khi huy modal phai reset flag edit ve rong
    setFlagEditForm('');
    setProductMasterRecord(null);
    setListImgLinkFirebase([]);
  };

  //xuli dong modal
  const handleCancelModal = () => {
    setShowModal(false);
    setButtonLoading(false);
    setFlagEditForm('');
    setProductMasterRecord(null);
    setListImgLinkFirebase([]);
    if (formProductMasterRef) {
      formProductMasterRef?.current?.resetFields();
    }
  };

  //xuli reset form
  const handleResetForm = () => {
    formProductMasterRef?.current?.resetFields();
    setListImgLinkFirebase([]);
  };

  //xuli submit form
  const handleSubmitFormProductMaster = async (values) => {
    setButtonLoading(true);
    if (values.edit) {
    } else {
      const newListImgAdd = [];
      listImgLinkFirebase.map((item) => {
        newListImgAdd.push(item.thumbUrl);
      });
      values.imgLink = newListImgAdd;

      await addProductMaster(values);
    }
    tableProductMasterRef?.current?.reload();
    setButtonLoading(false);
  };

  //xuli mo form edit zodiac
  const handleEditProductMasterForm = (record) => {
    setFlagEditForm('edit');
    setShowModal(!showModal);
    setProductMasterRecord(record);
  };

  const handleDeleteProduct = (record) => {};

  return (
    <>
      <PageContainer>
        <ProTable
          columns={column}
          actionRef={tableProductMasterRef}
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
            const data = [];
            await getProductMasters(newParams).then((res) => {
              console.log('res at table query', res);
              res?.map((item, index) => {
                item.number = index + 1;
                data[index] = item;
              });
            });
            return {
              data: data,
              success: true,
            };
          }}
        />
      </PageContainer>
      <ModalForm
        showModal={showModal}
        titleModal="Add New Product Master"
        handleCancelModel={handleCancelModal}
        formRef={formProductMasterRef}
        buttonSubmitter={buttonSubmitterProductMaster}
        handleSubmitForm={handleSubmitFormProductMaster}
        formField={formFieldAddProductMaster}
        customUpload={customUpload}
        listImgLinkFirebase={listImgLinkFirebase}
        handleResetForm={handleResetForm}
      />
    </>
  );
};

export default ProductMaster;
