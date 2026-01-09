import { Typography, Card, Flex, Table, Form, Row, Col, } from "antd"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from 'dayjs';
import { useNavigate } from "react-router-dom";
import type { PayoutRequestTypes } from "../../../../Type";
import { ModuleTopHeading } from "../../../PageComponents";
import { payoutrequestColumn, payoutrequestData} from "../../../../data";
import { MyDatepicker, SearchInput } from "../../../Forms";
import i18n from "../../../../sources/i18n";


const { Text } = Typography;
const PayoutRequestTable = () => {
       const isRTL = i18n.language === "ar";
      
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(undefined);

    const {t} = useTranslation()

    return (
        <>
            <Card className='radius-12 border-gray card-cs h-100'    
           style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Flex vertical gap={15} className='mb-3'>
                    <Flex vertical>
                        <ModuleTopHeading level={5} name={t('Payout Requests')} />
                        <Text className='text-gray fs-13'>{t('Manage all payout requests in your system')}</Text>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={8} md={24} span={24}>        
                                <SearchInput
                                    placeholder={t('Search by Service Provider/Merchant Name')}
                                    prefix={<img src='/assets/icons/search.png' width={16} alt='search icon' fetchPriority="high" />}
                                />
                            </Col>
                            <Col span={24} md={24} xl={7}>
                                <Flex justify='end' gap={10}>
                                    <MyDatepicker
                                        withoutForm
                                        rangePicker
                                        className="datepicker-cs"
                                        placeholder={[t('Start Year'),t('End Year')]}
                                        value={selectedYear}
                                        onChange={(dates: [Dayjs, Dayjs] | null) => setSelectedYear(dates ?? undefined)}
                                    />
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table<PayoutRequestTypes>
                        size='large'
                        columns={payoutrequestColumn({navigate},t)}
                        dataSource={payoutrequestData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1000 }}
                        rowHoverable={false}
                        pagination={false}
                    />
                </Flex>
            </Card>

        </>
    )
}

export { PayoutRequestTable } 
