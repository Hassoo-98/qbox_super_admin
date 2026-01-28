import { Flex } from "antd";
import {
  RececentQboxRequestTable,
  TotalReportCards,
  RevenueChart,
  SubscriptionRateBarChart,
} from "../../components";
import i18n from "../../sources/i18n";
const DashboardPage = () => {
  const isRTL = i18n.language === "ar";

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <TotalReportCards />
        <RevenueChart />
        <SubscriptionRateBarChart/>
        <RececentQboxRequestTable />
      </Flex>
    </div>
  );
};

export { DashboardPage };
