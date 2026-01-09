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
import { useState } from "react";
import {
  CustomPagination,
  ModuleTopHeading,
  SubscriptionExportModal,
} from "../../PageComponents";
import { MyDatepicker, SearchInput } from "../../Forms";
import { type DownloadType, type SubscriptionType } from "../../../Type";
import { subscriptionColumn, subscriptionDate } from "../../../data";
import { statusItemnew } from "../../../shared";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";

const { Text } = Typography;
const SubscriptionTable = () => {
  const [form] = Form.useForm();
  const [selectedStatus, setselectedStatus] = useState<string>("");
  const [selectedPayment, setselectedPayment] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [downloaditem, setDownloadItem] = useState<DownloadType | null>();
  const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
    undefined
  );
  const [exportmodal, setExportModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const paymentItem: { key: string; label: string }[] = [
    { key: "applepay", label: t("Apple Pay") },
    { key: "stcpay", label: t("STC Pay") },
  ];

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };
  const handleStatusClick: MenuProps["onClick"] = ({ key }) => {
    setselectedStatus(key);
  };
  const handlePaymentClick: MenuProps["onClick"] = ({ key }) => {
    setselectedPayment(key);
  };
  const getStatusItemNew = statusItemnew(t);
  const selectedStatusLabel =
    getStatusItemNew.find((item) => item.key === selectedStatus)?.label ||
    t("Status");
  const selectedPaymentLabel =
    paymentItem.find((item) => item.key === selectedPayment)?.label ||
    t("Payment Method");

  return (
    <>
      <Card className="radius-12 border-gray card-cs h-100">
        <Flex vertical gap={10} className="mb-2">
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("Subscription Management")} />
            <Text className="text-gray fs-13">
              {t("Manage all the subscription in your system")}
            </Text>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={14} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by Homeowner Name")}
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
                  <Col span={24} lg={12}>
                    <Flex gap={5}>
                      <Dropdown
                        menu={{
                          items: paymentItem,
                          onClick: handlePaymentClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedPaymentLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                      <Dropdown
                        menu={{
                          items: statusItemnew(t),
                          onClick: handleStatusClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedStatusLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                    </Flex>
                  </Col>
                </Row>
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
                  <MyDatepicker
                    withoutForm
                    rangePicker
                    className="datepicker-cs"
                    placeholder={[t("Start Year"), t("End Year")]}
                    value={selectedYear}
                    onChange={(dates: [Dayjs, Dayjs] | null) =>
                      setSelectedYear(dates ?? undefined)
                    }
                  />
                </Flex>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<SubscriptionType>
            size="large"
            columns={subscriptionColumn({ setDownloadItem }, t)}
            dataSource={subscriptionDate}
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

export { SubscriptionTable };
