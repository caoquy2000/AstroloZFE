import { EditOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import ModalForm from '@/components/ModalForm';
import { getUsers } from '@/services/ant-design-pro/user';
import { addUser } from '@/services/ant-design-pro/user';
import { editUser } from '@/services/ant-design-pro/user';
import { useModel } from 'umi';

const User = () => {
  //config column
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      copyable: true,
      valueType: 'userName',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter username to search',
          },
        ],
      },
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      copyable: true,
      valueType: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter phone number to search',
          },
        ],
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'status',
      sorter: (a, b) => a.status - b.status,
      render: (_, record) => (
        <Space>
          {record.status == '1' && <Tag color="green">Active</Tag>}
          {record.status == '0' && <Tag color="red">Unactive</Tag>}
        </Space>
      ),
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
                key="editUser"
                type="primary"
                size="middle"
                icon={<EditOutlined />}
                block={true}
                onClick={() => handleEditUserForm(record)}
              >
                Edit
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const buttonSubmitter = [
    {
      key: 'clearFieldFormUser',
      type: 'default',
      click: 'reset',
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddUser',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
      loading: false,
    },
  ];

  const formFieldAdd = [
    {
      fieldType: 'formText',
      key: 'fieldAddUsername',
      label: 'Username',
      width: 'lg',
      placeholder: 'Enter username ',
      name: 'userName',
      requiredField: 'true',
      ruleMessage: 'Input username before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddPhoneNumberUser',
      label: 'Phone Number',
      width: 'lg',
      placeholder: 'Enter phone number',
      name: 'phoneNumber',
      requiredField: 'true',
      ruleMessage: 'Input phone number before submit',
    },
    // {
    //   fieldType: 'formSelect',
    //   key: 'selectStatusUser',
    //   name: 'selectStatus',
    //   label: 'Status',
    //   valueEnum: [
    //     {
    //       valueName: 1,
    //       valueDisplay: 'Active',
    //     },
    //     {
    //       valueName: 0,
    //       valueDisplay: 'Unactive',
    //     },
    //   ],
    //   placeholder: 'Please select status',
    //   requiredField: 'true',
    //   ruleMessage: 'Please select user status',
    // },
  ];

  const formFieldEdit = [
    {
      fieldType: 'formText',
      key: 'fieldAddUsername',
      label: 'Username',
      width: 'lg',
      placeholder: 'Enter username ',
      name: 'userName',
      value: '',
      requiredField: 'true',
      ruleMessage: 'Input username before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddPhoneNumberUser',
      label: 'Phone Number',
      width: 'lg',
      placeholder: 'Enter phone number',
      name: 'phoneNumber',
      value: '',
      requiredField: 'true',
      ruleMessage: 'Input phone number before submit',
    },
    {
      fieldType: 'formSelect',
      key: 'selectStatusUser',
      name: 'status',
      label: 'Status',
      defaultValue: 1,
      valueEnum: [
        {
          valueName: 1,
          valueDisplay: 'Active',
        },
        {
          valueName: 0,
          valueDisplay: 'Unactive',
        },
      ],
      placeholder: 'Please select status',
      requiredField: 'true',
      ruleMessage: 'Please select user status',
    },
    {
      fieldType: 'checkEdit',
      name: 'edit',
      value: 'edit',
    },
  ];

  const actionRef = React.useRef();
  const formUserRef = React.useRef();
  const [showModal, setShowModel] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [userRecord, setUserRecord] = React.useState(null);
  const [flagEditForm, setFlagEditForm] = React.useState('');
  const [buttonSubmitterUser, setButtonSubmitterUser] = React.useState(buttonSubmitter);
  const [formFieldAddUser, setFormFieldAddUser] = React.useState(formFieldAdd);
  const [formFieldEditUser, setFormFieldEditUser] = React.useState(formFieldEdit);
  const { initialState, setInitialState } = useModel('@@initialState');

  React.useEffect(() => {
    const newButtonSubmitUser = buttonSubmitterUser.map((item) => {
      if (item.name === 'Submit') {
        item.loading = buttonLoading;
      }
      return item;
    });
    setButtonSubmitterUser(newButtonSubmitUser);
  }, [buttonLoading]);

  React.useEffect(() => {
    if (userRecord) {
      const newFormFieldEditUser = formFieldEditUser.map((item, index) => {
        if (item.name === 'userName') {
          item.value = userRecord.userName;
        } else if (item?.name === 'phoneNumber') {
          item.value = userRecord.phoneNumber;
        }
        return item;
      });
      setFormFieldEditUser(newFormFieldEditUser);
      //Vì modal form khi hủy modal giá trị initial value vẫn ko đổi nên ta
      //phải dùng setFieldvalue để set value cho các field
      formUserRef?.current?.setFieldsValue(userRecord);
    }
  }, [userRecord]);

  const handleModal = () => {
    setShowModel(!showModal);
    setFlagEditForm('');
    //vì hàm này ko liên quan đến edit user nên phải set lại user record = null
    setUserRecord(null);
  };

  const handleCancelModel = () => {
    setShowModel(false);
    setButtonLoading(false);
    setFlagEditForm('');
    // hàm này tắt modal nên cũng phải set lại edit user
    setUserRecord(null);
    if (formUserRef) {
      formUserRef?.current?.resetFields();
    }
  };

  const handleSubmitFormUser = async (values) => {
    setButtonLoading(true);
    if (values.edit) {
      // sử lí edit user
      const newValues = Object.assign({}, values);
      const attr = 'edit';
      const dataEdit = Object.keys(newValues).reduce((item, key) => {
        if (key !== attr) {
          item[key] = newValues[key];
        }
        return item;
      }, {});
      dataEdit.id = userRecord.id;
      console.log('dataEdit', dataEdit);
      console.log('idDataEdit', userRecord.id);
      await editUser(userRecord.id, dataEdit);
    } else {
      // sử lí add user bình thường
      await addUser(values);
    }

    actionRef?.current?.reload();
    setButtonLoading(false);
  };

  const handleEditUserForm = (record) => {
    setFlagEditForm('edit');
    setShowModel(!showModal);
    setUserRecord(record);
  };
  return (
    <>
      <PageContainer>
        <ProTable
          columns={column}
          request={async (params, sort, filter) => {
            const currentAttr = 'current';
            const pageSizeAttr = 'pageSize';
            const data = [];
            console.log(params);
            if (params.userName || params.phoneNumber || params.status) {
              console.log('A');
              const newParams = Object.keys(params).reduce((item, key) => {
                if (key != currentAttr && key != pageSizeAttr) {
                  if (key === 'userName') {
                    item.name = params[key];
                  } else if (key === 'phoneNumber') {
                    item.phone = params[key];
                  } else if (key === 'status') {
                    if (params[key].toString().toLowerCase() === 'active') {
                      item.status = 1;
                    } else if (params[key].toString().toLowerCase() === 'unactive') {
                      item.status = 0;
                    }
                  } else {
                    item[key] = params[key];
                  }
                }
                return item;
              }, {});
              console.log('params', newParams);
              await getUsers(newParams).then((res) => {
                console.log('res at table query', res);
                res?.map((item, index) => {
                  item.number = index + 1;
                  data[index] = item;
                });
              });
            } else {
              console.log('B');
              await getUsers(params).then((res) => {
                console.log('res at table query', res);
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
          onReset={true}
          actionRef={actionRef}
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
      {flagEditForm === 'edit' ? (
        <ModalForm
          showModal={showModal}
          titleModal={`Edit ${userRecord.userName}`}
          handleCancelModel={handleCancelModel}
          formRef={formUserRef}
          buttonSubmitter={buttonSubmitterUser}
          handleSubmitForm={handleSubmitFormUser}
          formField={formFieldEditUser}
        />
      ) : (
        <ModalForm
          showModal={showModal}
          titleModal="Add New User"
          handleCancelModel={handleCancelModel}
          formRef={formUserRef}
          buttonSubmitter={buttonSubmitterUser}
          handleSubmitForm={handleSubmitFormUser}
          formField={formFieldAddUser}
        />
      )}
    </>
  );
};

export default React.memo(User);
