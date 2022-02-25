import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const Product = () => {

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
                ]
            }
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
            title: 'Size',
            dataIndex: 'size',
            copyable: true,
            valueType: 'size',
            sorter: (a, b) => a.size - b.size,
            formItemProps: {
                rules: [
                    {
                        require: true,
                        message: 'Enter product size to search',
                    },
                ]
            },
            render: (_, record) => {

            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            copyable: true,
            valueType: 'price',
            sorter: (a, b) => a.price - b.price,
            formItemProps: {
                rules: [
                    {
                        require: true,
                        message: 'Enter product price to search',
                    },
                ]
            },
            render: (_, record) => {

            },
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            copyable: true,
            valueType: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
            search: false,
            render: (_, record) => {

            },
        },
        {
            title: 'Color',
            dataIndex: 'color',
            copyable: true,
            valueType: 'color',
            sorter: (a, b) => a.color.localeCompare(b.color),
            formItemProps: {
                rules: [
                    {
                        require: true,
                        message: 'Enter product color to search',
                    },
                ]
            },
            render: (_, record) => {

            },
        },
        {
            title: 'Inventory',
            dataIndex: 'inventory',
            copyable: false,
            valueType: 'inventory',
            sorter: (a, b) => a.inventory - b.inventory,
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
                                key='editProduct'
                                type='primary'
                                size='middle'
                                icon={<EditOutlined />}
                                block='true'
                            >
                                Edit
                            </Button>
                        </div>
                        <div>
                            <Button
                                key='deleteProduct'
                                type='danger'
                                size='middle'
                                icon={<DeleteOutlined />}
                                block='true'
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                );
            }
        }
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
        }
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
        },
        {
            fieldType: 'formSelect',
            key: 'selectProductSize',
            name: 'size',
            label: 'Size',
            valueEnum: [
                {
                    valueName: 'S',
                    valueDisplay: 'S',
                },
                {
                    valueName: 'M',
                    valueDisplay: 'M',
                },
                {
                    valueName: 'L',
                    valueDisplay: 'L',
                },
                {
                    valueName: 'XL',
                    valueDisplay: 'XL',
                },
                {
                    valueName: 'XXL',
                    valueDisplay: 'XXL',
                },
            ],
            placeholder: 'Select Size',
            requiredField: 'true',
            ruleMessage: 'Please select Size'
        },
        {
            fieldType: 'formText',
            key: 'fieldAddProductPrice',
            label: 'Price',
            width: 'lg',
            placeholder: 'Enter product price',
            name: 'price',
            value: '',
            requiredField: 'true',
            ruleMessage: 'Input product price before submit',
        },
        {
            fieldType: 'formSelect',
            key: 'selectGenderProduct',
            name: 'gender',
            label: 'Gender',
            valueEnum: [
                {
                    valueName: 0,
                    valueDisplay: 'Female',
                },
                {
                    valueName: 1,
                    valueDisplay: 'Male',
                },

            ],
            placeholder: 'Select Gender',
            requiredField: 'true',
            ruleMessage: 'Please select Gender!'
        },
        {
            fieldType: 'formText',
            key: 'fieldAddProductColor',
            label: 'Color',
            width: 'lg',
            placeholder: 'Enter product Color',
            name: 'color',
            value: '',
            requiredField: 'true',
            ruleMessage: 'Input product Colr before submit',
        },
        {
            fieldType: 'formText',
            key: 'fieldAddProductInventory',
            label: 'Inventory',
            width: 'lg',
            placeholder: 'Enter product Inventory',
            name: 'inventory',
            value: '',
            requiredField: 'true',
            ruleMessage: 'Input product Inventory before submit',
        },
    ];

    const formFieldEdit = [];

    return (
        <>
        </>
    );
};

export default Product;