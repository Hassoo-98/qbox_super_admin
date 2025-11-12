import { Button, Card, Flex, Typography, Image, Row, Col} from "antd"
import { BreadCrumb } from "../../PageComponents"
import { ArrowLeftOutlined } from '@ant-design/icons'
const {Text, Title} = Typography;
const HomeOwnersDetails = () => {
    return (
        <div>
            <Flex vertical gap={24}>
                <BreadCrumb items={[
                    { title: 'Client Management' },
                    { title: 'Home Owners' },
                    { title: 'Hasham Ali' }
                ]} />
                <Card className="card-cs radius-12 border-gray h-100">
                    <Flex align="center" justify="space-between" className="mb-4">
                        <Flex align="center" gap={5}>
                            <Button className="border-0 p-0 bg-transparent">
                                <ArrowLeftOutlined />
                            </Button>
                            <Title level={4} className="fw-500 m-0">ID . Homeowner Name </Title>
                            <Text className='btnpill fs-12 success py-1'>Active</Text>
                            <Text className='btnpill fs-12 inactive py-1'>Inactive</Text>
                        </Flex>
                        <Button className="btncancel bg-green text-white">Active Account</Button>
                    </Flex>
                    <Row gutter={[16,16]}>
                        <Col span={24}>
                        <Flex justify="center">
                            <Image src="/assets/images/qbox.png" preview={false} width={200}/>
                        </Flex>
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </div>
    )
}

export { HomeOwnersDetails } 
