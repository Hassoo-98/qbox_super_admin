import { Button, Card, Flex, Table } from "antd";
import { ModuleTopHeading } from "../../PageComponents";
import { recentrequestData, recentColumn } from "../../../data";
import type { RecentRequestType } from "../../../Type";
import { useTranslation } from "react-i18next";
import i18n from "../../../sources/i18n";
const RececentQboxRequestTable = () => {
   const isRTL = i18n.language === "ar";
    
     
  const { t } = useTranslation();
  return (
    <Card className="radius-12 border-gray card-cs h-100"   style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex justify="space-between" align="center" className="mb-2">
        <ModuleTopHeading
          level={5}
          name={t("Recent QBox Installment Requests")}
        />
      <Button className="btncancel text-black">{t("View All")}</Button>
      </Flex>
      <Flex vertical gap={20}>
        <Table<RecentRequestType>
          size="large"
          columns={recentColumn(t)}
          dataSource={recentrequestData}
          className="pagination table-cs table"
          showSorterTooltip={false}
          scroll={{ x: 1300 }}
          rowHoverable={false}
          pagination={false}
        />
      </Flex>
    </Card>
  );
};

export { RececentQboxRequestTable };
