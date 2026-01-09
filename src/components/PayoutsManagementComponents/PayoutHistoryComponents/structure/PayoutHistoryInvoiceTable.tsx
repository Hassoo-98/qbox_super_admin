import { Flex, Table, } from "antd"
import { type PayoutHistoryInvoiceTypes } from "../../../../Type";
import { payouthistoryinvoiceColumn, payouthistoryinvoiceData } from "../../../../data";
import i18n from "../../../../sources/i18n";
import { useTranslation } from "react-i18next";
const PayoutHistoryInvoiceTable = () => {
    const {t}=useTranslation()
        const isRTL = i18n.language === "ar";
         
    

    return (
        <>
            <Flex vertical gap={20}    style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Table<PayoutHistoryInvoiceTypes>
                    size='large'
                    columns={payouthistoryinvoiceColumn(t)}
                    dataSource={payouthistoryinvoiceData}
                    className='pagination table-cs table'
                    showSorterTooltip={false}
                    scroll={{ x: 800 }}
                    rowHoverable={false}
                    pagination={false}
                />
            </Flex>
        </>
    )
}

export { PayoutHistoryInvoiceTable } 
