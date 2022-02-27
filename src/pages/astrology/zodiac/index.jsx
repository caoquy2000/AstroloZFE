import React from 'react';
import {Button} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
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
            render: (_,record) => {
                return (
                    <div>
                        <div>
                            <Button
                                key="editZodiac"
                                type="primary"
                                size="middle"
                                block={true}
                                icon={<EditOutlined />}
                            >
                                Edit
                            </Button>
                        </div>
                        <div>
                            <Button
                                key="deleteZodiac"
                                type='danger'
                                size='middle'
                                block='true'
                                icon={<DeleteOutlined />}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                );
            },
        }
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

    const formFieldAdd = []; 

    const formFieldEdit = [];

    const tableZodiacRef = React.useRef();
    const formZodiacRef = React.useRef();

    return (
        <>
            <p>Hello</p>
        </>
    );
};

export default Zodiac;