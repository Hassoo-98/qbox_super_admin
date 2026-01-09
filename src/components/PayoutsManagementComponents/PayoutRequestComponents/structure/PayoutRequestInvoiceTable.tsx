import { useState } from "react";
import { Flex, Table } from "antd";
import { type PayoutRequestInvoiceTypes } from "../../../../Type";
import {
  payoutrequestinvoiceColumn,
  payoutrequestinvoiceData,
} from "../../../../data";
import { useTranslation } from "react-i18next";
import { MarkPaidModal } from "../modal";
import i18n from "../../../../sources/i18n";
const PayoutRequestInvoiceTable = () => {
  const [paidMOdal, setPaidModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <>
      <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Table<PayoutRequestInvoiceTypes>
          size="large"
          columns={payoutrequestinvoiceColumn({ setPaidModal }, t)}
          dataSource={payoutrequestinvoiceData}
          className="pagination table-cs table"
          showSorterTooltip={false}
          scroll={{ x: 1200 }}
          rowHoverable={false}
          pagination={false}
        />
      </Flex>
      <MarkPaidModal visible={paidMOdal} onClose={() => setPaidModal(false)} />
    </>
  );
};

export { PayoutRequestInvoiceTable };
