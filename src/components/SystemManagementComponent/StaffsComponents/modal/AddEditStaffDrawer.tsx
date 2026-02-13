import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Drawer, Flex, Form, Row, Typography, message } from 'antd'
import type React from 'react';
import { MyInput, MySelect } from '../../../Forms';
import { staffrole } from '../../../../shared';
import type { staffType } from '../../../../types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import { useStaff } from '../../../../hooks/useStaff';

interface props {
    onConfirm?: ()=>void;
    isEdit: boolean;
    visible: boolean;
    onClose: () => void;
    edititem?: staffType | null;
}

const { Title } = Typography
const AddEditStaffDrawer: React.FC<props> = ({ visible, onClose, isEdit, onConfirm, edititem }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { createStaff, updateStaff, isCreatingStaff, isUpdatingStaff } = useStaff();
    const [isFormValid, setIsFormValid] = useState(false);
    

    // check validity whenever fields change or when form is reset/populated
    const checkFormValid = useCallback(() => {
        const hasErrors = form.getFieldsError().some((f) => (f.errors || []).length > 0);
        const touched = form.isFieldsTouched(true);
        setIsFormValid(touched && !hasErrors);
    }, [form]);

    useEffect(() => {
        // If opening in edit mode and we have an edit item, populate fields.
        // Otherwise reset the form (covers opening in Add mode and closing).
        if (visible && isEdit && edititem) {
            form.setFieldsValue({
                staffName: edititem.name,
                role: edititem.role,
                phoneNumber: edititem.phone_number,
                email: edititem.email,
            });
        } else {
            form.resetFields();
        }

        checkFormValid();
    }, [visible, isEdit, edititem, form, checkFormValid]);

    const handleSubmit = async (values: any) => {
        try {
            const payload = {
                name: values.staffName,
                phone_number: values.phoneNumber,
                email: values.email,
                role: values.role,
                password: values.password,
                is_active: true,
            };

            if (edititem?.id) {
                // Update existing staff
                await updateStaff({ id: edititem.id, payload });
                message.success(t("Staff updated successfully"));
            } else {
                // Create new staff
                await createStaff(payload);
                message.success(t("Staff created successfully"));
            }
            onConfirm?.();
            onClose();
            form.resetFields();
        } catch (err: any) {
            if (err && typeof err === "object" && "status" in err) {
                const status = err.status;
                const msg = err.message ?? t("An error occurred");
                message.error(`${status} - ${msg}`);
            } else {
                message.error(t("An error occurred"));
            }
        }
    };

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
                        <Button
                            type="primary"
                            className="btnsave border-0 text-white brand-bg"
                            onClick={() => {
                                form.submit();
                            }}
                            loading={isCreatingStaff || isUpdatingStaff}
                        >
                            {isEdit ? t("Update") : t("Save")}
                        </Button>
                    </Flex>
                }
                footerStyle={{ position: 'sticky', bottom: 0, background: 'var(--white-text)', zIndex: 10, padding: '12px 24px', borderTop: '1px solid var(--border-gray)' }}
        >
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {isEdit ? t("Edit Staff") : t('Add Staff')}
                        </Title>
                        <Button onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>
                </Flex>
                <Form layout="vertical"
                    form={form}
                    requiredMark={false}
                    onFinish={handleSubmit}
                    onValuesChange={() => checkFormValid()}
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
                        {!isEdit && (
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
                        )}
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Drawer>
    )
}

export { AddEditStaffDrawer }
