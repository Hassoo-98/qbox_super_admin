import { Card, Flex, Button, Typography, Image, Row, Col } from "antd"
import { BreadCrumb } from "../../../PageComponents"
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { SingleViewQRHistoryTable } from "../tabcontents";
// import { allboxesData } from "../../../../data";
import { useTranslation } from "react-i18next";
import { qrhistoryData } from "../../../../data";
const { Title, Text } = Typography;
const SingleViewQRHistory = () => {
     const {t,i18n} = useTranslation();
     const isArabic = i18n.language === "ar";
    const navigate = useNavigate();
    const {id} = useParams();
    const details = qrhistoryData?.find((list) => list?.key === Number(id))
    return (
        <div>
            <Flex vertical gap={20}>
                <BreadCrumb items={[
                    { title: t('QBox Management' )},
                     { title: t('QBox ID' )},
                    { title: String(details?.qrcode) }
                ]} />
                <Card className="radius-12 border-gray card-cs h-100">
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Flex justify="space-between">
                                <Flex vertical gap={20} justify="center">
                                <Flex align="center" gap={10}>
                                    <Button className="border-0 p-0 bg-transparent" onClick={() => navigate(-1)}>
                                       {isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                                    </Button>
                                    <Title level={4} className="fw-500 m-0">{details?.qrcode}</Title>
                                    {
                                        details?.status === 'active' ?
                                        <Text className='btnpill fs-12 success py-1'>{t('Active')}</Text>:
                                        <Text className='btnpill fs-12 inactive py-1'>{t('Inactive')}</Text>
                                    }
                                    
                                </Flex>
                                <Flex align="center" gap={10}>
                                    <Flex align="center" gap={7}>
                                        <Image src="/assets/icons/qr.png" preview={false} width={18} />
                                        <Text>{t('Valid for 10 users, until 30 days')}</Text>
                                    </Flex>
                                    <Flex align="center" gap={7}>
                                        <Image src="/assets/icons/calender.png" preview={false} width={18} />
                                        <Text>{t("Created on:")} 12/02/2025 10:05 am</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Image src="/assets/icons/qr2.png" preview={false} width={100}/>
                            </Flex>
                        </Col>
                        <Col span={24}>
                            <SingleViewQRHistoryTable />
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </div>
    )
}

export { SingleViewQRHistory } 
