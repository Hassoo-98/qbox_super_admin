import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { MyInput } from '../../..'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../sources/i18n'

const { Title } = Typography
const ChangePasswordSetting = () => {
     const isRTL = i18n.language === "ar";
  
   
    const { t } = useTranslation()
    const [form] = Form.useForm();
   
    return (
        <Card className='card-bg card-cs radius-12 border-gray'  style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Flex gap={10} vertical>
                <Flex gap={10} justify='space-between' align='center'>
                    <Title level={5} className="fw-500 m-0">{t('Password Manager')}</Title>
                    <Button className='btncancel text-black' onClick={() => form.submit()}>
                        {t('Save')}
                    </Button>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <MyInput
                                autoFocus
                                type='password'
                                name='oldPassword'
                                label={t('Old Password')}
                                placeholder={t('Enter your old password')}
                                required
                                message={t('Please enter old password')}
                            />
                        </Col>
                        <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <MyInput
                                name='newPassword'
                                type='password'
                                label={t('New Password')}
                                placeholder={t('Enter your new password')}
                                required
                                message={t('Please enter new password')}
                                rules={[
                                    {
                                        required: true,
                                    }
                                ]}
                                validator={() => ({
                                    validator: (_, value) => {
                                        const reg = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
                                        if (!reg.test(value)) {
                                            return Promise.reject(new Error(t('Password should contain at least 8 characters, one uppercase letter, one number, one special character')));
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                })}
                            />
                        </Col>
                        <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <MyInput
                                name='confirmPassword'
                                type='password'
                                label={t('Confirm Password')}
                                placeholder={t('Enter your confirm password')}
                                dependencies={['newPassword']}
                                required
                                message={t('Please enter confirm password')}
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(t('The password that you entered do not match!')));
                                        },
                                    }),
                                ]}
                                validator={({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t('The password that you entered do not match!')));
                                    },
                                })}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
        </Card>
    )
}

export { ChangePasswordSetting }
