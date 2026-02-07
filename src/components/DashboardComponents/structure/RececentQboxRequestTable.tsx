import { Button } from "antd";
import { GlobalTable } from "../../PageComponents";
import { dashboardInstallmentColumn } from "../../../data/tableColumn";
import { useTranslation } from "react-i18next";
const RececentQboxRequestTable = () => {
  const { t } = useTranslation();

  return (
    <GlobalTable
      title="Recent QBox Installment Requests"
      extra={<Button className="btncancel text-black">{t("View All")}</Button>}
      // loading={isLoading}
      columns={dashboardInstallmentColumn(t)}
      dataSource={[]}
      rowKey="id"
    />
  );
};

export { RececentQboxRequestTable };
