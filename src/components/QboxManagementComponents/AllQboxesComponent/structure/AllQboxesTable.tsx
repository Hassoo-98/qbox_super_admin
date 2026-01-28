import { useState } from "react";
import { Typography, Card, Flex, Table, Form, Row, Col, Dropdown, Button, type MenuProps } from "antd"
import { CustomPagination, ModuleTopHeading } from "../../../PageComponents"
import { allboxesData, allqboxesColumn } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import type { AllBoxesTypes } from "../../../../types";
import i18n from "../../../../sources/i18n";
import { useTranslation } from "react-i18next";
const { Text } = Typography;
const AllQboxesTable: React.FC = () => {
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState<number>(10);
    const [current, setCurrent] = useState<number>(1);
    const [seletedcity, setCity] = useState<number | null>(null);
    const [selectedqboxstatus, setQboxstatus] = useState<number | null>(null);
    const navigate = useNavigate();
    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };
    const {t}=useTranslation();
    const Cities: { key: number, label: string }[] = [
        { key: 1, label: t('Qatif') },
        { key: 2, label: t('Qaseem') }
    ];

    const QboxStatus: { key: number, label: string }[] = [
        { key: 1, label: t('Online') },
        { key: 2, label: t('Offline') },
        { key: 3, label: t('Error') }
    ];

    const handleCityClick: MenuProps["onClick"] = ({ key }) => {
        setCity(Number(key));
    };

    const handleQboxStatus: MenuProps["onClick"] = ({ key }) => {
        setQboxstatus(Number(key));
    };

    const selectedCityabel =
        Cities.find((item) => item.key === seletedcity)?.label || t("City");

    const selectedStatusLabel =
        QboxStatus.find((item) => item.key === selectedqboxstatus)?.label || t("Status");
      const isRTL = i18n.language === "ar";
    
        
    return (
        <>
            <Card className='radius-12 border-gray card-cs h-100'    style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={5} name={t('All QBoxes')} />
                        <Text className='text-gray fs-13'>{t("Manage all the QBoxes in your system")}</Text>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={16} md={24} span={24}>
                                <Row gutter={[16, 16]}>
                                    <Col span={24} md={24} lg={12}>
                                        <SearchInput
                                            placeholder={t('Search by QBox ID')}
                                            prefix={<img src='/assets/icons/search.png' width={16} alt='search icon' fetchPriority="high" />}
                                        />
                                    </Col>
                                    <Col span={24} md={24} lg={12}>
                                        <Flex gap={5}>
                                            <Dropdown
                                                menu={{
                                                    items: Cities,
                                                    onClick: handleCityClick
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        {selectedCityabel}
                                                        <DownOutlined />
                                                    </Flex>
                                                </Button>
                                            </Dropdown>
                                            <Dropdown
                                                menu={{
                                                    items: QboxStatus,
                                                    onClick: handleQboxStatus
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        {selectedStatusLabel}
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
                    <Table<AllBoxesTypes>
                        size='large'
                        columns={allqboxesColumn({ navigate })}
                        dataSource={allboxesData}
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

export { AllQboxesTable } 
