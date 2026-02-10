import { useState } from "react";
import { Flex, Form, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  ConfirmModal,
  DeleteModal,
  GlobalTable,
} from "../../../PageComponents";
import { SearchInput, MySelect } from "../../../Forms";
import type { staffType } from "../../../../types";
import { staffColumn } from "../../../../data";
import { AddEditStaffDrawer } from "../modal";
import { useTranslation } from "react-i18next";
import { statusItems } from "../../../../shared";
import i18n from "../../../../sources/i18n";
import { useStaff } from "../../../../hooks/useStaff";
import { useGlobalContext } from "../../../../context/globalContext";

const StaffsTable: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isRTL = i18n.language === "ar";

  // Pagination
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);

  // Filters
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();

  // Local UI state
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState<staffType | null>(null);
  const [statusChanged, setStatusChanged] = useState<boolean>(false);

  // Hooks
  const {
    staffList,
    isLoadingStaffList,
    changeStaffStatus,
    deleteStaff,
  } = useStaff();

  const {
    modals,
    setModals,
    tableSelectedIds,
    setTableSelectedIds,
  } = useGlobalContext();

  const staffData = Array.isArray(staffList?.data?.items)
    ? staffList.data.items
    : [];

  const totalStaff = staffList?.total || 0;
  


  const roleItems = [
    { id: "supervisor", name: t("Supervisor") },
    { id: "admin", name: t("Admin") },
    { id: "agent", name: t("Agent") },
  ];

  const statusOptions = statusItems(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const handleDelete = () => {
    if (!tableSelectedIds.staffSelectedId) return;

    deleteStaff(tableSelectedIds.staffSelectedId, {
      onSuccess: () => {
        setModals((prev) => ({ ...prev, staffDelete: false }));
        setTableSelectedIds((prev) => ({
          ...prev,
          staffSelectedId: null,
        }));
      },
      onError: () => {
        setModals((prev) => ({ ...prev, staffDelete: false }));
        setTableSelectedIds((prev) => ({
          ...prev,
          staffSelectedId: null,
        }));
      },
    });
  };

  /** ---------------- FILTER UI ---------------- */
  const filters = (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 16]} align="middle">
        <Col span={24} md={12}>
          <SearchInput
            placeholder={t("Search by Staff Name")}
            prefix={
              <img
                src="/assets/icons/search.png"
                width={16}
                alt="search icon"
              />
            }
          />
        </Col>
        <Col span={24} md={12}>
          <Flex gap={10} wrap="wrap">
            <MySelect
              withoutForm
              className="filter-bg fs-13 text-black"
              options={roleItems}
              placeholder={t("Role")}
              value={selectedRole}
              onChange={setSelectedRole}
              allowClear
              maxWidth={150}
            />
            <MySelect
              withoutForm
              className="filter-bg fs-13 text-black"
              options={statusOptions}
              placeholder={t("Status")}
              value={selectedStatus}
              onChange={setSelectedStatus}
              allowClear
              maxWidth={150}
            />
          </Flex>
        </Col>
      </Row>
    </Form>
  );

  return (
    <>
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <GlobalTable
          title={t("Staffs")}
          description={t("Manage all your staffs in your system")}
          filters={filters}
          loading={isLoadingStaffList}
          extra={
            <Button
              className="btncancel text-black"
              onClick={() => setVisible(true)}
            >
              <PlusOutlined /> {t("Add Staff")}
            </Button>
          }
          columns={staffColumn(
            setVisible,
            setEditItem,
            setStatusChanged,
            modals,
            setModals,
            tableSelectedIds,
            setTableSelectedIds,
            t
          )}
          dataSource={staffData as any}
          rowKey="id"
          paginationProps={{
            total: totalStaff,
            current,
            pageSize,
            onPageChange: handlePageChange,
          }}
        />
      </div>

      {/* Add / Edit Drawer */}
      <AddEditStaffDrawer
        visible={visible}
        edititem={editItem}
        onClose={() => {
          setVisible(false);
          setEditItem(null);
        }}
      />

      {/* Activate / Inactivate */}
    <ConfirmModal
  visible={statusChanged}
  title={editItem?.is_active ? t("Inactivate Staff") : t("Activate Staff")}
  desc={
    editItem?.is_active
      ? t("Are you sure you want to inactivate this staff?")
      : t("Are you sure you want to activate this staff?")
    
  }
  
  onClose={() => setStatusChanged(false)}
  onConfirm={() => {
    if (!editItem?.id) return;

    // Toggle status: if active -> deactivate, if inactive -> activate
    const newStatus = !editItem.is_active;

    changeStaffStatus(
      { id: editItem.id, is_active: newStatus },
      {
        onSuccess: () => {
          // Update local editItem state immediately for UI consistency
          setEditItem((prev) => prev ? { ...prev, is_active: newStatus } : prev);
          setStatusChanged(false); // close modal
        },
        onError: () => {
          setStatusChanged(false); // close modal even if error
        },
      }
    );
  }}
/>



      {/* Delete */}
      <DeleteModal
        title={t("Delete Staff")}
        subtitle={t(
          "This action is undone. Are you sure you want to delete this staff?"
        )}
        visible={modals.staffDelete}
        onConfirm={handleDelete}
        onClose={() =>
          setModals((prev) => ({ ...prev, staffDelete: false }))
        }
      />
    </>
  );
};

export { StaffsTable };
