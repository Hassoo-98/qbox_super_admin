import { useState } from "react";
import { Flex, Form, Row, Col, message } from "antd";
import {
  ActiveModal,
  ConfirmModal,
  DeleteModal,
  GlobalTable,
} from "../../../PageComponents";
import { homeownersColumn } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { useNavigate } from "react-router-dom";
// import type { HomerOwnerTypes } from "../../../../types";
import { useTranslation } from "react-i18next";
import { useHomeowner } from "../../../../hooks/useHomeOwner";
import { useGlobalContext } from "../../../../context/globalContext";

const HomeOwnersTable: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Real Data Hook
  const { HomeownerList, isLoadingHomeownerList, HomeonwerListError, homeOwnerChangeStatus, isHomeOwnerChangingStatus, deleteHomeowner, RefetchHomeownerList } = useHomeowner();
  const HomeonwerData = Array.isArray(HomeownerList?.data?.items) ? HomeownerList?.data?.items : [];
  const totalHomeonwers = HomeownerList?.data?.total || 0;

  // const [activeModal, setActiveModal] = useState<boolean>(false);
  // const [inactiveModal, setInactiveModal] = useState<boolean>(false);
  // const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  // const [itemToDelete, setItemToDelete] = useState<HomerOwnerTypes | null>(
  //   null,
  // );

  const [selectedCity, setselectedCity] = useState<
    number | string | undefined
  >();
  const [selectedQboxstatus, setselectedQboxstatus] = useState<
    number | string | undefined
  >();
  const [selecteAccountstatus, setselecteAccountstatus] = useState<
    number | string | undefined
  >();

  const navigate = useNavigate();


  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const cityItems = [
    { id: 1, name: t("Qatif") },
    { id: 2, name: t("Qaseem") },
  ];

  const QboxStatus = [
    { id: 1, name: t("Online") },
    { id: 2, name: t("Offline") },
    { id: 3, name: t("Error") },
  ];

  const AccountStatus = [
    { id: 1, name: t("Active") },
    { id: 2, name: t("Inactive") },
  ];
  const { modals, setModals, tableSelectedIds, setTableSelectedIds, selectedRowStatus, setSelectedRowStatus } = useGlobalContext();

  const handleCityChange = (value: any) => {
    setselectedCity(value);
  };

  const handleQboxstatusChange = (value: any) => {
    setselectedQboxstatus(value);
  };

  const handleAccountstatusChange = (value: any) => {
    setselecteAccountstatus(value);
  };
  const changeStatus = (currentStatus: boolean | null) => {
    if (!tableSelectedIds.homeOwnerSelectedId) {
      message.error("homwOwner is not selected");
      return;
    }
    homeOwnerChangeStatus(
      { id: tableSelectedIds.homeOwnerSelectedId, payload: { is_active: !currentStatus } },
      {
        onSuccess: () => {
          message.success("Home owner status changed"),
          RefetchHomeownerList(),
          setModals((prev: any) => ({ ...prev, homeOwnerStatus: false })),
          setTableSelectedIds((perv: any) => ({ ...perv, homeOwnerSelectedId: null }))
        }
      }
    );
  };

  const handleOwnerDelete = () => {
    if (!tableSelectedIds?.homeOwnerSelectedId) return;
    deleteHomeowner(tableSelectedIds.homeOwnerSelectedId, {
      onSuccess: () => {
        setModals((prev) => ({ ...prev, homeownerDelete: false }));
        setTableSelectedIds((prev) => ({
          ...prev,
          homeOwnerSelectedId: null
        }))
      },
      onError: () => {
        setModals((prev) => ({ ...prev, homeownerDelete: false }));
        setTableSelectedIds((prev) => ({
          ...prev,
          homeOwnerSelectedId: null
        }))
      }
    })
  }

  const filters = (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 16]} align="middle">
        <Col span={24} md={12} lg={8}>
          <SearchInput
            placeholder={t("Search by Home Owner Name / QBox ID")}
            prefix={
              <img
                src="/assets/icons/search.png"
                width={16}
                alt="search icon"
              />
            }
          />
        </Col>
        <Col span={24} md={12} lg={16}>
          <Flex gap={5} wrap="wrap">
            <MySelect
              withoutForm
              className="filter-bg fs-13 text-black"
              options={cityItems}
              placeholder={t("City")}
              value={selectedCity}
              onChange={handleCityChange}
              allowClear
              maxWidth={150}
            />
            <MySelect
              withoutForm
              className="filter-bg fs-13 text-black"
              options={QboxStatus}
              placeholder={t("QBox Status")}
              value={selectedQboxstatus}
              onChange={handleQboxstatusChange}
              allowClear
              maxWidth={150}
            />
            <MySelect
              withoutForm
              className="filter-bg fs-13 text-black"
              options={AccountStatus}
              placeholder={t("Account Status")}
              value={selecteAccountstatus}
              onChange={handleAccountstatusChange}
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
      <GlobalTable
        title={t("Home Owners")}
        description={t("Manage all the home owners in your system")}
        filters={filters}
        loading={isLoadingHomeownerList}
        columns={homeownersColumn({
          navigate,
          setModals,
          setTableSelectedIds,
          setSelectedRowStatus,
          t,
        })}
        dataSource={HomeonwerData as any}
        rowKey="key"
        paginationProps={{
          total: totalHomeonwers,
          current: current,
          pageSize: pageSize,
          onPageChange: handlePageChange,
        }}
      />
      <ConfirmModal
        visible={modals.homeOwnerStatus}
        img={selectedRowStatus?.homeownerCurrentStatus ? "inactive.png" : "active.png"}
        title={selectedRowStatus?.homeownerCurrentStatus ? t("Inactivate Account") : t("Activate Account")}
        desc={selectedRowStatus?.homeownerCurrentStatus ? t("Are you sure you want to inactive this account?") : t("Are you sure you want to active this account?")}
        onClose={() => {
          setModals((prev) => ({ ...prev, homeOwnerStatus: false }));
          setTableSelectedIds((prev) => ({ ...prev, homeOwnerSelectedId: null }));
        }}
        onConfirm={() => changeStatus(selectedRowStatus?.homeownerCurrentStatus)}
      />
      {/* <ActiveModal
        visible={modals.homeOwnerStatus}
        title={t("Activate Account")}
        desc={t("Are you sure you want to active this account?")}
        onClose={() => {
          setModals((prev) => ({ ...prev, homeOwnerStatus: false }));
          setTableSelectedIds((prev) => ({ ...prev, homeOwnerSelectedId: null }));
        }}
        onConfirm={() => changeStatus(true)}
      /> */}
      <DeleteModal
        title={t("Delete Account")}
        subtitle={t("Are you sure you want to delete")}
        visible={modals.homeownerDelete}
        // item={itemToDelete}
        onConfirm={handleOwnerDelete}
        onClose={() =>
          setModals((prev) =>({...prev, homeownerDelete:false}))
        }
      />
    </>
  );
};

export { HomeOwnersTable };
