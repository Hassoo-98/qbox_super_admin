import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import type { EditSettingsModalProps  } from '../../../../Type'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../sources/i18n'

const { Title } = Typography
const EditGeneralSettings: React.FC<EditSettingsModalProps> = ({visible,onClose,edititem}) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const isRTL = i18n.language === "ar";
   

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                firstName: edititem?.firstName,
                lastName: edititem?.lastName,
                phoneNo: edititem?.phoneNo,
                email: edititem?.email,
                whatsappNumber: edititem?.whatsappNumber,
            })
        }
    },[visible,edititem])

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            centered
            footer={
                <Flex justify='end' gap={5}>
                    <Button className='btncancel text-black border-gray' onClick={onClose}>
                        {t('Cancel')}
                    </Button>
                    <Button type="primary" className='btnsave border-0 text-white bg-slate-blue' onClick={()=>form.submit()}>
                        {t('Save')}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {t('General Settings')}
                    </Title>
                    <Button onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex> 
                <Form layout="vertical" 
                    form={form} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                label={t('First Name')}
                                name="firstName" 
                                required 
                                message={t('Please enter first name')}
                                placeholder={t('Enter first name')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t('Last Name')}
                                name="lastName" 
                                required 
                                message={t('Please enter last name')}
                                placeholder={t('Enter last name')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                type='number' 
                                label={t('Customer Support Number')}
                                name="phoneNo" 
                                required 
                                message={t('Please enter customer support number')} 
                                placeholder={t('Enter customer support number')}
                                prefix={'+966'}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t('Email Address')} 
                                name="email" 
                                required 
                                message={t('Please enter email address')} 
                                placeholder={t('Enter email address')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                type='number' 
                                label={t('WhatsApp Number')}
                                name="whatsappNumber" 
                                required 
                                message={t('Please enter whatsapp number')} 
                                placeholder={t('Enter whatsapp number')}
                                prefix={'+966'}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export { EditGeneralSettings }

