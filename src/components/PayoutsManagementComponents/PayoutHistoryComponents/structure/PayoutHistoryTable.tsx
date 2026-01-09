import {
  Typography,
  Card,
  Flex,
  Table,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  type MenuProps,
  Image,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import i18n from "../../../../sources/i18n";
import { useState } from "react";
import {
  CustomPagination,
  ModuleTopHeading,
  SubscriptionExportModal,
} from "../../../PageComponents";
import { type DownloadType, type PayoutHistoryTypes } from "../../../../Type";
import { payouthistoryColumn, payouthistoryData } from "../../../../data";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const PayoutHistoryTable = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedProvider, setselectedProvider] = useState<number | string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [downloaditem, setDownloadItem] = useState<DownloadType | null>();
  const [exportmodal, setExportModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const providerItem: { key: number; label: string }[] = [
    { key: 1, label: t("Azeem Khan") },
    { key: 2, label: t("Shujat Khan") },
  ];

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const handlePaymentClick: MenuProps["onClick"] = ({ key }) => {
    setselectedProvider(Number(key));
  };
  const selectedProviderLabel =
    providerItem.find((item) => item.key === selectedProvider)?.label ||
    t("Service Provider/Merchant Name");
    const isRTL = i18n.language === "ar";
         
  return (
    <>
      <Card className="radius-12 border-gray card-cs h-100"   
           style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Flex vertical gap={10} className="mb-2">
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("Payout History")} />
            <Text className="text-gray fs-13">
              {t("Manage all payout history in your system")}
            </Text>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={14} md={24} span={24}>
                <Dropdown
                  menu={{
                    items: providerItem,
                    onClick: handlePaymentClick,
                  }}
                  trigger={["click"]}
                >
                  <Button className="btncancel px-3 filter-bg fs-13 text-black">
                    <Flex justify="space-between" align="center" gap={30}>
                      {selectedProviderLabel}
                      <DownOutlined />
                    </Flex>
                  </Button>
                </Dropdown>
              </Col>
              <Col span={24} md={24} xl={7}>
                <Flex justify="end" gap={10}>
                  <Button
                    className="btncancel text-black"
                    onClick={() => setExportModal(true)}
                  >
                    <Flex align="center" gap={10}>
                      <Image
                        src="/assets/icons/export.webp"
                        width={20}
                        preview={false}
                        alt="export icons"
                        fetchPriority="high"
                      />{" "}
                      {t("Export")}
                    </Flex>
                  </Button>
                </Flex>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<PayoutHistoryTypes>
            size="large"
            columns={payouthistoryColumn({ navigate }, t)}
            dataSource={payouthistoryData}
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
      <SubscriptionExportModal
        visible={exportmodal}
        onClose={() => setExportModal(false)}
      />
    </>
  );
};

export { PayoutHistoryTable };
