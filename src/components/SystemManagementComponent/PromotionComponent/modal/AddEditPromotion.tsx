import { Modal, Button, Flex, Form } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { MyDatepicker, MyInput, MySelect } from "../../../Forms";
import { promotiontype, serviceprovider, status } from "../../../../shared";
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
                        onClick={onConfirm}
                    >
                        {t("Save")}
                    </Button>
                </Flex>
            }
        >
            <Form layout="vertical">
                <Flex vertical>
                    <MyInput
                        label={t("Promotion Code")}
                        name={""}
                        placeholder={t("Enter promotion code")}
                    />
                    <MyInput
                        label={t("Promotion Title")}
                        name={""}
                        placeholder={t("Enter promotion title")}
                    />
                    <MyInput
                        label={t("Description")}
                        name={""}
                        placeholder={t("Write descripting here")}
                        textArea
                    />
                    <MySelect
                        label={t("Promotion Type")}
                        name=""
                        message={t("Please choose promotion type")}
                        options={promotiontype(t)}
                        placeholder={t("Select Promotion Type")}
                    />
                    <MyInput
                        label={t("Promotion Value")}
                        name={""}
                        placeholder={t("Enter usage limit per user")}
                        addonAfter="SAR"
                    />
                    <MyInput
                        label={t("User limit")}
                        name={""}
                        placeholder={t("Enter usage limit per user")}
                    />
                    <MySelect
                        label={t("Provider")}
                        name=""
                        message={t("Please choose service provider")}
                        options={serviceprovider(t)}
                        placeholder={t("Select Service Provider")}
                    />
                    <MySelect
                        label={t("Status")}
                        name=""
                        message={t("Please choose service provider")}
                        options={status(t)}
                        placeholder={t("Select Status")}
                    />
                    <MyDatepicker
                        datePicker
                        label={t("Start Date")}
                        className="datepicker-cs"
                        placeholder={t("Select start date")}
                    />
                    <MyDatepicker
                        datePicker
                        label={t("End Date")}
                        className="datepicker-cs"
                        placeholder={t("Select end date")}
                    />
                </Flex>
            </Form>
        </Modal>
    );
};

export { AddEditPromotion };
