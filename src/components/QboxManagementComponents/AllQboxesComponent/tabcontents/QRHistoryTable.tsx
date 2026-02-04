import { useState } from "react";
import { Flex, Table, Form, Row, Col } from "antd";
import { CustomPagination } from "../../../PageComponents";
import { qrhistoryColumn, qrhistoryData } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { useNavigate } from "react-router-dom";
import type { QRHistoryTypes } from "../../../../types";
import i18n from "../../../../sources/i18n";
import { useTranslation } from "react-i18next";
const QRHistoryTable: React.FC = () => {
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [seletedstatus, setSelectedstatus] = useState<number | null>(null);
  const navigate = useNavigate();
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };
  const statusItem = [
    { id: 1, name: t("Active") },
    { id: 2, name: t("Inactive") },
  ];

  const handleStatusChange = (value: any) => {
    setSelectedstatus(value);
  };

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
                    placeholder={t("Search by QR Code")}
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
                      options={statusItem}
                      placeholder={t("Status")}
                      value={seletedstatus}
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
        <Table<QRHistoryTypes>
          size="large"
          columns={qrhistoryColumn({ navigate }, t)}
          dataSource={qrhistoryData}
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

export { QRHistoryTable };
