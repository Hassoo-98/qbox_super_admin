import { Flex, Table, Form, Row, Col, Button, Image } from "antd"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from 'dayjs';
import type { RevenueType } from "../../../../types";
import { MyDatepicker, SearchInput } from "../../../Forms";
import { revenuecomColumn, revenuecomData } from "../../../../data";
import { CustomPagination, SubscriptionExportModal } from "../../../PageComponents";


const CommissionBaseRevenueTable = () => {
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState<number>(10);
    const [current, setCurrent] = useState<number>(1);
    const [exportmodal, setExportModal] = useState<boolean>(false)
    const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(undefined);
    const { t } = useTranslation()
    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };

    return (
        <>
            <Flex vertical gap={15}>
                <Form layout="vertical" form={form}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={8} md={24} span={24}>
                            <SearchInput
                                placeholder={t('Search by Transaction ID')}
                                prefix={<img src='/assets/icons/search.png' width={16} alt='search icon' fetchPriority="high" />}
                            />
                        </Col>
                        <Col span={24} md={24} xl={10}>
                            <Flex justify='end' gap={10}>
                                <Button className='btncancel text-black' onClick={() => setExportModal(true)}>
                                    <Flex align='center' gap={10}>
                                        <Image src='/assets/icons/export.webp' width={20} preview={false} alt='export icons' fetchPriority="high" /> {t("Export")}
                                    </Flex>
                                </Button>
                                <MyDatepicker
                                    withoutForm
                                    rangePicker
                                    className="datepicker-cs"
                                    placeholder={[t('Start Year'), t('End Year')]}
                                    value={selectedYear}
                                    onChange={(dates: [Dayjs, Dayjs] | null) => setSelectedYear(dates ?? undefined)}
                                />
                            </Flex>
                        </Col>
                    </Row>
                </Form>
                <Flex vertical gap={20}>
                    <Table<RevenueType>
                        size='large'
                        columns={revenuecomColumn(t)}
                        dataSource={revenuecomData}
                        className='pagination table-cs table'
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
            </Flex>
              <SubscriptionExportModal visible={exportmodal} onClose={()=>setExportModal(false)}/>
        </>
    )
}

export { CommissionBaseRevenueTable } 
