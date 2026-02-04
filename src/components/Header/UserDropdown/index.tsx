import { Avatar, Button, Card, Dropdown, Flex, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const UserDropdown = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const dropdownContent = (
    <Card className="radius-12 shadow-c card-cs">
      <Space direction="vertical">
        <Flex align="center" gap={10}>
          <Avatar size={44} src={user?.avatar || "/assets/images/admin.png"} />
          <Flex vertical gap={1}>
            <Typography.Text strong className="fs-13">
              {user?.name || "Admin"}
            </Typography.Text>
            <Typography.Text className="text-gray fs-13">
              {user?.role || "Admin"}
            </Typography.Text>
          </Flex>
        </Flex>
        <Button className="btnsave w-100" type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Space>
    </Card>
  );

  return (
    <div>
      <Dropdown
        popupRender={() => dropdownContent}
        trigger={["click"]}
        className="p-0"
      >
        <Flex align="center" gap={5} className="cursor">
          <Avatar size={44} src={user?.avatar || "/assets/images/admin.png"} />
          <Flex align="flex-start" gap={5}>
            <Flex vertical gap={0} align="end">
              <Typography.Text strong className="fs-12">
                {t(user?.name || "Abdullah")}{" "}
              </Typography.Text>
              <Typography.Text className="text-gray fs-12">
                {t(user?.role || "Admin")}
              </Typography.Text>
            </Flex>
            <DownOutlined className="fs-12 py-1" />
          </Flex>
        </Flex>
      </Dropdown>
    </div>
  );
};

export { UserDropdown };
