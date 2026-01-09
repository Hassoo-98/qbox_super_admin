import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Flex, Form, Row, Typography, Checkbox } from "antd";
import React, { useEffect } from "react";
import { MyInput } from "../../../Forms";
import { useTranslation } from "react-i18next"; // Added for translation

const { Title, Text } = Typography;

interface AddEditRoleDrawerProps {
  visible: boolean;
  onClose: () => void;
  editItem?: { roleName: string; permissions: string[] } | null;
  onConfirm: (roleName: string, permissions: string[]) => void;
}

const permissionOptions = ["Dashboard", "AllQBoxes", "ViewQBoxes", "ViewLogs"];

const AddEditRoleDrawer: React.FC<AddEditRoleDrawerProps> = ({
  visible,
  onClose,
  editItem,
  onConfirm,
}) => {
  const [form] = Form.useForm();
  const [permissions, setPermissions] = React.useState<string[]>([]);
  const { t } = useTranslation(); // Translation hook

  useEffect(() => {
    if (visible && editItem) {
      form.setFieldsValue({
        roleName: editItem.roleName,
      });
      setPermissions(editItem.permissions || []);
    } else if (visible) {
      form.resetFields();
      setPermissions([]);
    }
  }, [visible, editItem, form]);

  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm(values.roleName, permissions);
        form.resetFields();
        setPermissions([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Drawer
      title={null}
      open={visible}
      onClose={onClose}
      closeIcon={false}
      width={600}
      footer={
        <Flex justify="end" gap={5}>
          <Button className="btncancel text-black border-gray" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button type="primary" className="btnsave border-0 text-white brand-bg" onClick={handleConfirm}>
            {editItem ? t("Update") : t("Confirm")}
          </Button>
        </Flex>
      }
    >
      <Flex vertical gap={10}>
        <Flex justify="space-between" gap={6} align="center">
          <Title level={5} className="m-0">
            {editItem ? t("Edit Role") : t("Add Role")}
          </Title>
          <Button onClick={onClose} className="p-0 border-0 bg-transparent">
            <CloseOutlined className="fs-18" />
          </Button>
        </Flex>

        <Form layout="vertical" form={form} requiredMark={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="roleName"
                rules={[{ required: true, message: t("Please enter role name") }]}
              >
                <MyInput
                  label={t("Role Name")}
                  placeholder={t("Enter role name...")}
                  name="roleName"
                  required
                  message={t("Please enter Role...")}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Text strong>{t("Permissions")}:</Text>
              <Checkbox.Group
                options={permissionOptions.map((p) => ({ label: t(p), value: p }))}
                value={permissions}
                onChange={(checked) => setPermissions(checked as string[])}
                style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}
              />
            </Col>
          </Row>
        </Form>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Drawer>
  );
};

export { AddEditRoleDrawer };
