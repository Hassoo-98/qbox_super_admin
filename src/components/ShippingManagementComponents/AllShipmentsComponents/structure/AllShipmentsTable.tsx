import { useState } from "react";
import { Flex, Table, Form, Row, Col, Dropdown, Button, type MenuProps, Card, Typography } from "antd"
import { CustomPagination, ModuleTopHeading } from "../../../PageComponents"
import { allpackagesColumn, allpackagesData } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import type { AllPackagesTypes } from "../../../../types";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
const {Text} = Typography;
const AllShipmentsTable: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState<number>(10);
    const [current, setCurrent] = useState<number>(1);
    const [seletedpackage, setSelectedpackage] = useState<number | null>(null);
    const navigate = useNavigate();
    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };
    const PackagesType: { key: number, label: string }[] = [
        { key: 1, label: t('In Comming') },
        { key: 2, label: t('Send') },
        { key: 2, label: t('Return') }
    ];

    const handlePackageClick: MenuProps["onClick"] = ({ key }) => {
        setSelectedpackage(Number(key));
    };

    const selectedPackagelabel =
        PackagesType.find((item) => item.key === seletedpackage)?.label || t("Package Type");
   const isRTL = i18n.language === "ar";
      
    return (
        <>
            <Card className='radius-12 border-gray card-cs h-100'    style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={5} name={t('All Shipments')} />
                            <Text className='text-gray fs-13'>{t('Manage all shipments in your system')}</Text>
                        </Flex>
                    </Flex>
                <Form layout="vertical" form={form}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={16} md={24} span={24}>
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        placeholder={t('Search by Tracking ID')}
                                        prefix={<img src='/assets/icons/search.png' width={16} alt='search icon' fetchPriority="high" />}
                                    />
                                </Col>
                                <Col span={24} md={24} lg={12}>
                                    <Flex gap={5}>
                                        <Dropdown
                                            menu={{
                                                items: PackagesType,
                                                onClick: handlePackageClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {selectedPackagelabel}
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
                <Table<AllPackagesTypes>
                    size='large'
                    columns={allpackagesColumn({ navigate },t)}
                    dataSource={allpackagesData}
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
        </>
    )
}

export { AllShipmentsTable } 
