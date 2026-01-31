import {
  Typography,
  Card,
  Flex,
  Table,
  Form,
  Row,
  Col,
  Button,
  Image,
} from "antd";

import { useState } from "react";
import {
  CustomPagination,
  ModuleTopHeading,
  SubscriptionExportModal,
} from "../../PageComponents";
import { MyDatepicker, SearchInput, MySelect } from "../../Forms";
import { type DownloadType, type SubscriptionType } from "../../../types";
import { subscriptionColumn, subscriptionDate } from "../../../data";
import { statusItemnew } from "../../../shared";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import i18n from "../../../sources/i18n";

const { Text } = Typography;
const SubscriptionTable = () => {
  const [form] = Form.useForm();
  const [selectedStatus, setselectedStatus] = useState<string>("");
  const [selectedPayment, setselectedPayment] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [_downloaditem, setDownloadItem] = useState<DownloadType | null>();
  const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
    undefined,
  );
  const [exportmodal, setExportModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const paymentOptions = [
    { id: "applepay", name: t("Apple Pay") },
    { id: "stcpay", name: t("STC Pay") },
  ];

  const statusOptions = statusItemnew(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handlePaymentChange = (value: any) => {
    setselectedPayment(value);
  };
  const handleStatusChange = (value: any) => {
    setselectedStatus(value);
  };

  const isRTL = i18n.language === "ar";
  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  return (
    <Flex
      vertical
      gap={10}
      className="mb-2"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
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
                      <MySelect
                        withoutForm
                        className="px-3 filter-bg fs-13 text-black"
                        options={paymentOptions}
                        placeholder={t("Payment Method")}
                        value={selectedPayment}
                        onChange={handlePaymentChange}
                        allowClear
                        maxWidth={150}
                      />
                      <MySelect
                        withoutForm
                        className="px-3 filter-bg fs-13 text-black"
                        options={statusOptions}
                        placeholder={t("Status")}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        allowClear
                        maxWidth={150}
                      />
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
    </Flex>
  );
};

export { SubscriptionTable };
