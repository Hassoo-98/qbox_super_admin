import { Table } from "antd";
import type { ProviderActiviteType } from "../../../../Type";
import {
  provideractivitiesData,
  provideractivityColumn,
} from "../../../../data";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";

const ProviderActivityTable = () => {
  const { t } = useTranslation();

  const isRTL = i18n.language === "ar";

  return (
    <Table<ProviderActiviteType>
      size="large"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      columns={provideractivityColumn(t)}
      dataSource={provideractivitiesData}
      className="pagination table-cs table"
      showSorterTooltip={false}
      scroll={{ x: 800 }}
      rowHoverable={false}
      pagination={false}
    />
  );
};

export { ProviderActivityTable };
