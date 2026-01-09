import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Drawer, Flex, Form, Row, Typography } from 'antd'
import type React from 'react';
import { MyInput, MySelect } from '../../../Forms';
import { staffrole } from '../../../../shared';
import type { staffType } from '../../../../Type';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface props {
    edititem?: staffType | null
    visible: boolean,
    onClose: () => void,
}

const { Title } = Typography
const AddEditStaffDrawer: React.FC<props> = ({visible,onClose,edititem}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && edititem) {
            form.setFieldsValue({
                staffName: edititem?.staffName,
                role: edititem?.role,
                phoneNumber: edititem?.phoneNumber,
                email: edititem?.email,
            })
        } else {
            form.resetFields()
        }
    }, [visible, edititem])

    return (
        <Drawer
            title={null}
            open={visible}
            onClose={onClose}
            closeIcon={false}
            width={600}
            footer={
                <Flex justify='end' gap={5}>
                    <Button className='btncancel text-black border-gray' onClick={onClose}>
                        {t("Cancel")}
                    </Button>
                    <Button type="primary" className='btnsave border-0 text-white brand-bg' onClick={() => { form.submit() }}>
                        {edititem ? t("Update") : t('Save')}
                    </Button>
                </Flex>
            }
        >
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {edititem ? t("Edit Staff") : t('Add Staff')}
                        </Title>
                        <Button onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>
                </Flex>
                <Form layout="vertical"
                    form={form}
                    requiredMark={false}
                >
                    <Row>
                        <Col span={24}>
                            <MyInput
                                label={t("Staff Name")}
                                name="staffName"
                                required
                                message={t("Please enter staff name")}
                                placeholder={t("Enter staff name")}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect
                                label={t("Role")}
                                name={'role'}
                                required
                                message={t("Please choose role")}
                                options={staffrole(t)}
                                placeholder={t("Choose role")}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label={t("Phone Number")}
                                name="phoneNumber"
                                type='number'
                                required
                                message={t("Please enter phone number")}
                                placeholder={t("966 XX XXX XXX")}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label={t("Email Address")}
                                name="email"
                                required
                                message={t("Please enter email address")}
                                placeholder={t("Enter email address")}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label={t("Password")}
                                name="password"
                                type='password'
                                required
                                message={t("Please enter password")}
                                placeholder={t("Enter password")}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Drawer>
    )
}

export { AddEditStaffDrawer }
