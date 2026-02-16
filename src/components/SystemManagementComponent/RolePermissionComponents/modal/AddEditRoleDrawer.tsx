import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Flex, Form, Row, Typography, Checkbox } from "antd";
import React, { Children, useEffect } from "react";
import { MyInput } from "../../../Forms";
import { useTranslation } from "react-i18next"; // Added for translation

const { Title, Text } = Typography;

interface AddEditRoleDrawerProps {
  visible: boolean;
  onClose: () => void;
  editItem?: { roleName: string; permissions: string[] } | null;
  onConfirm: (roleName: string, permissions: string[]) => void;
}

const permissionTree = [
  {
    label: "Dashboard",
    value: "dashboard",
  },
  {
    label: "Home Owners",
    value: "home_owners",
    children: [
      { label: "View Homeowners", value: "view_homeowners" },
    ],
  },
  {
    label: "Requests Queue",
    value: "requests_queue",
    children: [
      { label: "View Requests Queue", value: "view_requests_queue" },
    ],
  },
  {
    label: "All Qboxes",
    value: "all_qboxes",
    children: [
      { label: "View All Qboxes", value: "view_all_qboxes" },
    ],
  },
  {
    label: "Installment Pending",
    value: "installment_pending",
  },
  {
    label: "Subscription Management",
    value: "subscription_management",
    children: [
      { label: "View Subscription Management", value: "view_subscription" },
    ],
  },
  {
    label: "Revenue Management",
    value: "revenue_management",
  },
  {
    label: "Service Providers",
    value: "service_provider",
    children: [
      { label: "View Service Provider", value: "view_service_provider" },
      { label: "Delete Service Provider", value: "delete_service_provider" },
    ]
  },
  {
    label: "All Shipments",
    value: "all_shipments",
    children: [
      { label: "View Shipment", value: "view_shipment" },
    ]
  },
  {
    label: "Service Provider Requests",
    value: "view_all_service_provider_request",
    children: [
      { label: "View Service Provider Requests", value: "view_service_provider_request" },
    ]
  },
  {
    label: "Payout History",
    value: "payout_history",
    children: [
      { label: "View Payout History", value: "view_payout_history" },
    ]
  },
  {
    label: "Payout Requests",
    value: "payout_request",
    children: [
      { label: "View Payout Request", value: "view_payout_request" },
    ]
  },
  {
    label: "Staffs",
    value: "view_staffs",
    children: [
      { label: "Add Staff", value: "add_staff" },
      { label: "View Staff", value: "view_staff" },
    ]
  },
  {
    label: "Promorions",
    value: "view_promotions",
    children: [
      { label: "Add Promotion", value: "add_promotion" },
      { label: "View Promotion", value: "view_promotion" },
    ]
  },
    {
    label: "Activity Log",
    value: "activity_log",
  },
];


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
              <Flex vertical gap={10}>
                {permissionTree.map((item) => (
                  <div key={item.value}>
                    {/* Parent Checkbox */}
                    <Checkbox
                      checked={permissions.includes(item.value)}
                    >
                      {t(item.label)}
                    </Checkbox>
                    {item.children && (
                      <Flex vertical gap={5} style={{ marginLeft: '10px', marginTop: '5px' }}>
                        {item.children.map((child) => (
                          <Checkbox
                            key={child.value}
                            checked={permissions.includes(child.value)}
                          >
                            {t(child.label)}
                          </Checkbox>
                        ))}
                      </Flex>
                    )}
                  </div>
                ))}
              </Flex>
            </Col>
          </Row>
        </Form>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Drawer>
  );
};

export { AddEditRoleDrawer };
