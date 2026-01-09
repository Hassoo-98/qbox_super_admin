import { useState } from 'react'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms';
import { EditGeneralSettings } from '../modal';
import type { SettingData } from '../../../../Type';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../sources/i18n';

const dummyData: SettingData = {
  id: 1,
  firstName: 'Sheeraz',
  lastName: 'Sheeraz',
  phoneNo: '123',
  email: 'sheeraz@gmail.com',
  whatsappNumber: '123'
};

const { Title } = Typography
const GeneralSetting = () => {
    const { t } = useTranslation()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)
    const [edititem, setEditItem] = useState<SettingData | null>(null);
        const isRTL = i18n.language === "ar";
        
      

    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray' style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">{t('General Settings')}</Title>
                        <Button className='btncancel text-black' onClick={()=>{setVisible(true);setEditItem(dummyData)}}> 
                            {t('Edit')}
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t('First Name')}
                                    name="firstName" 
                                    placeholder={t('Enter first name')}
                                    disabled 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t('Last Name')}
                                    name="lastName" 
                                    placeholder={t('Enter last name')}
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    type='number' 
                                    label={t('Customer Support Number')}
                                    name="phoneNo" 
                                    placeholder={t('Enter customer support number')}
                                    prefix={'+966'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t('Email Address')} 
                                    name="email" 
                                    placeholder={t('Enter email address')}
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    type='number' 
                                    label={t('WhatsApp Number')}
                                    name="whatsappNumber" 
                                    placeholder={t('Enter whatsappNumber number')}
                                    prefix={'+966'}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
            <EditGeneralSettings 
                visible={visible}
                edititem={edititem}
                onClose={()=>{ setVisible(false); setEditItem(null) }}
            />
        </>
    )
}

export { GeneralSetting }
