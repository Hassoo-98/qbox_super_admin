import { useState } from "react";
import { Flex, Table, Form, Row, Col } from "antd";
import { CustomPagination } from "../../../PageComponents";
import { allpackagesColumn, allpackagesData } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { useNavigate } from "react-router-dom";
import type { AllPackagesTypes } from "../../../../types";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { useGlobalContext } from "../../../../context/globalContext";
const AllPackagesTable: React.FC = ({packagesData}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [seletedpackage, setSelectedpackage] = useState<number | null>(null);
  const navigate = useNavigate();
  const {setTableSelectedIds} = useGlobalContext();
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };
  const PackagesOptions = [
    { id: 1, name: t("In Comming") },
    { id: 2, name: t("Send") },
    { id: 3, name: t("Return") },
  ];

  const handlePackageChange = (value: any) => {
    setSelectedpackage(value);
  };
  const isRTL = i18n.language === "ar";

  return (
    <>
      <Flex
        vertical
        gap={10}
        className="mb-2"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col xl={16} md={24} span={24}>
              <Row gutter={[16, 16]}>
                <Col span={24} md={24} lg={12}>
                  <SearchInput
                    placeholder={t("Search by Tracking ID")}
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
                  <Flex gap={5}>
                    <MySelect
                      withoutForm
                      className="filter-bg fs-13 text-black"
                      options={PackagesOptions}
                      placeholder={t("Package Type")}
                      value={seletedpackage}
                      onChange={handlePackageChange}
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
        <Table<AllPackagesTypes>
          size="large"
          columns={allpackagesColumn({ navigate, setTableSelectedIds }, t)}
          dataSource={packagesData as any}
          className="pagination table-cs table"
          showSorterTooltip={false}
          scroll={{ x: 1300 }}
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
    </>
  );
};

export { AllPackagesTable };
