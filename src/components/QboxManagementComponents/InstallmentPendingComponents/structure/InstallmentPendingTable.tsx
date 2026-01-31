import { Typography, Card, Flex, Table, Form, Row, Col } from "antd";

import { CustomPagination, ModuleTopHeading } from "../../../PageComponents";
import { SearchInput, MySelect } from "../../../Forms";
import type { InstallmentType } from "../../../../types";
import { installmentColumn, installmentpendingData } from "../../../../data";
import { useState } from "react";
import i18n from "../../../../sources/i18n";
import { InstallmentCompletedModal } from "../modal";
import { useTranslation } from "react-i18next";

const { Text } = Typography;
const InstallmentPendingTable = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [selectedCity, setselectedCity] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const cityOptions = [
    { id: "qatif", name: t("Qatif") },
    { id: "qaseem", name: t("Qaseem") },
  ];

  const handleCityChange = (value: any) => {
    setselectedCity(value);
  };
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
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
            <ModuleTopHeading level={5} name={t("Installment Pending")} />
            <Text className="text-gray fs-13">
              {t("Manage all pending installments in your system")}
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
                    <MySelect
                      withoutForm
                      className="px-3 filter-bg fs-13 text-black"
                      options={cityOptions}
                      placeholder={t("City")}
                      value={selectedCity}
                      onChange={handleCityChange}
                      allowClear
                      maxWidth={150}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<InstallmentType>
            size="large"
            columns={installmentColumn({ setVisible, t })}
            dataSource={installmentpendingData}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
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
      </Card>

      <InstallmentCompletedModal
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export { InstallmentPendingTable };
