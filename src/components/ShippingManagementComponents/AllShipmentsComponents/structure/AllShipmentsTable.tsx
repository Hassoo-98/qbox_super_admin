import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../../../context/globalContext";
import { Flex, Table, Form, Row, Col, Card, Typography } from "antd";
import { ModuleTopHeading, CustomPagination } from "../../../PageComponents";
import { allpackagesColumn } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { useNavigate } from "react-router-dom";
import type { TableColumnsType } from "antd";
import type { AllPackagesTypes } from "../../../../types";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { useShipment } from "../../../../hooks/useAllShippment";
import { ShipmentService } from "../../../../services/allshippment.service";

const { Text } = Typography;

const AllShipmentsTable: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [search, setSearch] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [debouncedPackage, setDebouncedPackage] = useState<number | null>(selectedPackage);
  const debounceRef = useRef<number | null>(null);

  const navigate = useNavigate();
  const { setTableSelectedIds } = useGlobalContext();

  const isRTL = i18n.language === "ar";

  // debounce search and package filters before calling API
  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedPackage(selectedPackage);
    }, 400);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [search, selectedPackage]);

  // ✅ React Query Hook (use debounced values)
  const {
    shipmentList,
    isLoadingShipmentList,
  } = useShipment({
    search: debouncedSearch,
    package_type: debouncedPackage,
    page,
    limit,
  });

  // ✅ Format API Data
  const items = Array.isArray(shipmentList)
    ? shipmentList
    : shipmentList?.data?.items ?? [];

  const tableData = (items || []).map((item: any) => ({
    ...item,
    key: item.id,
  }));

  const PackagesType = [
    { id: 1, name: t("In Comming") },
    { id: 2, name: t("Send") },
    { id: 3, name: t("Return") },
  ];

  const handlePageChange = (newPage: number, newSize: number): void => {
    setPage(newPage);
    setLimit(newSize);
  };

  const viewShipment = async (id: number) => {
    try {
      const res = await ShipmentService.getShipmentDetails(id);
      setTableSelectedIds?.((prev: any) => ({
        ...prev,
        packageSelectedId: id,
        shipmentDetails: res?.data,
      }));
    } catch (err) {
      // fallback: still set id
      setTableSelectedIds?.((prev: any) => ({ ...prev, packageSelectedId: id }));
    } finally {
      navigate("/allqboxes/view/qboxallpackages/detailview/" + id);
    }
  };

  return (
    <Card
      className="radius-12 border-gray card-cs h-100"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <Flex vertical gap={10} className="mb-2">
        <Flex align="center" justify="space-between" gap={10}>
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("All Shipments")} />
            <Text className="text-gray fs-13">
              {t("Manage all shipments in your system")}
            </Text>
          </Flex>
        </Flex>

        {/* Filters */}
        <Form layout="vertical" form={form}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col xl={16} md={24} span={24}>
              <Row gutter={[16, 16]}>
                <Col span={24} md={24} lg={12}>
                  <SearchInput
                    placeholder={t("Search by Tracking ID")}
                    inputProps={{
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value);
                        setPage(1);
                      },
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

                <Col span={24} md={24} lg={12}>
                  <Flex gap={5}>
                    <MySelect
                      withoutForm
                      className="filter-bg fs-13 text-black"
                      options={PackagesType}
                      placeholder={t("Package Type")}
                      value={selectedPackage}
                      onChange={(value: number | null) => {
                        setSelectedPackage(value);
                        setPage(1);
                      }}
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
        <Table<AllPackagesTypes>
          size="large"
          loading={isLoadingShipmentList}
          columns={
            allpackagesColumn(
              { navigate, setTableSelectedIds, viewHandler: viewShipment },
              t,
            ) as unknown as TableColumnsType<AllPackagesTypes>
          }
          dataSource={tableData}
          className="pagination table-cs table"
          showSorterTooltip={false}
          scroll={{ x: 1300 }}
          rowHoverable={false}
          pagination={false}
        />

        {/* Pagination */}
        <CustomPagination
          total={shipmentList?.total || 0}
          current={page}
          pageSize={limit}
          onPageChange={handlePageChange}
        />
      </Flex>
    </Card>
  );
};

export { AllShipmentsTable };
