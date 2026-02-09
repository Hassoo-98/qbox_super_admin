import { useState } from "react";
import { Typography, Card, Flex, Table, Form, Row, Col } from "antd";
import { CustomPagination, ModuleTopHeading } from "../../../PageComponents";
import { allqboxesColumn } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { useNavigate } from "react-router-dom";
import type { AllBoxesTypes } from "../../../../types";
import i18n from "../../../../sources/i18n";
import { useTranslation } from "react-i18next";
import { useQbox } from "../../../../hooks/useQbox";
const { Text } = Typography;
const AllQboxesTable: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [seletedcity, setCity] = useState<number | null>(null);
  const [selectedqboxstatus, setQboxstatus] = useState<number | null>(null);
  const navigate = useNavigate();
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };
  const {QboxList, isLoadingQboxList, QboxError} = useQbox();
  const QboxData = Array.isArray(QboxList?.data?.items) ? QboxList?.data?.items : [];
  const TotalQboxes = QboxList?.data?.total || 0;
  const Cities = [
    { id: 1, name: t("Qatif") },
    { id: 2, name: t("Qaseem") },
  ];

  const QboxStatus = [
    { id: 1, name: t("Online") },
    { id: 2, name: t("Offline") },
    { id: 3, name: t("Error") },
  ];

  const handleCityChange = (value: any) => {
    setCity(value);
  };

  const handleQboxStatusChange = (value: any) => {
    setQboxstatus(value);
  };
  const isRTL = i18n.language === "ar";

  return (
    <>
      <Card
        className="radius-12 border-gray card-cs h-100"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <Flex vertical gap={10} className="mb-2">
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("All QBoxes")} />
            <Text className="text-gray fs-13">
              {t("Manage all the QBoxes in your system")}
            </Text>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={16} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by QBox ID")}
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
                        options={Cities}
                        placeholder={t("City")}
                        value={seletedcity}
                        onChange={handleCityChange}
                        allowClear
                        maxWidth={150}
                      />
                      <MySelect
                        withoutForm
                        className="filter-bg fs-13 text-black"
                        options={QboxStatus}
                        placeholder={t("Status")}
                        value={selectedqboxstatus}
                        onChange={handleQboxStatusChange}
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
          <Table<AllBoxesTypes>
            size="large"
            loading={isLoadingQboxList}
            columns={allqboxesColumn({ navigate })}
            dataSource={QboxData as any}
            rowKey="id"
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 1300 }}
            rowHoverable={false}
            pagination={false}
          />
          <CustomPagination
            total={TotalQboxes}
            current={current}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Card>
    </>
  );
};

export { AllQboxesTable };
