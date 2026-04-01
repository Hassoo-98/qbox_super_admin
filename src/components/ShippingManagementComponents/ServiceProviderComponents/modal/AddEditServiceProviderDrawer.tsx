import { CloseOutlined, EditFilled } from '@ant-design/icons'
import { Button, Col, Divider, Drawer, Flex, Form, Row, Switch, Typography, message } from 'antd'
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
    const [submitting, setSubmitting] = useState(false);

    const daysOfWeek = [
        t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"),
        t("Friday"), t("Saturday"), t("Sunday")
    ];
    // Drawer only needs mutations; disable list fetching to avoid duplicate network calls
    const { createServiceProvider, updateServiceProvider, isCreatingServiceProvider, isUpdatingServiceProvider } = useServiceProvider(undefined, { enabled: false });


const handleSubmit = async (values: any) => {
    console.log("FORM VALUES:", values);
    if (submitting) return;
    setSubmitting(true);

    // Normalize operating cities to numeric ids
    const normalizedOperatingCities = Array.isArray(values.operatingCities)
        ? values.operatingCities.map((c: any) => Number(c)).filter((n: number) => !Number.isNaN(n))
        : [];

    // Map frontend markup option ids to backend choice strings
    const markupTypeMap: Record<number, string> = {
        1: "fixed",
        2: "percentage",
    };

    const normalizedMarkupType = markupTypeMap[Number(values.markupType)] ?? String(values.markupType ?? "");

    const payload: any = {
        name: values.serviceproviderName,
        business_registration_number: values.businessReg,
        contact_person_name: values.contactpersonName,
        phone_number: values.phoneNumber,
        email: values.email,
        operating_cities: normalizedOperatingCities,
        settlement_cycle_days: Number(values.settlementCycle) || undefined,
        markup_type: normalizedMarkupType,
        markup_value: String(values.markupValue ?? ""),
        first_kg_charge: String(values.charge ?? ""),
        additional_kg_charge: String(values.additionalKg ?? ""),
        fuel_surcharge_percentage: String(values.taxFuel ?? ""),
        fuel_surcharge_enabled: !!values.taxFuelEnabled,
    };

    try {
        if (edititem) {
            // Resolve id from multiple possible shapes to avoid `undefined`
            const resolvedId = (edititem as any).id ?? (edititem as any).key ?? (edititem as any)?._raw?.id ?? (edititem as any)?.pk ?? undefined;

            if (!resolvedId) {
                message.error("Update cancelled: provider id is undefined.");
                console.error("Update cancelled: provider id is undefined. Edit item:", edititem);
                return;
            }

            await updateServiceProvider({ id: Number(resolvedId), payload });
            message.success("Provider updated");
        } else {
            await createServiceProvider(payload);
            message.success("Provider created");
        }

        form.resetFields();
        setPreviewImage(null);
        onClose();
    } catch (error: any) {
        console.error("API Error:", error);
        const text = error?.message || "Failed to save provider";
        message.error(text);
    } finally {
        setSubmitting(false);
    }
};


    useEffect(() => {
        if (visible && edititem) {
            form.setFieldsValue({
                // support both mock shape (providerName) and API shape (name, operating_cities...)
                serviceproviderName: (edititem as any)?.providerName?.name ?? (edititem as any)?.name,
                businessReg: (edititem as any)?.business_registration_number,
                settlementCycle: (edititem as any)?.totalDeliveries ?? (edititem as any)?.settlement_cycle_days,
                contactpersonName: (edititem as any)?.contactpersonName ?? (edititem as any)?.contact_person_name,
                phoneNumber: (edititem as any)?.phoneNumber ?? (edititem as any)?.phone_number,
                email: (edititem as any)?.email,
                operatingCities: (edititem as any)?.cities?.map?.((c: any) => c.id) ?? (edititem as any)?.operating_cities,
                markupType: (edititem as any)?.markup_type,
                markupValue: (edititem as any)?.markup_value,
                first: (edititem as any)?.first,
                charge: (edititem as any)?.first_kg_charge,
                additionalKg: (edititem as any)?.additional_kg_charge ?? (edititem as any)?.additionalKg,
                taxFuel: (edititem as any)?.fuel_surcharge_percentage,
                taxFuelEnabled: (edititem as any)?.fuel_surcharge_enabled,
            });

            setPreviewImage((edititem as any)?.providerName?.img ?? (edititem as any)?.img ?? null);
        } else {
            form.resetFields();
            setPreviewImage(null);
        }
    }, [visible, edititem, form]);

    
    useEffect(() => {
    if (visible) {
        const defaultWorkingHours: any = {};

        ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        .forEach((day) => {
            defaultWorkingHours[day] = [
                {
                    fromTime: null,
                    toTime: null,
                }
            ];
        });

        form.setFieldsValue(defaultWorkingHours);

        if (edititem) {
            form.setFieldsValue({
                ...defaultWorkingHours,
                ...edititem,
            });
        }
    } else {
        form.resetFields();
    }
}, [visible]);

    const handleUpload = async (_file: RcFile | RcFile[]) => { /* implement if needed */ };

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
    loading={submitting}
    disabled={submitting}
    onClick={async () => {
        try {
            const values = await form.validateFields();
            await handleSubmit(values);
        } catch (err: any) {
            const msg = t("Please fill required fields correctly");
            message.error(msg);
            console.warn("Validation failed:", err);
        }
    }}
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
                                 <div className="preview-box radius-12">
                                   <img src={previewimage} alt="logo" className="preview-img" />
                                 </div>
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
                            <Form.Item name="taxFuelEnabled" valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Flex align="center" gap={10}>
                                    <Switch size="small" />
                                    <Text>{t("Tax fuel")}</Text>
                                </Flex>
                            </Form.Item>
                        </Col>

                        <Col span={18}>
                            <MyInput
                                name="taxFuel"
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
