import {
  Typography,
  Card,
  Flex,
  Table,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  type MenuProps,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ConfirmModal,
  CustomPagination,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { SearchInput } from "../../../Forms";
import type { RolePermissionType } from "../../../../Type";
import { useState } from "react";
import { rolepermissionColumn, rolepermissionData } from "../../../../data";
import { statusItems } from "../../../../shared";
import { useTranslation } from "react-i18next";
import { AddEditRoleDrawer } from "../modal/AddEditRoleDrawer";

const { Text } = Typography;
const RolePermissionTable = () => {
  const [form] = Form.useForm();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [addRoleDrawer, setAddRoleDrawer] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);

  const [editRoleItem, setEditRoleItem] = useState<{
    roleName: string;
    permissions: string[];
  } | null>(null);
  const { t } = useTranslation();

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const handleAddRoleConfirm = () => {
    setAddRoleDrawer(false);
    setEditRoleItem(null);
  };

  const handleStatusClick: MenuProps["onClick"] = ({ key }) => {
    setSelectedStatus(key);
  };

  const selectedStatusLabel =
    statusItems(t).find((item) => item.key === selectedStatus)?.label ||
    t("Status");

  return (
    <>
      <Card className="radius-12 border-gray card-cs h-100">
        <Flex vertical gap={10} className="mb-2">
          <Flex align="center" justify="space-between" gap={10}>
            <Flex vertical>
              <ModuleTopHeading level={5} name={t("Role & Permissions")} />
              <Text className="text-gray fs-13">
                {t("Manage all your roles in your system")}
              </Text>
            </Flex>
            <Button className="btncancel text-black" onClick={()=>setAddRoleDrawer(true)}>
              <PlusOutlined /> {t("Add Role")}
            </Button>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={16} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by Role Name")}
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
                      <Dropdown
                        menu={{
                          items: statusItems(t),
                          onClick: handleStatusClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedStatusLabel}
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
          <Table<RolePermissionType>
            size="large"
            columns={rolepermissionColumn(
              { setStatusChanged, setDeleteItem },
              t
            )}
            dataSource={rolepermissionData}
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
      <ConfirmModal
        visible={statusChanged}
        title={t("Inactivate Role")}
        desc={t("Are you sure you want to inactive this role?")}
        onClose={() => setStatusChanged(false)}
      />
      <DeleteModal
        title={t("Delete Role")}
        subtitle={t(
          t("This action in undone. Are you sure you want to delete this role?")
        )}
        visible={deleteItem}
        onClose={() => setDeleteItem(false)}
      />
      <AddEditRoleDrawer
        visible={addRoleDrawer}
        onClose={() => setAddRoleDrawer(false)}
        editItem={editRoleItem}
        onConfirm={handleAddRoleConfirm}
      />
    </>
  );
};

export { RolePermissionTable };
