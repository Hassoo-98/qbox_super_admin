import { Modal, Button, Flex, Form, message } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { MyDatepicker, MyInput, MySelect } from "../../../Forms";
import { promotiontype, serviceprovider, status } from "../../../../shared";
import { usePromotion } from "../../../../hooks/usePromotion";
interface AddEditModalProps {
    visible?: boolean;
    onClose: () => void;
    title: string;
    onConfirm: () => void;
}

const AddEditPromotion: React.FC<AddEditModalProps> = ({
    visible,
    onClose,
    title,
    onConfirm
}) => {
    const { t } = useTranslation();
    const isRTL = i18n.language === "ar";
    const [form] = Form.useForm()
    const { createPromotion } = usePromotion();

    const handleSubmit = async (values: any) => {
        try {
            const selectedProvider = serviceprovider(t).find(
                (item) => item.id === values.merchant_provider_name
            );

            const selectedPromoType = promotiontype(t).find(
                (item) => item.id === values.promo_type
            );

            const payload = {
                title: values.title,
                description: values.description,
                promo_type: selectedPromoType?.name,

                user_limit: values.user_limit?.toString(),
                merchant_provider_name: selectedProvider?.name,
                is_active: values.is_active === 1 ? true : false,
                start_date: values.start_date?.format("YYYY-MM-DD"),
                end_date: values.end_date?.format("YYYY-MM-DD"),
            };

            console.log("Final Payload:", payload); 

            await createPromotion(payload);
            message.success("Promotion Created Successfully");
            onClose();
            form.resetFields();

        } catch (error: any) {
            console.log("Backend Error:", error?.response?.data);
            message.error(error?.response?.data?.detail || "Error Occurred");
        }
    };



    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onClose}
            centered
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            footer={
                <Flex justify="end" gap={5}>
                    <Button
                        onClick={onClose}
                        className="btncancel text-black border-gray"
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        className="btnsave border-0 text-white bg-slate-blue"
                        onClick={() => form.submit()}
                    >
                        {t("Save")}
                    </Button>
                </Flex>
            }
        >
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
            >
                <Flex vertical>
                    <MyInput
                        label={t("Promotion Code")}
                        name={""}
                        placeholder={t("Enter promotion code")}
                    />
                    <MyInput
                        label={t("Promotion Title")}
                        name="title"
                        placeholder={t("Enter promotion title")}
                        required
                        message={t("Please enter promotion title")}
                    />
                    <MyInput
                        label={t("Description")}
                        name="description"
                        placeholder={t("Write description here")}
                        required
                        message={t("Please enter description")}
                        textArea
                    />
                    <MySelect
                        label={t("Promotion Type")}
                        name="promo_type"
                        message={t("Please choose promotion type")}
                        options={promotiontype(t)}
                        placeholder={t("Select Promotion Type")}
                    />
                    {/* <MyInput
                        label={t("Promotion Value")}
                        name=""
                        placeholder={t("Enter usage limit per user")}
                        addonAfter="SAR"
                    /> */}
                    <MyInput
                        label={t("User limit")}
                        name="user_limit"
                        required
                        message={t("Please enter user limit")}
                        placeholder={t("Enter usage limit per user")}
                    />
                    <MySelect
                        label={t("Provider")}
                        name="merchant_provider_name"
                        message={t("Please choose service provider")}
                        options={serviceprovider(t)}
                        placeholder={t("Select Service Provider")}
                    />
                    <MySelect
                        label={t("Status")}
                        name="is_active"
                        message={t("Please choose service provider")}
                        options={status(t)}
                        placeholder={t("Select Status")}
                    />
                    <MyDatepicker
                        datePicker
                        label={t("Start Date")}
                        name="start_date"
                        className="datepicker-cs"
                        required
                        message={t("Please select start date")}
                        placeholder={t("Select start date")}
                    />
                    <MyDatepicker
                        datePicker
                        label={t("End Date")}
                        name="end_date"
                        className="datepicker-cs"
                        required
                        message={t("Please select end date")}
                        placeholder={t("Select end date")}
                    />
                </Flex>
            </Form>
        </Modal>
    );
};

export { AddEditPromotion };
