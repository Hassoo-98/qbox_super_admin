import { useState } from "react";
import { Typography, Card, Flex, Table, Form, Row, Col, type TableColumnsType, type MenuProps, Avatar, Dropdown, Button } from "antd"
import { ActiveModal, CustomPagination, DeleteModal, InactiveModal, ModuleTopHeading } from "../../../PageComponents"
import { homeownersData, type HomerOwnerItems } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { DownOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
const { Text } = Typography;
const HomeOwnersTable: React.FC = () => {
    const [form] = Form.useForm();
    const [activeModal, setActiveModal] = useState(false);
    const [inactiveModal, setInactiveModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
    const [pageSize, setPageSize] = useState<number>(10);
    const [current, setCurrent] = useState<number>(1);
    const [itemToDelete, setItemToDelete] = useState<HomerOwnerItems | null>(null);
    const navigate = useNavigate();
    const handleStatusClick = (status: "active" | "inactive") => {
        if (status === "active") {
            setInactiveModal(true);
        } else {
            setActiveModal(true);
        }
    };
    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };
    const Cities = [
        { key: 1, label: 'Qatif' },
        { key: 2, label: 'Qaseem' }
    ];

    const QboxStatus = [
        { key: 1, label: 'Online' },
        { key: 2, label: 'OffLine' },
        { key: 2, label: 'Error' }
    ];

    const AccountStatus = [
        { key: 1, label: 'Active' },
        { key: 2, label: 'Inactive' }
    ];

    const recentColumn: TableColumnsType<HomerOwnerItems> = [
        {
            title: 'ID',
            dataIndex: 'id'
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
            title: 'Email Address',
            dataIndex: 'email'
        },
        {
            title: 'Short Addres',
            dataIndex: 'shortaddress'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },
        {
            title: 'Total Deliveries',
            dataIndex: 'totaldliveries'
        },
        {
            title: 'Subscriptions Plan',
            dataIndex: 'subscriptionplane',
            render: (subscriptionplane) => {
                return (
                    subscriptionplane === 'active' ?
                        <Text className='btnpill fs-12 success'>Active</Text> :
                        <Text className='btnpill fs-12 inactive'>Expired</Text>
                )
            }
        },
        {
            title: 'QBox Status',
            dataIndex: 'qboxstatus',
            render: (qboxstatus) => {
                return (
                    qboxstatus === 'online' ? (
                        <Text className="btnpill fs-12 success">Online</Text>
                    ) : qboxstatus === 'offline' ? (
                        <Text className="btnpill fs-12 inactive">Offline</Text>
                    ) : (
                        <Text className="btnpill fs-12 pending">Error</Text>
                    )
                );
            }
        },
        {
            title: 'Account Status',
            dataIndex: 'accountstatus',
            render: (accountstatus) => {
                return (
                    accountstatus === 'active' ?
                        <Text className='btnpill fs-12 success'>Active</Text> :
                        <Text className='btnpill fs-12 inactive'>Inactive</Text>
                )
            }
        },
        {
            title: 'Account Created On',
            dataIndex: 'createdon'
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            render: (_, row: HomerOwnerItems) => {
                const items: MenuProps["items"] = [
                    {
                        label: (
                            <NavLink
                                to="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Use row.accountstatus to decide modal
                                    handleStatusClick(row.accountstatus);
                                }}
                            >
                                {row.accountstatus === "active" ? "Inactive" : "Active"}
                            </NavLink>
                        ),
                        key: "1",
                    },
                    {
                        label: (
                            <NavLink to="/" onClick={(e) => { e.preventDefault(); navigate('/homeowners/homeownersdetails/' + + row?.key) }}>
                                View
                            </NavLink>
                        ),
                        key: "2",
                    },
                    {
                        label: (
                            <NavLink
                                to="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setItemToDelete(row); // store clicked item
                                    setDeleteItem(true);  // open modal
                                }}
                            >
                                Delete
                            </NavLink>
                        ),
                        key: "3",
                    },
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
    ];

    return (
        <>
            <Card className='radius-12 border-gray card-cs h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={5} name={'Home Owners'} />
                        <Text className='text-gray fs-13'>Manage all the home owners in your system</Text>
                    </Flex>
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
                                            <Dropdown
                                                menu={{ items: QboxStatus }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        QBox Status
                                                        <DownOutlined />
                                                    </Flex>
                                                </Button>
                                            </Dropdown>
                                            <Dropdown
                                                menu={{ items: AccountStatus }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        Account Status
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
                </Flex>
                <Flex vertical gap={20}>
                    <Table<HomerOwnerItems>
                        size='large'
                        columns={recentColumn}
                        dataSource={homeownersData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1300 }}
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
            </Card>
            <ActiveModal visible={activeModal} onClose={() => setActiveModal(false)} />
            <InactiveModal visible={inactiveModal} onClose={() => setInactiveModal(false)} />
            <DeleteModal visible={deleteItem} onClose={() => setDeleteItem(false)} item={itemToDelete} />
        </>
    )
}

export { HomeOwnersTable } 
