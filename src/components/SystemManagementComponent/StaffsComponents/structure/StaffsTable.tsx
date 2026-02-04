import { Typography, Card, Flex, Table, Form, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  ConfirmModal,
  CustomPagination,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { SearchInput, MySelect } from "../../../Forms";
import type { staffType } from "../../../../types";
import { useState } from "react";
import { staffColumn, staffData } from "../../../../data";
import { statusItems } from "../../../../shared";
import { AddEditStaffDrawer } from "../modal";
import i18n from "../../../../sources/i18n";
import { useTranslation } from "react-i18next";

const { Text } = Typography;
const StaffsTable = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [selectedRole, setselectedRole] = useState<string>("");
  const [selectedStatus, setselectedStatus] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [edititem, setEditItem] = useState<staffType | null>(null);
  const [statuschanged, setStatusChanged] = useState<boolean>(false);
  const [deleteitem, setDeleteItem] = useState<boolean>(false);
  const roleItems = [
    { id: "supervisor", name: t("Supervisor") },
    { id: "admin", name: t("Admin") },
    { id: "agent", name: t("Agent") },
  ];

  const statusOptions = statusItems(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handleRoleChange = (value: any) => {
    setselectedRole(value);
  };
  const handleStatusChange = (value: any) => {
    setselectedStatus(value);
  };

  const isRTL = i18n.language === "ar";
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  return (
    <>
      <Card
        className="radius-12 border-gray card-cs h-100"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <Flex vertical gap={10} className="mb-2">
          <Flex align="center" justify="space-between" gap={10}>
            <Flex vertical>
              <ModuleTopHeading level={5} name={t("Staffs")} />
              <Text className="text-gray fs-13">
                {t("Manage all your staffs in your system")}
              </Text>
            </Flex>
            <Button
              className="btncancel text-black"
              onClick={() => setVisible(true)}
            >
              <PlusOutlined /> {t("Add Staff")}
            </Button>
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
                    <Flex gap={10}>
                      <MySelect
                        withoutForm
                        className="filter-bg fs-13 text-black"
                        options={roleItems}
                        placeholder={t("Role")}
                        value={selectedRole}
                        onChange={handleRoleChange}
                        allowClear
                        maxWidth={150}
                      />
                      <MySelect
                        withoutForm
                        className="filter-bg fs-13 text-black"
                        options={statusOptions}
                        placeholder={t("Status")}
                        value={selectedStatus}
                        onChange={handleStatusChange}
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
          <Table<staffType>
            size="large"
            columns={staffColumn(
              setVisible,
              setEditItem,
              setStatusChanged,
              setDeleteItem,
              t,
            )}
            dataSource={staffData}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
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

      <AddEditStaffDrawer
        visible={visible}
        edititem={edititem}
        onClose={() => {
          setVisible(false);
          setEditItem(null);
        }}
      />
      <ConfirmModal
        visible={statuschanged}
        title={
          edititem?.status === "active"
            ? t("Inactivate Staff")
            : t("Activate Staff")
        }
        desc={
          edititem?.status === "active"
            ? t("Are you sure you want to inactive this staff?")
            : t("Are you sure you want to active this staff?")
        }
        onClose={() => setStatusChanged(false)}
      />
      <DeleteModal
        title={t("Delete Staff")}
        subtitle={t(
          "This action is undone. Are you sure you want to delete this staff?",
        )}
        visible={deleteitem}
        onClose={() => setDeleteItem(false)}
      />
    </>
  );
};

export { StaffsTable };
