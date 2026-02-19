import { Typography, Card, Flex, Table, Form, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import type { ServiceProviderType } from "../../../../types";
// import type { ServiceProvider } from "../../../../services/serviceProvider.service";
import { statusItems } from "../../../../shared";
import {
  ConfirmModal,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { serviceproviderColumn } from "../../../../data";
import {  SearchInput, MySelect } from "../../../Forms";
import { AddEditServiceProviderDrawer } from "../modal";
import { useServiceProvider } from "../../../../hooks/useServiceProvider";

const { Text } = Typography;

const ServiceProviderTable = () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 400);
  }, []);
  const [selectedCity, setselectedCity] = useState<string>("");
  const [selectedStatus, setselectedStatus] = useState<string>("approved");
  const [visible, setVisible] = useState<boolean>(false);
  const [edititem, setEditItem] = useState<ServiceProviderType | null>(null);
  const [statuschanged, setStatusChanged] = useState<boolean>(false);
  const [deleteitem, setDeleteItem] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
    undefined,
  );

  const { t } = useTranslation();

  // ✅ TanStack Query Hook
  const {
    serviceProviderList,
    isLoadingServiceProviderList,
    deleteServiceProvider,
    changeServiceProviderStatus,
  } = useServiceProvider({
    search,
    city: selectedCity,
    is_approved: selectedStatus,
    page: 1,
    limit: 10,
  });
  // prevent duplicate in-flight actions (status change / delete)
  const actionInFlight = useRef<Record<number, boolean>>({});

  // ✅ Format API data for table
  const rawItems = Array.isArray(serviceProviderList)
    ? serviceProviderList
    : serviceProviderList?.data?.items ?? [];

  // Normalize each item so `id` and `key` are always present (fallbacks: pk, key)
  const items = (rawItems || []).map((it: any) => {
    const resolvedId = it?.id ?? it?.pk ?? it?.key ?? undefined;
    return { ...it, id: resolvedId };
  });

  const tableData = items.map((item: any) => ({
    ...item,
    key: item.id,
  }));

  const cityItem = [
    { id: "qatif", name: t("Qatif") },
    { id: "qaseem", name: t("Qaseem") },
  ];

  const statusOptions = statusItems(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  return (
    <>
      <Card className="radius-12 border-gray card-cs h-100">
        <Flex vertical gap={15} className="mb-3">
          <Flex justify="space-between" gap={10} align="flex-start">
            <Flex vertical>
              <ModuleTopHeading level={5} name={t("Service Providers")} />
              <Text className="text-gray fs-13">
                {t("Manage all service providers in your system")}
              </Text>
            </Flex>
            <Button
              className="btncancel text-black"
              onClick={() => setVisible(true)}
            >
              <PlusOutlined /> {t("Add Service Provider")}
            </Button>
          </Flex>

          {/* Filters */}
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={14} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by Service Provider Name")}
                      inputProps={{
                        onChange: handleSearchChange,
                      }}
                      prefix={
                        <img
                          src="/assets/icons/search.png"
                          width={16}
                          alt="search icon"
                        />
                      }
                    />
                  </Col>

                  <Col span={24} lg={12}>
                    <Flex gap={5}>
                      <MySelect
                        withoutForm
                        className="px-3 filter-bg fs-13 text-black"
                        options={cityItem}
                        placeholder={t("City")}
                        value={selectedCity}
                        onChange={(value: any) =>
                          setselectedCity(value)
                        }
                        allowClear
                        maxWidth={150}
                      />
                      <MySelect
                        withoutForm
                        className="px-3 filter-bg fs-13 text-black"
                        options={statusOptions}
                        placeholder={t("Status")}
                        value={selectedStatus}
                        onChange={(value: any) =>
                          setselectedStatus(value)
                        }
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

        {/* Table */}
        <Flex vertical gap={20}>
          <Table<ServiceProviderType>
            size="large"
            loading={isLoadingServiceProviderList}
            columns={serviceproviderColumn(
              {
                setVisible,
                setEditItem,
                navigate,
                setStatusChanged: (id: number) => {
                  setSelectedId(id);
                  setStatusChanged(true);
                },
                setDeleteItem: (id: number) => {
                  setSelectedId(id);
                  setDeleteItem(true);
                },
              },
              t,
            )}
            dataSource={tableData}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
            rowHoverable={false}
            pagination={false}
          />
        </Flex>
      </Card>

      {/* Drawer */}
      <AddEditServiceProviderDrawer
        visible={visible}
        edititem={edititem}
        onClose={() => {
          setVisible(false);
          setEditItem(null);
        }}
      />

      {/* Status Change Modal */}
      <ConfirmModal
        visible={statuschanged}
        title={t("Are you sure?")}
        desc={t(
          "Are you sure you want to status change of this service provider?",
        )}
        img={"inactive.png"}
        onClose={() => setStatusChanged(false)}
        onConfirm={async () => {
          // guard against double clicks/parallel requests
          if (actionInFlight.current[selectedId]) return;

          const currentItem = tableData.find((i) => i.id === selectedId);
          if (!currentItem) {
            setStatusChanged(false);
            return;
          }

          actionInFlight.current[selectedId] = true;
          try {
            await changeServiceProviderStatus({
              id: selectedId,
              is_approved: !currentItem.is_approved,
            });
          } finally {
            actionInFlight.current[selectedId] = false;
          }

          setStatusChanged(false);
        }}
      />

      {/* Delete Modal */}
      <DeleteModal
        title={t("Delete Provider")}
        subtitle={t(
          "This action in undone. Are you sure you want to delete this service provider?",
        )}
        visible={deleteitem}
        onClose={() => setDeleteItem(false)}
        onConfirm={async () => {
          if (actionInFlight.current[selectedId]) return;
          actionInFlight.current[selectedId] = true;
          try {
            await deleteServiceProvider(selectedId);
          } finally {
            actionInFlight.current[selectedId] = false;
          }
          setDeleteItem(false);
        }}
      />
    </>
  );
};

export { ServiceProviderTable };
