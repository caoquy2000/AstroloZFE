import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Input, Button, Modal } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import styles from './index.less';
import { values } from 'lodash';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import showConfirm from '@/components/ModalConfirm';
import ModalForm from '@/components/ModalForm';

const data = [
  {
    id: 1,
    number: 1,
    name: 'Vòng Tay',
  },
  {
    id: 2,
    number: 2,
    name: 'Nhẫn',
  },
  {
    id: 3,
    number: 3,
    name: 'Áo',
  },
  {
    id: 4,
    number: 4,
    name: 'Quần',
  },
  {
    id: 5,
    number: 5,
    name: 'Vòng Tay',
  },
  {
    id: 6,
    number: 6,
    name: 'Vòng Tay',
  },
  {
    id: 7,
    number: 7,
    name: 'Áo',
  },
];

const Category = () => {
  const buttonSubmitter = [
    {
      key: 'clearFieldFormCategory',
      type: 'default',
      click: 'reset',
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddCategory',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
      loading: false,
    },
  ];
  const formField = [
    {
      fieldType: 'formText',
      key: 'fieldAddNameCategory',
      label: 'Name',
      width: 'lg',
      placeholder: 'Enter category name',
      name: 'nameCategory',
      requiredField: 'true',
      ruleMessage: 'Input category name before submit',
    },
  ];
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      ellipsis: true,
      sorter: (a, b) => a.number - b.number,
      search: false,
      width: '40%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '40%',
      copyable: true,
      ellipsis: true,
      valueType: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter name to search',
          },
        ],
      },
      filters: true,
      onFilter: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      search: false,
      render: (record, position, ...buttonProps) => {
        return (
          <div className={styles.column_ares}>
            <div className={styles.width_table_action}>
              <Button
                key="editCategory"
                type="primary"
                size="middle"
                icon={<EditOutlined />}
                block={true}
                onClick={() => handleEditRecord(record, position, buttonProps)}
              >
                Edit
              </Button>
            </div>
            <div className={styles.width_table_action}>
              <Button
                key="deleteCategory"
                type="danger"
                size="middle"
                icon={<DeleteOutlined />}
                block={true}
                onClick={() => {
                  showConfirm({
                    title: 'Do you Want to delete these items?',
                    icon: <ExclamationCircleOutlined />,
                    content: '',
                    handleOk: handleOk,
                    handleCancel: handleCancel,
                  });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  const [showModal, setShowModel] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [buttonSubmitterCategory, setButtonSubmitterCategory] = useState(buttonSubmitter);
  const [formFieldAddCategory, setFormFieldAddCategory] = useState(formField);
  const actionRef = useRef();
  const formAddCategoryRef = useRef();
  // const onSubmit = () => {

  // };
  React.useEffect(() => {
    const newButtonSubmitCategory = buttonSubmitterCategory.map((item, index) => {
      if (item.name === 'Submit') {
        item.loading = buttonLoading;
      }
      return item;
    });

    setButtonSubmitterCategory(newButtonSubmitCategory);
  }, [buttonLoading]);
  const handleModal = () => {
    setShowModel(!showModal);
  };

  const handleCancelModel = () => {
    setShowModel(false);
    if (formAddCategoryRef) {
      formAddCategoryRef?.current?.resetFields();
    }
  };

  const handleEditRecord = async (record, position, buttonProps) => {
    console.log('record', record);
    console.log('positionName', position.name);
    console.log('buttonProps', buttonProps);
  };

  //handle submit form add category
  const handleSubmitFormCategory = async (values) => {
    setButtonLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(values);
        resolve(true);
      }, 2000);
    });
    setButtonLoading(false);
  };

  const handleOk = () => {
    console.log('ok');
    // -> xác nhận delete category và gọi api để delete
    // sau đó dùng action ref để gọi reload lại table
  };
  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <>
      <PageContainer>
        <ProTable
          columns={column}
          // dataSource={}
          request={(params, sort, filter) => {
            // console.log('params', params);
            // console.log('sort', sort);
            // console.log('filter', filter);
            if (params.name === 'aa') {
              return {
                data: [
                  {
                    number: 3,
                    name: 'Áo',
                  },
                ],
                success: true,
              };
            }
            return {
              data: data,
              success: true,
            };
          }}
          onReset={true}
          actionRef={actionRef}
          pagination={{
            pageSize: 5,
          }}
          rowKey="idCategory"
          search={{
            labelWidth: 'auto',
            searchText: 'Search',
            submittext: 'Submit',
            resetText: 'Reset',
          }}
          toolBarRender={(action) => [
            <Button
              size="middle"
              key="buttonAddCategory"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleModal()}
            >
              Add
            </Button>,
          ]}
        />
      </PageContainer>
      {/* <Modal
                visible={showModal}
                title="Add New Category"
                centered={true}
                onCancel={() => handleCancelModel()}
                footer={[
                    <Button 
                        key='cancelModel'
                        type='danger'
                        onClick={() => handleCancelModel()}
                    >
                        Cancel
                    </Button>
                ]}
            >
                <ProForm
                    onReset={true}
                    formRef={formAddCategoryRef}
                    submitter={{
                        render: (props, doms) => {
                   
                            return [
                                <>
                                    <Button
                                        key={`clearFieldFormCategory`}
                                        type='default'
                                        onClick={() => props.form?.resetFields()}
                                    >   
                                        Reset
                                    </Button>
                                    <Button
                                        key='submitAddCategory'
                                        type='primary'
                                        onClick={() => props.form?.submit()}
                                        loading={buttonLoading}
                                    >
                                        Submit
                                    </Button>
                                </>
                               
                            ]
                        }
                    }}
                    onFinish={async (values) => await handleSubmitFormCategory(values)}
                >
                    <ProForm.Group>
                        <ProFormText 
                            label='Name'
                            width='lg'
                            placeholder='Enter category name'
                            name='nameCategory'
                            rules={[{ 
                                required: true,
                                message: 'Input category name before submit'
                            }]}
                        />
                    </ProForm.Group>
                </ProForm>
            </Modal> */}
      <ModalForm
        showModal={showModal}
        titleModal="Add New Category"
        handleCancelModel={handleCancelModel}
        formRef={formAddCategoryRef}
        buttonSubmitter={buttonSubmitterCategory}
        handleSubmitForm={handleSubmitFormCategory}
        formField={formFieldAddCategory}
      />
    </>
  );
};

export default Category;
