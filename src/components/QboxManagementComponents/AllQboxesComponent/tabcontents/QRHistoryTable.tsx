import { useState } from "react";
import {
  Flex,
  Table,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  type MenuProps,
} from "antd";
import { CustomPagination } from "../../../PageComponents";
import { qrhistoryColumn, qrhistoryData } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { QRHistoryTypes } from "../../../../Type";
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
  const Status: { key: number; label: string }[] = [
    { key: 1, label: t("Active") },
    { key: 2, label: t("Inactive") },
  ];

  const handleStatusClick: MenuProps["onClick"] = ({ key }) => {
    setSelectedstatus(Number(key));
  };

  const selectedStatuslabel =
    Status.find((item) => item.key === seletedstatus)?.label || t("Status");

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
                    <Dropdown
                      menu={{
                        items: Status,
                        onClick: handleStatusClick,
                      }}
                      trigger={["click"]}
                    >
                      <Button className="btncancel filter-bg fs-13 text-black">
                        <Flex justify="space-between" align="center" gap={30}>
                          {selectedStatuslabel}
                          <DownOutlined />
                        </Flex>
                      </Button>
                    </Dropdown>
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
