import { EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag} from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {PlusOutlined} from '@ant-design/icons';
import ModalForm from '@/components/ModalForm';
import {getUsers} from '@/services/ant-design-pro/user'

// const data = [
//     {
//         id: 1,
//         number: 1,
//         username: 'Cao Hoàng Quy',
//         phonenumber: '0914682425',
//         status: 1,
//     },
//     {
//         id: 2,
//         number: 2,
//         username: 'Nguyễn Văn Hiếu',
//         phonenumber: '0914682426',
//         status: 1,
//     },
//     {
//         id: 3,
//         number: 3,
//         username: 'Cao Hoàng Phát Lộc',
//         phonenumber: '0914682427',
//         status: 1,
//     },
//     {
//         id: 4,
//         number: 4,
//         username: 'Trần Văn A',
//         phonenumber: '0914682425',
//         status: 0,
//     },
//      {
//         id: 5,
//         number: 5,
//         username: 'Phạm Thanh Tùng',
//         phonenumber: '0914682427',
//         status: 0,
//     },
// ]

const User = () => {
    //config column
    const column = [
        {
            title: 'No.',
            dataIndex: 'number',
            sorter: (a,b) => a.number - b.number,
            search: false,

        },
        {
            title: 'Username',
            dataIndex: 'userName',
            copyable: true,
            valueType: 'userName',
            sorter: (a,b) => a.userName.localeCompare(b.userName),
            filters: true,
            onFilter: true,
            formItemProps: {
                rules: [
                    {
                        require: true,
                        message: 'Enter username to search',
                    }
                ],
            },
        },
        {
            title: 'PhoneNumber',
            dataIndex: 'phoneNumber',
            copyable: true,
            valueType: 'phoneNumber',
            sorter: (a,b) => a.phoneNumber.localeCompare(b.phoneNumber),
            filters: true,
            onFilter: true,
            formItemProps: {
                rules: [
                    {
                        require: true,
                        message: 'Enter phone number to search',
                    }
                ]
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'status',
            sorter: (a,b) => a.status - b.status,
            render: (_,record) => (
                <Space>
                    {
                        record.status == '1' && (
                            <Tag color='green'>Active</Tag>
                        ) 
                    }
                    {
                        record.status == '0' && (
                            <Tag color='red'>Unactive</Tag>
                        ) 
                    }
                </Space>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            search: false,
            render: (record, position, ...buttonProps) => {
                return (
                    <div>
                        <div>
                            <Button
                                key='editUser'
                                type='primary'
                                size='middle'
                                icon={<EditOutlined/>}
                                block={true}
                            
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

    const formField = [
        {
            fieldType: 'formText',
            key: 'fieldAddUsername',
            label: 'Username',
            width: 'lg',
            placeholder: 'Enter username ',
            name: 'username',
            requiredField: 'true',
            ruleMessage: 'Input username before submit',
        },
        {
            fieldType: 'formText',
            key: 'fieldAddPhoneNumberUser',
            label: 'Phone Number',
            width: 'lg',
            placeholder: 'Enter phone number',
            name: 'phonenumber',
            requiredField: 'true',
            ruleMessage: 'Input phone number before submit',
        },
        {
            fieldType: 'formSelect',
            key: 'selectStatusUser',
            name: 'selectStatus',
            label: 'Status',
            valueEnum: [
                {
                    valueName: 1,
                    valueDisplay: 'Active',
                },
                {
                    valueName:0,
                    valueDisplay: 'Unactive',
                }
            ],
            placeholder: 'Please select status',
            requiredField: 'true',
            ruleMessage: 'Please select user status',
        },
    ];
    const actionRef = React.useRef();
    const formAddUserRef = React.useRef();
    const [showModal, setShowModel] = React.useState(false);
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const [buttonSubmitterUser, setButtonSubmitterUser] = React.useState(buttonSubmitter);
    const [formFieldAddUser, setFormFieldAddUser] = React.useState(formField);
    React.useEffect(() => {
        const newButtonSubmitUser = buttonSubmitterUser.map((item) => {
            if (item.name === 'Submit') {
                item.loading = buttonLoading;
            }
            return item;
        });
        setButtonSubmitterUser(newButtonSubmitUser);
    }, [buttonLoading]);

    const handleModal = () => {
        setShowModel(!showModal);
    };

    const handleCancelModel = () => {
        setShowModel(false);
        if (formAddUserRef) {
            formAddUserRef?.current?.resetFields();
        }
    };

    const handleSubmitFormUser = async (values) => {
        setButtonLoading(true);
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(values);
                resolve(true);
            },(2000));
        });
        setButtonLoading(false);
    };
    return (
        <>
            <PageContainer>
                <ProTable
                    columns={column}
                    request={
                        async (params, sort, filter) => {
                            const data = [];
                            // console.log('A');
                            await getUsers()
                                .then((res) => {
                                    console.log('res', res);
                                    res.map((item, index) => {
                                        item.number = index + 1;
                                        data[index] = item;
                                    });
                                }); 
                    
                            console.log('data', data);
                            return {
                                data: data,
                                success: true,
                            }
                        }
                    }
                    onReset={true}
                    actionRef={actionRef}
                    pagination={{
                        pageSize: 5,
                    }}
                    search={{
                        labelWidth: 'auto',
                        searchText: 'Search',
                        submittext: 'Submit',
                    }}
                    toolBarRender={(action) => [
                        <Button 
                            size='middle'
                            key='buttonAddUser'
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => handleModal()}
                        >
                            Add
                        </Button>
                    ]}
                />
            </PageContainer>
            <ModalForm
                showModal={showModal}
                titleModal='Add New User'
                handleCancelModel={handleCancelModel}
                formRef={formAddUserRef}
                buttonSubmitter={buttonSubmitterUser}
                handleSubmitForm={handleSubmitFormUser}
                formField={formFieldAddUser}
            />
        </>
    );
};

export default User;