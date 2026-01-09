import { Button, Card, Flex, Typography } from "antd"
import { BreadCrumb } from "../../../PageComponents"
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { PayoutRequestInvoiceTable } from "./PayoutRequestInvoiceTable"
import { PayoutRequestPackagesTable } from "./PayoutRequestPackagesTable"
import { payoutrequestData } from "../../../../data"
const { Title } = Typography
const SingleViewPayoutRequest = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
  
    const { id } = useParams()
    const details = payoutrequestData?.find((list)=>list?.key === Number(id))
       const isRTL = i18n.language === "ar";
       
    return (
        <>
            <Flex vertical gap={10}  
           style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <BreadCrumb
                    items={[
                        { title: t('Payout Management') },
                        { title: t('Payout Request') },
                        { title: `${details?.payoutid}` }
                    ]}
                />
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Flex vertical gap={30}>
                        <Flex gap={10} align="center">
                            <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/payoutrequests")}>
                                {isRTL ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                            </Button>
                            <Title level={5} className="fw-500 m-0">{details?.payoutid}</Title>
                            <Title level={5} className="fw-500 m-0">{details?.merchantname}</Title>
                        </Flex>
                        <PayoutRequestInvoiceTable />
                        <Title level={5} className="m-0 fw-500">{t('Packages History')}</Title>
                        <PayoutRequestPackagesTable/>
                    </Flex>
                </Card>
            </Flex>
        </>
    )
}

export { SingleViewPayoutRequest } 
