import { Typography, Card, Flex, Table, Form, Row, Col, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  ConfirmModal,
  CustomPagination,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { SearchInput, MySelect } from "../../../Forms";
import { useState } from "react";
import { rolepermissionColumn, } from "../../../../data";
import { statusItems } from "../../../../shared";
import { useTranslation } from "react-i18next";
import { AddEditRoleDrawer } from "../modal/AddEditRoleDrawer";
import { useRole } from "../../../../hooks/useRoles";
import type { RoleItem } from "../../../../types/AllQboxTypes";
import { useGlobalContext } from "../../../../context/globalContext";
import { useQueryClient } from "@tanstack/react-query";
const { Text } = Typography;
const RolePermissionTable = () => {
  const [form] = Form.useForm();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [addRoleDrawer, setAddRoleDrawer] = useState(false);

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

  const statusOptions = statusItems(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
  };

  const queryClient = useQueryClient();

  const { RoleList, isLoadingRoleList, roleChangeStatus, deleteRole } = useRole();
  const { modals, setModals, tableSelectedIds, setTableSelectedIds, selectedRowStatus, setSelectedRowStatus } = useGlobalContext();

  const RoleData = Array.isArray(RoleList?.data?.items) ? RoleList?.data?.items : [];
  const TotalRole = RoleList?.data?.total || 0;

   const changeStatus = (currentStatus: boolean | null) => {
        if (!tableSelectedIds.roleSelectedId) {
            message.error("role  is not selected");
            return;
        }
        roleChangeStatus(
            { id: tableSelectedIds.roleSelectedId, payload: { is_active: !currentStatus } },
            {
                onSuccess: () => {
                    message.success("promotion status changed"),
                        queryClient.invalidateQueries({ queryKey: ["Roles"] }),
                        setModals((prev: any) => ({ ...prev, statusModal: false })),
                        setTableSelectedIds((perv: any) => ({ ...perv, roleSelectedId: null }))
                }
            }
        );
    };

    const handleRoleDelete = () => {
      console.log(tableSelectedIds?.roleSelectedId)
        if (!tableSelectedIds?.roleSelectedId) return;
        deleteRole(tableSelectedIds.roleSelectedId, {
            onSuccess: () => {
                setModals((prev) => ({ ...prev, deleteModal: false }));
                queryClient.invalidateQueries({ queryKey: ["Roles"] }),
                setTableSelectedIds((prev) => ({
                    ...prev,
                    roleSelectedId: null
                }))
            },
            onError: () => {
                setModals((prev) => ({ ...prev, deleteModal: false }));
                setTableSelectedIds((prev) => ({
                    ...prev,
                    roleSelectedId: null
                }))
            }
        })
    }

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
              onClick={() => setAddRoleDrawer(true)}
            >
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
        <Flex vertical gap={20}>
          <Table<RoleItem>
            size="large"
            columns={rolepermissionColumn(
              {
                setModals,
                setTableSelectedIds,
                setSelectedRowStatus,
                t
              }
            )}
            dataSource={RoleData as any}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
            rowHoverable={false}
            pagination={false}
            loading={isLoadingRoleList}
          />
          {
            TotalRole > 10 && (
              <CustomPagination
                total={TotalRole}
                current={current}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            )
          }
        </Flex>
      </Card>
      <ConfirmModal
        visible={modals.statusModal}
        img={selectedRowStatus?.currentStatus ? "inactive.png" : "active.png"}
        title={selectedRowStatus?.currentStatus ? t("Inactivate Role") : t("Activate Role")}
        desc={selectedRowStatus?.currentStatus ? t("Are you sure you want to inactive this role?") : t("Are you sure you want to active this role?")}
        onClose={() => {
          setModals((prev) => ({ ...prev, statusModal: false }));
          setTableSelectedIds((prev) => ({ ...prev, promotionSelectedId: null }));
        }}
        onConfirm={() => changeStatus(selectedRowStatus?.currentStatus)}
      />
      <DeleteModal
                title={t("Delete Promotion")}
                subtitle={t("Are you sure you want to delete")}
                visible={modals.deleteModal}
                // item={itemToDelete}
                onConfirm={handleRoleDelete}
                onClose={() =>
                    setModals((prev) => ({ ...prev, deleteModal: false }))
                }
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
