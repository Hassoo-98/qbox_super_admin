import { CloseOutlined, EditFilled } from '@ant-design/icons'
import { Button, Col, Divider, Drawer, Flex, Form, Row, Switch, Typography } from 'antd'
import { MyInput, MySelect, SingleFileUpload, TimeForm } from '../../../Forms';
import { citiesOp, markuptypeOp } from '../../../../shared';
import type { ServiceProviderType } from '../../../../types';
import { useEffect, useState } from 'react';
import type { RcFile } from 'antd/es/upload';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../sources/i18n';
import { useServiceProvider } from '../../../../hooks/useServiceProvider';

interface props {
    edititem?: ServiceProviderType | null
    visible: boolean,
    onClose: () => void,
}

const { Title, Text } = Typography

const AddEditServiceProviderDrawer: React.FC<props> = ({ visible, onClose, edititem }) => {

    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [previewimage, setPreviewImage] = useState<string | null>(null)

    const daysOfWeek = [
        t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"),
        t("Friday"), t("Saturday"), t("Sunday")
    ];
    const { createServiceProvider, updateServiceProvider } = useServiceProvider();


const handleSubmit = async (values: any) => {
    console.log("FORM VALUES:", values); // Check values before sending

    const payload = {
        name: values.serviceproviderName,
        business_registration_number: values.businessReg,
        contact_person_name: values.contactpersonName,
        phone_number: values.phoneNumber,
        email: values.email,
        cities: values.operatingCities, // array of IDs
        settlement_cycle: values.settlementCycle,
        markup_type: values.markupType,
        markup_value: values.markupValue,
        delivery_charges: {
            first: values.first,
            charge: values.charge,
            additional_kg: values.additionalKg,
        },
        // Add working_hours or tax fuel if backend requires
    };

    try {
        if (edititem) {
            // Update API call
            await updateServiceProvider({ id: edititem.id, payload });
            console.log("Updated successfully");
        } else {
            // Create API call
            await createServiceProvider(payload);
            console.log("Created successfully");
        }

        form.resetFields();
        setPreviewImage(null);
        onClose();

    } catch (error) {
        console.error("API Error:", error);
    }
};


    useEffect(() => {
        if (visible && edititem) {
            form.setFieldsValue({
                serviceproviderName: edititem?.providerName?.name,
                settlementCycle: edititem?.totalDeliveries,
                contactpersonName: edititem?.contactpersonName,
                operatingCities: edititem?.cities?.map(city => city.id),
            });
            setPreviewImage(edititem?.providerName?.img);
        } else {
            form.resetFields();
        }
    }, [visible, edititem]);

    const handleUpload = async (_file: RcFile | RcFile[]) => {};

    const handleChangeImage = () => setPreviewImage(null);
  
        const isRTL = i18n.language === "ar";
    return (
        <Drawer
            title={null}
            open={visible}
            onClose={onClose}
            closeIcon={false}
            width={600}
               style={{ direction: isRTL ? "rtl" : "ltr" }}
      
            footer={
                <Flex justify='end' gap={5}>
                    <Button className='btncancel text-black border-gray' onClick={onClose}>
                        {t("Cancel")}
                    </Button>
                    <Button
    type="primary"
    className='btnsave border-0 text-white bg-slate-blue'
    onClick={() => form.submit()}
>
    {edititem ? t("Update") : t("Save")}
</Button>

                </Flex>
            }
        >
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {edititem ? t("Edit Service Provider") : t("Add Service Provider")}
                    </Title>
                    <Button onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex>

                <Form layout="vertical" form={form} requiredMark={false} onFinish={handleSubmit}>

                    <Row gutter={12}>

                        <Col span={24}>
                            {!previewimage ? (
                                <SingleFileUpload
                                    name="img"
                                    title={t("Upload Logo")}
                                    form={form}
                                    required
                                    message={t("Please upload a file")}
                                    onUpload={handleUpload}
                                    className='my-3'
                                />
                            ) : (
                                <Flex className='my-3' vertical gap={5} justify='center' align='center'>
                                    <img src={previewimage} alt="logo" className='radius-12 mxw-mxh' />
                                    <Button type="link" className='fs-13 text-brand' onClick={handleChangeImage}>
                                        <EditFilled /> {t("Edit")}
                                    </Button>
                                </Flex>
                            )}
                        </Col>

                        <Col span={24}>
                            <MyInput
                                label={t("Service Provider Name")}
                                name="serviceproviderName"
                                required
                                message={t("Please enter service provider name")}
                                placeholder={t("Enter name")}
                            />
                        </Col>

                        <Col span={24}>
                            <MyInput
                                type='number'
                                label={t("Business Registration Number")}
                                name="businessReg"
                                required
                                message={t("Please enter business registration number")}
                                placeholder="XXXXXXXXX"
                            />
                        </Col>

                        <Col span={24}>
                            <MyInput
                                label={t("Contact Person Name")}
                                name="contactpersonName"
                                required
                                message={t("Please enter contact person name")}
                                placeholder={t("Enter name")}
                            />
                        </Col>

                        <Col span={24}>
                            <MyInput
                                label={t("Phone Number")}
                                name="phoneNumber"
                                required
                                message={t("Please enter phone number")}
                                placeholder="966 XX XXX XXX"
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
                            <MySelect
                                mode="multiple"
                                label={t("Operating Cities")}
                                name="operatingCities"
                                required
                                message={t("Please choose cities")}
                                options={citiesOp(t)}
                                placeholder={t("Choose cities")}
                            />
                        </Col>

                        <Col span={24}>
                            <MyInput
                                label={t("Settlement Cycle")}
                                name="settlementCycle"
                                required
                                message={t("Please enter settlement cycle")}
                                placeholder={t("Enter cycle duration")}
                                addonAfter={t("Days")}
                            />
                        </Col>

                        <Col span={24}>
                            <MySelect
                                label={t("Markup Type")}
                                name="markupType"
                                required
                                message={t("Please choose markup type")}
                                options={markuptypeOp(t)}
                                placeholder={t("Choose type")}
                            />
                        </Col>

                        <Col span={24}>
                            <MyInput
                                label={t("Markup Value")}
                                name="markupValue"
                                required
                                message={t("Please enter markup value")}
                                placeholder={t("Enter value")}
                            />
                        </Col>

                        <Col span={24}>
                            <Title level={5}>{t("Working Hours")}</Title>
                        </Col>

                        <Col span={24}>
                            {daysOfWeek.map((day) => (
                                <TimeForm key={day} form={form} dayKey={day} title={day} />
                            ))}
                        </Col>

                        <Col span={24}>
                            <Title level={5}>{t("Delivery Charges")}</Title>
                        </Col>

                        <Col span={24} md={12}>
                            <MyInput
                                label={t("First")}
                                name="first"
                                required
                                message={t("Please enter first")}
                                addonBefore={t("KG")}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <MyInput
                                label={t("Charge")}
                                name="charge"
                                required
                                message={t("Please enter charge")}
                                addonBefore={t("SAR")}
                            />
                        </Col>

                        <Col span={24}>
                            <MyInput
                                label={t("Additional KG")}
                                name="additionalKg"
                                required
                                message={t("Please enter additional KG")}
                                addonBefore={t("SAR")}
                            />
                        </Col>

                        <Col span={6}>
                            <Flex align="center" gap={10}>
                                <Switch size="small" />
                                <Text>{t("Tax fuel")}</Text>
                            </Flex>
                        </Col>

                        <Col span={18}>
                            <MyInput
                                withoutForm
                                required
                                message={t("Please enter tax fuel")}
                                addonAfter="%"
                            />
                        </Col>

                    </Row>
                </Form>
            </Flex>

            <Divider />
        </Drawer>
    )
}

export { AddEditServiceProviderDrawer }
