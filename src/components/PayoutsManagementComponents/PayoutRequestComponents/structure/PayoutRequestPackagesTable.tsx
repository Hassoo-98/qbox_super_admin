import { Flex, Table, } from "antd"
import { useState } from "react";
import { CustomPagination } from "../../../PageComponents";
import { type PayoutHistorPackagesTypes } from "../../../../types";
import { payouthistorypackagesColumn, payouthistorypackagesData } from "../../../../data";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
const PayoutRequestPackagesTable = () => {
    const [pageSize, setPageSize] = useState<number>(10);
    const [current, setCurrent] = useState<number>(1);
    const {t}=useTranslation();

    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };
   const isRTL = i18n.language === "ar";
          
    return (
        <>
        <Flex vertical gap={20}    
           style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    <Table<PayoutHistorPackagesTypes>
                        size='large'
                        columns={payouthistorypackagesColumn(t)}
                        dataSource={payouthistorypackagesData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1200 }}
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
        </>
    )
}

export { PayoutRequestPackagesTable } 
