import React, { useState, useEffect } from "react";
import { Flex, Form, Row, Col, Button, message } from "antd";
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
import { statusItems, staffrole } from "../../../../shared";
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
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  // Local UI state
  // local `visible` replaced by global `modals` state
  const [editItem, setEditItem] = useState<staffType | null>(null);
  const [statusChanged, setStatusChanged] = useState<boolean>(false);

  // Debounce search input (starts filtering after 2s)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setCurrent(1);
  }, [debouncedSearch, selectedRole, selectedStatus]);

  // Prepare params and fetch staff list
  const params = {
    search: debouncedSearch || undefined,
    role: selectedRole || undefined,
    is_active: selectedStatus || undefined,
    page: current,
    limit: pageSize,
  };

  const {
    staffList,
    isLoadingStaffList,
    changeStaffStatus,
    deleteStaff,
  } = useStaff(params);

  const {
    modals,
    setModals,
    tableSelectedIds,
    setTableSelectedIds,
  } = useGlobalContext();

  // normalize possible API response shapes: { data: { items, total } }, { items, total }, { data: { results, count } }
  const staffData = Array.isArray(staffList?.data?.items)
    ? staffList.data.items
    : Array.isArray((staffList as any)?.items)
    ? (staffList as any).items
    : Array.isArray(staffList?.data?.results)
    ? staffList.data.results
    : [];

  const totalStaff =
    (staffList as any)?.data?.total ??
    (staffList as any)?.total ??
    (staffList as any)?.data?.count ??
    0;
  


  const roleItems = staffrole(t).map((r) => ({ id: r.id, name: r.value })).concat([
    { id: "admin", name: t("Admin") },
    { id: "supervisor", name: t("Supervisor") },
  ]);

  // API expects is_active as a boolean-like value. We send 'true'/'false' strings.
  const statusOptions = [
    { id: "true", name: t("Active") },
    { id: "false", name: t("Inactive") },
  ];

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
          className="w-100"
            withoutForm
            value={search}
            inputProps={{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value),
            }}
            placeholder={t("Search by Staff Name")}
            prefix={<img src="/assets/icons/search.png" width={16} alt="search icon" />}
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
              onClick={() => {
                setEditItem(null);
                setTableSelectedIds((prev: any) => ({ ...prev, staffSelectedId: null }));
                setModals((prev: any) => ({ ...prev, staffAdd: true }));
              }}
            >
              <PlusOutlined /> {t("Add Staff")}
            </Button>
          }
          columns={staffColumn(
            () => {},
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
        visible={modals.staffUpdate}
        edititem={editItem}
        isEdit={true}
        onClose={() => {
          setTableSelectedIds((prev: any) => ({ ...prev, staffSelectedId: null }));
          setModals((prev: any) => ({ ...prev, staffUpdate: false }));
        }}
      />
       <AddEditStaffDrawer
        visible={modals.staffAdd}
        edititem={editItem}
        isEdit={false}
        onClose={() => {
          setTableSelectedIds((prev: any) => ({ ...prev, staffSelectedId: null }));
          setModals((prev: any) => ({ ...prev, staffAdd: false }));
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

    const newStatus = !editItem.is_active;

        changeStaffStatus(
      { id: editItem.id, is_active: newStatus },
      {
        onSuccess: () => {
          setEditItem((prev) => prev ? { ...prev, is_active: newStatus } : prev);
          setStatusChanged(false); // close modal
        },
        onError: (err: any) => {
          // Show API error details if available
          if (err && typeof err === 'object' && 'status' in err) {
            message.error(`${err.status} - ${err.message}`);
          } else {
            message.error(t('An error occurred'));
          }
          setStatusChanged(false);
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
