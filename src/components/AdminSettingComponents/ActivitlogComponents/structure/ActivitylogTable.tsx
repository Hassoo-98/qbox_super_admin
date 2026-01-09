import { useState } from "react";
import {
  Typography,
  Card,
  Flex,
  Table,
  Form,
  Row,
  Col,
  Dropdown,
  type MenuProps,
  Button,
} from "antd";
import { CustomPagination, ModuleTopHeading } from "../../../PageComponents";
import { activitylogData, activityColumn } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { DownOutlined } from "@ant-design/icons";
import type { ActivitylogTypes } from "../../../../Type";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
const { Text } = Typography;
const ActivitylogTable: React.FC = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [selectedRole, setselectedRole] = useState<string>("");
  const [selectedaction, setselectedAction] = useState<string>("");
  const { t } = useTranslation();

  const roleItems: { key: string; label: string }[] = [
    { key: "supervisor", label: t("Supervisor") },
    { key: "admin", label: t("Admin") },
    { key: "agent", label: t("Agent") },
  ];

  const actionItems: { key: string; label: string }[] = [
    { key: "edit", label: t("Edit") },
    { key: "delete", label: t("Delete") },
    { key: "add", label: t("Add") },
  ];

  const handleRoleClick: MenuProps["onClick"] = ({ key }) => {
    setselectedRole(key);
  };

  const handleActionClick: MenuProps["onClick"] = ({ key }) => {
    setselectedAction(key);
  };

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const selectedRoleLabel =
    roleItems.find((item) => item.key === selectedRole)?.label || t("City");
  const selectedActionLabel =
    actionItems.find((item) => item.key === selectedaction)?.label ||
    t("Action");
      const isRTL = i18n.language === "ar";
      

  return (
    <>
      <Card className="radius-12 border-gray card-cs h-100"   style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Flex vertical gap={10} className="mb-2">
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("Activity Log")} />
            <Text className="text-gray fs-13">
              {t("Manage all your logs in your system")}
            </Text>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={16} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by Staff Name")}
                      prefix={
                        <img
                          src="/assets/icons/search.png"
                          width={16}
                          alt="search icon"
                          fetchPriority="high"
                        />
                      }
                    />
                  </Col>
                  <Col span={24} md={24} lg={12}>
                    <Flex gap={5}>
                      <Dropdown
                        menu={{
                          items: roleItems,
                          onClick: handleRoleClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedRoleLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                      <Dropdown
                        menu={{
                          items: actionItems,
                          onClick: handleActionClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedActionLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                    </Flex>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<ActivitylogTypes>
            size="large"
            columns={activityColumn(t)}
            dataSource={activitylogData}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 1300 }}
            rowHoverable={false}
            pagination={false}
          />
          <CustomPagination
            total={12}
            current={current}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Card>
    </>
  );
};

export { ActivitylogTable };
