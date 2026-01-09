import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from "antd";
import type React from "react";
import { MyDatepicker, MyInput, MySelect } from "../../../Forms";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
interface props {
  visible: boolean;
  onClose: () => void;
}

const { Title } = Typography;
const InstallmentCompletedModal: React.FC<props> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isRTL = i18n.language === "ar";

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      closeIcon={false}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      centered
      width={600}
      footer={
        <Flex justify="end" gap={5}>
          <Button
            className="btncancel text-black border-gray"
            onClick={onClose}
          >
            {t("Cancel")}
          </Button>
          <Button
            type="primary"
            className="btnsave border-0 text-white bg-slate-blue"
            onClick={() => {
              form.submit();
            }}
          >
            {t("Confirm")}
          </Button>
        </Flex>
      }
    >
      <Flex vertical gap={10}>
        <Flex vertical gap={0}>
          <Flex justify="space-between" gap={6}>
            <Title level={5} className="m-0">
              {t("Installation Completed")}
            </Title>
            <Button onClick={onClose} className="p-0 border-0 bg-transparent">
              <CloseOutlined className="fs-18" />
            </Button>
          </Flex>
        </Flex>
        <Form
          layout="vertical"
          form={form}
          // onFinish={}
          requiredMark={false}
        >
          <Row>
            <Col span={24}>
              <MyDatepicker
                datePicker
                label={t("Installation Date")}
                name="installationDate"
                required
                message={t("Please enter installation date")}
                placeholder={t("Select date")}
              />
            </Col>
            <Col span={24}>
              <MyInput
                label={t("Technician")}
                name="technician"
                required
                message={t("Please enter technician")}
                placeholder={t("Write technician name")}
              />
            </Col>
            <Col span={24}>
              <MySelect
                label={t("Supervisor")}
                name={"supervisor"}
                required
                message={t("Please choose supervisor")}
                options={[
                  {
                    id: 1,
                    name: t("Sheeraz Khan"),
                  },
                ]}
                placeholder={t("Choose supervisor")}
              />
            </Col>
          </Row>
        </Form>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Modal>
  );
};

export { InstallmentCompletedModal };
