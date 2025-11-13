import { Card, Flex, Row, Col, Typography, Segmented } from "antd"
import { AccountApprovalRequestsTable, BreadCrumb, ModuleTopHeading } from "../../components"
const { Text } = Typography

const RequestsQueuePage = () => {
    return (
        <>
            <Flex vertical gap={24}>
                <BreadCrumb items={[
                    { title: 'Client Management' },
                    { title: 'Requests Queues' }
                ]} />
                <Card className="radius-12 border-gray card-cs h-100">
                    <Row gutter={[16, 24]}>
                        <Col span={24}>
                            <Flex vertical gap={10}>
                                <Flex vertical>
                                    <ModuleTopHeading level={5} name={'Requests Queue'} />
                                    <Text className='text-gray fs-13'>Manage all the requests in your system</Text>
                                </Flex>
                                <Flex>
                                    <Segmented
                                        options={["Account Approval Requests", "Relocation Approval Requests"]}
                                        className="custom-segment"
                                    />
                                </Flex>
                            </Flex>
                        </Col>
                        <Col span={24}>
                        <AccountApprovalRequestsTable/>
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </>
    )
}

export { RequestsQueuePage }
