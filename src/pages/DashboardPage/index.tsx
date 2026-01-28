import { Flex } from "antd";
import { RececentQboxRequestTable, TotalReportCards } from "../../components";
import i18n from "../../sources/i18n";
const DashboardPage = () => {
  const isRTL = i18n.language === "ar";

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <TotalReportCards />
        <RececentQboxRequestTable />
      </Flex>
    </div>
  );
};

export { DashboardPage };
