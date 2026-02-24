import { Typography, Card, Flex, Table, Form, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ServiceProviderService } from "../../../../services/serviceProvider.service";
import type { ServiceProviderType } from "../../../../types";
import { statusItems } from "../../../../shared";
import { ConfirmModal, DeleteModal, ModuleTopHeading } from "../../../PageComponents";
import { serviceproviderColumn } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { AddEditServiceProviderDrawer } from "../modal";
import { useServiceProvider } from "../../../../hooks/useServiceProvider";
import { LocationService } from "../../../../services/location.service";
// i18n not required here; dropdown always shows English names

const { Text } = Typography;

const ServiceProviderTable = () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [visible, setVisible] = useState<boolean>(false);
  const [edititem, setEditItem] = useState<ServiceProviderType | null>(null);
  const [statuschanged, setStatusChanged] = useState<boolean>(false);
  const [deleteitem, setDeleteItem] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const navigate = useNavigate();
  // const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(undefined);

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 400);
  }, []);

  const viewHandler = async (id: number) => {
    if (!id) return;
    try {
      await queryClient.prefetchQuery({
        queryKey: ["service-provider", id],
        queryFn: () => ServiceProviderService.getSingleServiceProvider(id as number),
      });
    } catch {
      // ignore prefetch errors
    }
  };

  // Fetch cities
  const { data: cityResponse, isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: () => LocationService.getAllCities(),
  });

  // Map cityResponse to options for the dropdown
  const cityOptions = useMemo(() => {
    const raw = cityResponse?.data?.items ?? [];
    const seenNames = new Set<string>();
    const opts: { id: string; name: string }[] = [];
    raw.forEach((cityRaw: unknown) => {
      const city = cityRaw as Record<string, unknown>;
      const id = (city['id'] as unknown)?.toString?.() ?? String(city['id'] ?? "");
      const name = ((city['name'] as string) ?? "").trim();
      const keyName = name.toLowerCase();
      if (!id || !name) return;
      if (seenNames.has(keyName)) return;
      seenNames.add(keyName);
      opts.push({ id, name });
    });
    return opts;
  }, [cityResponse]);

  // map of city id -> english name for display in table
  const cityMap = useMemo(() => {
    const map: Record<string, string> = {};
    (cityResponse?.data?.items ?? []).forEach((cRaw: unknown) => {
      const c = cRaw as Record<string, unknown>;
      const id = (c['id'] as unknown)?.toString?.() ?? String(c['id'] ?? "");
      if (id) map[id] = (c['name'] as string) ?? "";
    });
    return map;
  }, [cityResponse]);

  // Fetch service providers with filters
  const { serviceProviderList, isLoadingServiceProviderList, deleteServiceProvider, changeServiceProviderStatus } =
    useServiceProvider({
      search,
      ...(selectedCity && { city: selectedCity }),
      ...(selectedStatus && { is_approved: selectedStatus }),
      page: 1, 
      limit: 10,
    });

  const actionInFlight = useRef<Record<number, boolean>>({});

  // Format table data
  const rawItems = Array.isArray(serviceProviderList)
    ? serviceProviderList
    : serviceProviderList?.data?.items ?? [];

  const items = (rawItems || []).map((it: unknown) => {
    const obj = it as Record<string, unknown>;
    const resolvedIdRaw = obj['id'] ?? obj['pk'] ?? obj['key'];
    const resolvedId = resolvedIdRaw === undefined ? undefined : String(resolvedIdRaw);

    const rawCities = (obj['operating_cities'] ?? obj['cities']) as unknown;
    const normalizedCities = Array.isArray(rawCities)
      ? (rawCities as unknown[])
          .map((c: unknown) => {
            if (c && typeof c === 'object') {
              const o = c as Record<string, unknown>;
              const val = o['id'] ?? o['pk'] ?? o['value'] ?? undefined;
              return val === undefined ? '' : String(val);
            }
            return c === undefined ? '' : String(c);
          })
          .filter(Boolean)
      : [];

    // build operating_cities as objects with name so table renderer shows names
    const operatingCitiesObjects = normalizedCities.map((cid) => ({ id: cid, name: cityMap[cid] ?? cid }));

    const base = Object.assign({}, obj) as Record<string, unknown>;
    return { ...base, id: resolvedId, normalizedCities, operating_cities: operatingCitiesObjects };
  });

  const tableData = items.map((item) => ({ ...item, key: String((item as Record<string, unknown>)['id']) }));

  // Apply client-side filtering for city/status display
  const filteredTableData = tableData.filter((row) => {
    if (selectedCity) {
      const cities = ((row as Record<string, unknown>)['normalizedCities'] ?? []) as string[];
      const matched = Array.isArray(cities) && cities.some((c) => String(c) === String(selectedCity));
      if (!matched) return false;
    }

    if (selectedStatus) {
      const wantApproved = String(selectedStatus).toLowerCase() === "approved";
      const isApprovedVal = ((row as Record<string, unknown>)['is_approved']) as unknown;
      if (Boolean(isApprovedVal) !== wantApproved) return false;
    }

    return true;
  });

  const currentItemForModal = (rawItems || []).find((i: unknown) => String((i as Record<string, unknown>)['id']) === String(selectedId));

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
              <Text className="text-gray fs-13">{t("Manage all service providers in your system")}</Text>
            </Flex>
            <Button className="btncancel text-black" onClick={() => setVisible(true)}>
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
                      inputProps={{ onChange: handleSearchChange }}
                      prefix={<img src="/assets/icons/search.png" width={16} alt="search icon" />}
                    />
                  </Col>

                  <Col span={24} lg={12}>
                    <Flex gap={5}>
                      <MySelect
                        withoutForm
                        className="filter-dropdown px-3 filter-bg fs-13 text-black"
                        options={cityOptions}
                        placeholder={t("City")}
                        value={selectedCity}
                        onChange={(value: string | undefined) => setSelectedCity(value)}
                        allowClear
                        maxWidth={150}
                        loading={isLoadingCities}
                      />

                      <MySelect
                        withoutForm
                        className="filter-dropdown px-3 filter-bg fs-13 text-black"
                        options={statusOptions}
                        placeholder={t("Status")}
                        value={selectedStatus}
                        onChange={(value: string | undefined) => setSelectedStatus(value)}
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
                viewHandler,
              },
              t,
            )}
            dataSource={filteredTableData as unknown as ServiceProviderType[]}
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
        desc={t("Are you sure you want to status change of this service provider?")}
        img={currentItemForModal?.is_approved ? "inactive.png" : "active.png"}
        onClose={() => setStatusChanged(false)}
          onConfirm={async () => {
          if (actionInFlight.current[selectedId]) return;

          const currentItem = (rawItems || []).find((i: unknown) => String((i as Record<string, unknown>)['id']) === String(selectedId));
          if (!currentItem) {
            setStatusChanged(false);
            return;
          }

          const currentApproved = ((currentItem as Record<string, unknown>)['is_approved']) as unknown;
          const currentApprovedBool = !!currentApproved;

          actionInFlight.current[selectedId] = true;
          try {
            await changeServiceProviderStatus({
              id: selectedId,
              is_approved: !currentApprovedBool,
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
        subtitle={t("This action in undone. Are you sure you want to delete this service provider?")}
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