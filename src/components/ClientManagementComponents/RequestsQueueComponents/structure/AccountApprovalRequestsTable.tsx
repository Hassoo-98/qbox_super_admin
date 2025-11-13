
import { Flex, Form, Row, Col, Dropdown, Button, Typography, Table, type TableColumnsType, type MenuProps, Avatar } from "antd"
import { appointmentapprovalrequestData, type AppointApprovalItems } from "../../../../data";
import { DownOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { SearchInput } from "../../../Forms";
const { Text } = Typography;
const AccountApprovalRequestsTable: React.FC = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const Cities = [
        { key: 1, label: 'Qatif' },
        { key: 2, label: 'Qaseem' }
    ];
    const accountColumns: TableColumnsType<AppointApprovalItems> = [
        {
            title: 'Owner ID',
            dataIndex: 'ownerid'
        },
        {
            title: 'Homeowner Name',
            dataIndex: 'homeownername'
        },
        {
            title: 'QBox ID',
            dataIndex: 'qboxid'
        },
        {
            title: 'QBox Image',
            dataIndex: 'qboximage',
            render: (qboximage) => <Avatar src={qboximage} size={50} shape="square" />,
            width: 100
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },
        {
            title: 'Requested Date',
            dataIndex: 'requestedDate'
        },
        {
            title: 'Installation Status',
            dataIndex: 'installationstatus',
            render: (subscriptionplane) => {
                return (
                    subscriptionplane === 'installed' ?
                        <Text className='btnpill fs-12 success'>Installed</Text> :
                        <Text className='btnpill fs-12 inactive'>Not Installed</Text>
                )
            }
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            render: (_, row: AppointApprovalItems) => {
                const items: MenuProps["items"] = [
                    {
                        label: (
                            <NavLink to="/" onClick={(e) => { e.preventDefault(); navigate(''+row?.key) }}>
                                View
                            </NavLink>
                        ),
                        key: "1",
                    }
                ];

                return (
                    <Dropdown menu={{ items }} trigger={["click"]}>
                        <Button className="bg-transparent border-0 p-0">
                            <img
                                src="/assets/icons/dots.webp"
                                alt="dots icon"
                                fetchPriority="high"
                                width={16}
                            />
                        </Button>
                    </Dropdown>
                );
            },
        },
    ]
    return (
        <div>
            <Flex vertical gap={20}>
                <Form layout="vertical" form={form}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={16} md={24} span={24}>
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        placeholder='Search by Home Owner Name / QBox ID'
                                        prefix={<img src='/assets/icons/search.png' width={16} alt='search icon' fetchPriority="high" />}
                                    />
                                </Col>
                                <Col span={24} md={24} lg={12}>
                                    <Flex gap={5}>
                                        <Dropdown
                                            menu={{ items: Cities }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    City
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                       
                    </Row>
                </Form>
                <Table<AppointApprovalItems>
                    size='large'
                    columns={accountColumns}
                    dataSource={appointmentapprovalrequestData}
                    className='pagination table-cs table'
                    showSorterTooltip={false}
                    scroll={{ x: 1300 }}
                    rowHoverable={false}
                    pagination={false}
                />
            </Flex>
        </div>
    )
}

export { AccountApprovalRequestsTable }
