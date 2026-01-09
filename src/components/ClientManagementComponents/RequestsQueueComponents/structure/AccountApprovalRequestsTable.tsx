
import { useState } from "react";
import { Flex, Form, Row, Col, Dropdown, Button, Typography, Table, type TableColumnsType, type MenuProps, Avatar } from "antd"
import { appointmentapprovalrequestData, type AppointApprovalItems } from "../../../../data";
import { DownOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { SearchInput } from "../../../Forms";
import { CustomPagination } from "../../../PageComponents";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
const { Text } = Typography;
const AccountApprovalRequestsTable: React.FC = () => {
    const [form] = Form.useForm()
    const [pageSize, setPageSize] = useState<number>(10);
    const [current, setCurrent] = useState<number>(1);
    const navigate = useNavigate();
    const {t}=useTranslation()
      const isRTL = i18n.language === "ar";
     
        

     const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };

    const Cities = [
        { key: 1, label: t('Qatif') },
        { key: 2, label: t('Qaseem') }
    ];
    const accountColumns: TableColumnsType<AppointApprovalItems> = [
        {
            title: t('Owner ID'),
            dataIndex: 'ownerid'
        },
        {
            title: t('Homeowner Name'),
            dataIndex: 'homeownername'
        },
        {
            title: t('QBox ID'),
            dataIndex: 'qboxid'
        },
        {
            title: t('QBox Image'),
            dataIndex: 'qboximage',
            render: (qboximage) => <Avatar src={qboximage} size={50} shape="square" />,
            width: 100
        },
        {
            title: t('Phone Number'),
            dataIndex: 'phonenumber'
        },
        {
            title: t('City'),
            dataIndex: 'city'
        },
        {
            title: t('Requested Date'),
            dataIndex: 'requestedDate'
        },
    {
            title: t('Installation Status'),
            dataIndex: 'installationstatus',
            render: (subscriptionplane) => {
                return (
                    subscriptionplane === 'installed' ?
                        <Text className='btnpill fs-12 success'>{t("Installed")}</Text> :
                        <Text className='btnpill fs-12 inactive'>{t("Not Installed")}</Text>
                )
            }
        },
        {
            title: t("Action"),
            key: "action",
            width: 100,
            render: (_, row: AppointApprovalItems) => {
                const items: MenuProps["items"] = [
                    {
                        label: (
                            <NavLink to="/" onClick={(e) => { e.preventDefault(); navigate('/requestsqueue/accountapprovaldetails/' + row?.key) }}>
                                {t("View")}
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
            <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Form layout="vertical" form={form}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={16} md={24} span={24}>
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        placeholder={t('Search by Home Owner Name / QBox ID')}
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
                                                    {t("City")}
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
                <Flex vertical gap={20}>
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
                <CustomPagination
                    total={12}
                    current={current}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
                </Flex>
            </Flex>
        </div>
    )
}

export { AccountApprovalRequestsTable }
