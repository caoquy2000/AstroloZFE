import React from 'react';

import { Button, Modal } from 'antd';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';



const ModalForm = (props) => {
    const {
        showModal, 
        titleModal, 
        handleCancelModel,
        formRef,
        buttonSubmitter,
        handleSubmitForm,
        formField
    } = props;
  
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

    return (
        <>
            <Modal
                visible={showModal}
                title={titleModal}
                centered={true}
                onCancel={() => handleCancelModelChild()}
                footer={[
                    <Button 
                        key='cancelModel'
                        type='danger'
                        onClick={() => handleCancelModelChild()}
                    >
                        Cancel
                    </Button>
                ]}
            >
                <ProForm
                    onReset={true}
                    formRef={formRef}
                    submitter={{
                        render: (props, doms) => {
                            return [
                                <>
                                    {
                                        buttonSubmitter.map((button) => (
                                            <Button
                                                key={button?.key}
                                                type={button?.type}
                                                onClick={button?.click === 'submit' ? () => handleButtonSubmitForm(props) : () => handleButtonResetForm(props)}
                                                loading={button?.loading}
                                            >
                                                {button?.name}
                                            </Button>
                                        ))
                                    }
                                </>
                            ]
                        }
                    }}
                    onFinish={async (values) => await handleSubmitFormChild(values)}
                >
                    {
                        formField.map((item) => (
                            <> 
                                {
                                    item?.fieldType === 'formText' && (
                                        <ProForm.Group>
                                            <ProFormText
                                                key={item?.key}
                                                label={item?.label}
                                                width={item?.width}
                                                placeholder={item?.placeholder}
                                                name={item?.name}
                                                rules={[{
                                                    required: item?.requiredField,
                                                    message: item?.ruleMessage,
                                                }]}
                                            />
                                        </ProForm.Group>
                                    )
                                }
                                {
                                    item?.fieldType === 'formSelect' && (
                                        <ProForm.Group>
                                            <ProFormSelect
                                                name={item?.name}
                                                label={item?.label}
                                                options={item?.valueEnum?.map((valueItem) => ({
                                                    label: valueItem.valueDisplay,
                            
                                                    value: valueItem.valueName, 
                                                }))}
                                                placeholder={item?.placeholder}
                                                rules={[{
                                                    required: item?.requiredField,
                                                    message: item?.ruleMessage,
                                                }]}
                                            />
                                        </ProForm.Group>
                                    )
                                }
                                
                                
                            </>
                        ))
                    }
                </ProForm>
            </Modal>
        </>
    );
};

export default ModalForm;