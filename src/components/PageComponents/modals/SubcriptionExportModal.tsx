import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from "antd";
import type React from "react";
import { MyDatepicker } from "../../Forms";
import { useTranslation } from "react-i18next";
import i18n from "../../../sources/i18n";
interface props {
  visible: boolean;
  onClose: () => void;
}

const { Title } = Typography;
const SubscriptionExportModal: React.FC<props> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isRTL = i18n.language === "ar";

  return (
    <Modal
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      title={null}
      open={visible}
      onCancel={onClose}
      closeIcon={false}
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
            {t("Export")}
          </Button>
        </Flex>
      }
    >
      <Flex vertical gap={10}>
        <Flex vertical gap={0}>
          <Flex justify="space-between" gap={6}>
            <Title level={5} className="m-0">
              {t("Export")}
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
                label={t("Start Date")}
                name="startdate"
                required
                message={t("Please enter start date")}
                placeholder-={t("Select date")}
              />
            </Col>
            <Col span={24}>
              <MyDatepicker
                datePicker
                label={t("End Date")}
                name="enddate"
                required
                message={t("Please enter end date")}
                placeholder={t("Select date")}
              />
            </Col>
          </Row>
        </Form>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Modal>
  );
};

export { SubscriptionExportModal };
