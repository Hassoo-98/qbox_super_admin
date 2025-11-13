import { Button, Card, Flex, Typography, Image, Row, Col, Table, type TableColumnsType } from "antd"
import { BreadCrumb } from "../../../PageComponents"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from "react-router-dom";
import { homeownersData } from "../../../../data";
const { Text, Title } = Typography;
const HomeOwnersDetails: React.FC = () => {
    const navigate = useNavigate();
const { id } = useParams()
 const details = homeownersData?.find((list) => list?.key === Number(id))
    interface DetailItem {
  key: string;
  type: React.ReactNode;
  detail: React.ReactNode;
}

        const columns: TableColumnsType<DetailItem> = [
        {
            title: 'Type',
            dataIndex: 'type',
            width:500
        },
        {
            title: 'Details',
            dataIndex: 'detail',
        },
    ]

    const data : DetailItem [] = [
        {
            key: '1',
            type: <Text className='text-gray'>Full Name</Text>,
            detail: <Text>{details?.homeownername}</Text>
        },
        {
            key: '2',
            type: <Text className='text-gray'>Email Address</Text>,
            detail: <Text>{details?.email}</Text>
        },
         {
            key: '3',
            type: <Text className='text-gray'>Phone Number</Text>,
            detail: <Text>{details?.phonenumber}</Text>
        },
         {
            key: '4',
            type: <Text className='text-gray'>Short Address</Text>,
            detail: <Text>{details?.shortaddress}</Text>
        },
         {
            key: '5',
            type: <Text className='text-gray'>City</Text>,
            detail: <Text>{details?.city}</Text>
        },
         {
            key: '6',
            type: <Text className='text-gray'>District</Text>,
            detail: <Text>{details?.district}</Text>
        },
        {
            key: '7',
            type: <Text className='text-gray'>Street</Text>,
            detail: <Text>{details?.street}</Text>
        },
        {
            key: '8',
            type: <Text className='text-gray'>Postal Code</Text>,
            detail: <Text>{details?.postalcode}</Text>
        },
        {
            key: '9',
            type: <Text className='text-gray'>Building #</Text>,
            detail: <Text>{details?.building}</Text>
        },
        {
            key: '10',
            type: <Text className='text-gray'>ID Type & Number</Text>,
            detail: <Text>{details?.idtypenumber}</Text>
        },
        {
            key: '11',
            type: <Text className='text-gray'>Secondary Number</Text>,
            detail: <Text>{details?.secondarynumber}</Text>
        },
        {
            key: '12',
            type: <Text className='text-gray'>Preferred Location</Text>,
            detail: <Text>{details?.preferdlocation}</Text>
        },
        {
            key: '13',
            type: <Text className='text-gray'>Instruction</Text>,
            detail: <Text>{details?.instruction}</Text>
        },
    ];

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
                            <Button className="border-0 p-0 bg-transparent" onClick={()=>navigate('/homeowners')}>
                                <ArrowLeftOutlined />
                            </Button>
                            <Title level={4} className="fw-500 m-0">ID . {details?.homeownername} </Title>
                            {
                                details?.subscriptionplane === 'active' ?
                                <Text className='btnpill fs-12 success py-1'>Active</Text> :
                                 <Text className='btnpill fs-12 inactive py-1'>Inactive</Text>
                            }
                        </Flex>
                        {
                                details?.accountstatus === 'active' ?
                                <Button className="btncancel bg-red text-white">Inactive Account</Button> :
                                 <Button className="btncancel bg-green text-white">Active Account</Button>
                            }
                        
                    </Flex>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Flex justify="center">
                                <Image src={details?.qboximage} preview={false} width={200} />
                            </Flex>
                        </Col>
                        <Col span={24}>
                            <Table<DetailItem>
                                size='large'
                                columns={columns}
                                dataSource={data}
                                className='pagination table-cs table'
                                showSorterTooltip={false}
                                scroll={{ x: 500 }}
                                rowHoverable={false}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </div>
    )
}

export { HomeOwnersDetails } 
