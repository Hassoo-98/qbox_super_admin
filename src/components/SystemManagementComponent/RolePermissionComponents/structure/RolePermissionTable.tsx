import {
  Typography,
  Card,
  Flex,
  Table,
  Form,
  Row,
  Col,
  Button,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  ConfirmModal,
  CustomPagination,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { SearchInput, MySelect } from "../../../Forms";
import type { RolePermissionType } from "../../../../types";
import { useState, useEffect } from "react";
import { rolepermissionColumn } from "../../../../data";
import { statusItems } from "../../../../shared";
import { useTranslation } from "react-i18next";
import { AddEditRoleDrawer } from "../modal/AddEditRoleDrawer";
import { useRoles } from "../../../../hooks/useRolePermission";

const { Text } = Typography;

const RolePermissionTable = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);

  const [deleteItem, setDeleteItem] = useState<RolePermissionType | null>(null);
  const [addRoleDrawer, setAddRoleDrawer] = useState(false);
  const [statusChanged, setStatusChanged] = useState<RolePermissionType | null>(null);
  const [editRoleItem, setEditRoleItem] = useState<RolePermissionType | null>(null);

  /* ---------------- Debounce Search ---------------- */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  /* ---------------- API Params ---------------- */
  const params = {
    search: debouncedSearch || undefined,
    is_active: selectedStatus || undefined,
    page: current,
    limit: pageSize,
  };

  const {
    roleList,
    isLoadingRoleList,
    deleteRole,
    changeRoleStatus,
  } = useRoles(params);

  /* ---------------- Normalize Backend UUID ---------------- */
  const roleData: RolePermissionType[] =
    roleList?.data?.items?.map((item: any) => ({
      ...item,
      uuid: item.uuid ?? item.id, // always ensure uuid exists
    })) || [];

  const totalRoles = roleList?.data?.total || 0;

  /* ---------------- Pagination ---------------- */
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  /* ---------------- Status Filter ---------------- */
  const statusOptions = statusItems(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
    setCurrent(1);
  };

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

            <Button
              className="btncancel text-black"
              onClick={() => {
                setEditRoleItem(null);
                setAddRoleDrawer(true);
              }}
            >
              <PlusOutlined /> {t("Add Role")}
            </Button>
          </Flex>

          {/* ---------------- Filters ---------------- */}
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={16} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      value={search}
                      inputProps={{
                        onChange: (e: any) => setSearch(e.target.value),
                      }}
                      placeholder={t("Search by Role Name")}
                      prefix={
                        <img
                          src="/assets/icons/search.png"
                          width={16}
                          alt="search icon"
                        />
                      }
                    />
                  </Col>

                  <Col span={24} md={24} lg={12}>
                    <Flex gap={10}>
                      <MySelect
                        withoutForm
                        className="px-3 filter-bg fs-13 text-black"
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

        {/* ---------------- Table ---------------- */}
        <Flex vertical gap={20}>
          <Table<RolePermissionType>
            size="large"
            loading={isLoadingRoleList}
            columns={rolepermissionColumn(
              {
                setStatusChanged,
                setDeleteItem,
                setEditRoleItem,
                setAddRoleDrawer,
              },
              t
            )}
            dataSource={roleData}
            rowKey="uuid"
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
            rowHoverable={false}
            pagination={false}
          />

          <CustomPagination
            total={totalRoles}
            current={current}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Card>

      {/* ---------------- Status Change ---------------- */}
      <ConfirmModal
        visible={!!statusChanged}
        title={
          statusChanged?.is_active
            ? t("Inactivate Role")
            : t("Activate Role")
        }
        desc={
          statusChanged?.is_active
            ? t("Are you sure you want to inactive this role?")
            : t("Are you sure you want to activate this role?")
        }
        onClose={() => setStatusChanged(null)}
        onConfirm={async () => {
          if (!statusChanged?.uuid) {
            message.error("Role UUID not found");
            return;
          }

          try {
            await changeRoleStatus({
              uuid: statusChanged.uuid,
              is_active: !statusChanged.is_active,
            });
            setStatusChanged(null);
          } catch (err: any) {
            message.error(err?.message || "Error");
          }
        }}
      />

      {/* ---------------- Delete ---------------- */}
      <DeleteModal
        title={t("Delete Role")}
        subtitle={t(
          "This action is undone. Are you sure you want to delete this role?"
        )}
        visible={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => {
          if (!deleteItem?.uuid) {
            message.error("Role UUID not found");
            return;
          }

          try {
            await deleteRole(deleteItem.uuid);
            setDeleteItem(null);
          } catch (err: any) {
            message.error(err?.message || "Error");
          }
        }}
      />

      {/* ---------------- Drawer ---------------- */}
      <AddEditRoleDrawer
        visible={addRoleDrawer}
        onClose={() => setAddRoleDrawer(false)}
        editItem={editRoleItem}
      />
    </>
  );
};

export { RolePermissionTable };
