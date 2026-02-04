import { useState } from "react";
import { Typography, Card, Flex, Table, Form, Row, Col } from "antd";
import { CustomPagination, ModuleTopHeading } from "../../../PageComponents";
import { activitylogData, activityColumn } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import type { ActivitylogTypes } from "../../../../types";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
const { Text } = Typography;
const ActivitylogTable: React.FC = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [selectedRole, setselectedRole] = useState<string | null>(null);
  const [selectedaction, setselectedAction] = useState<string | null>(null);
  const { t } = useTranslation();

  const roleItems = [
    { id: "supervisor", name: t("Supervisor") },
    { id: "admin", name: t("Admin") },
    { id: "agent", name: t("Agent") },
  ];

  const actionItems = [
    { id: "edit", name: t("Edit") },
    { id: "delete", name: t("Delete") },
    { id: "add", name: t("Add") },
  ];

  const handleRoleChange = (value: any) => {
    setselectedRole(value);
  };

  const handleActionChange = (value: any) => {
    setselectedAction(value);
  };

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const isRTL = i18n.language === "ar";

  return (
    <>
      <Card
        className="radius-12 border-gray card-cs h-100"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
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
                      <MySelect
                        withoutForm
                        className="filter-bg fs-13 text-black"
                        options={roleItems}
                        placeholder={t("Role")}
                        value={selectedRole}
                        onChange={handleRoleChange}
                        allowClear
                      />
                      <MySelect
                        withoutForm
                        className="filter-bg fs-13 text-black"
                        options={actionItems}
                        placeholder={t("Action")}
                        value={selectedaction}
                        onChange={handleActionChange}
                        allowClear
                        maxWidth={150}
                      />
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
