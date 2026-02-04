import { Button } from "antd";
import { GlobalTable } from "../../PageComponents";
import { dashboardInstallmentColumn } from "../../../data/tableColumn";
import { useTranslation } from "react-i18next";
import { useDashboardInstallments } from "../../../api/hooks/useDashboardInstallments";
const RececentQboxRequestTable = () => {
  const { t } = useTranslation();
  const { data: installments, isLoading } = useDashboardInstallments();

  return (
    <GlobalTable
      title="Recent QBox Installment Requests"
      extra={<Button className="btncancel text-black">{t("View All")}</Button>}
      loading={isLoading}
      columns={dashboardInstallmentColumn(t)}
      dataSource={installments || []}
      rowKey="id"
    />
  );
};

export { RececentQboxRequestTable };
