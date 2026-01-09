import { Button, Card, Flex, Typography } from "antd"
import { BreadCrumb } from "../../../PageComponents"
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next"
import { useNavigate, useParams} from "react-router-dom"
import { PayoutHistoryInvoiceTable } from "./PayoutHistoryInvoiceTable"
import { PayoutHistoryPackagesTable } from "./PayoutHistoryPackagesTable"
import { payouthistoryData } from "../../../../data"

const { Title } = Typography
const SingleViewPayoutHistory = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const { id } = useParams()
    const details = payouthistoryData?.find((list) => list?.key === Number(id))
       const isRTL = i18n.language === "ar";
           
    return (
        <>
            <Flex vertical gap={10}     
           style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <BreadCrumb
                    items={[
                        { title: t('Payout Management') },
                        { title: t('Payout History') },
                        { title: `${details?.payoutid}` }
                    ]}
                />
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Flex vertical gap={30}>
                        <Flex justify="space-between">
                            <Flex gap={10} align="center">
                                <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/payouthistory")}>
                                    {isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                                </Button>
                                <Title level={5} className="fw-500 m-0">{details?.payoutid}</Title>
                            </Flex>
                            <Button className="btnsave border-0 text-white bg-slate-blue">{t("Download Invoice")}</Button>
                        </Flex>
                        <PayoutHistoryInvoiceTable />
                        <Title level={5} className="m-0 fw-500">{t('Packages History')}</Title>
                        <PayoutHistoryPackagesTable />
                    </Flex>
                </Card>
            </Flex>
        </>
    )
}

export { SingleViewPayoutHistory } 
