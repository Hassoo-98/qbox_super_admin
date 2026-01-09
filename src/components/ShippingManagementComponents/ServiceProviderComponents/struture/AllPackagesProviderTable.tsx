import { Card, Flex, Table, Form, Row, Col, Dropdown, Button, type MenuProps } from "antd"
import { DownOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from 'dayjs';
import { useNavigate } from "react-router-dom";
import type { AllPackageProviderType } from "../../../../Type";
import { packageItem } from "../../../../shared";
import { allpackageproviderColumn, allpkgproviderData } from "../../../../data";
import { MyDatepicker, SearchInput } from "../../../Forms";
import i18n from "../../../../sources/i18n";



const AllPackagesProviderTable = () => {
  
    const [form] = Form.useForm();
    const [selectedpackage, setselectedPackage] = useState<string>('');
    const navigate = useNavigate()
    const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(undefined);

    const {t} = useTranslation()
    const handlePkgClick: MenuProps['onClick'] = ({ key }) => {
        setselectedPackage(key);
    };
    const selectedPkgLabel = packageItem(t).find((item) => item.key === selectedpackage)?.label || t("Package Type");
  
        const isRTL = i18n.language === "ar";
    return (
        <>
            <Flex vertical gap={15}    style={{ direction: isRTL ? "rtl" : "ltr" }}
       >
                <Flex vertical gap={15}>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={14} md={24} span={24}>        
                                <Row gutter={[16, 16]}>
                                    <Col span={24} md={24} lg={12}>
                                        <SearchInput
                                            placeholder={t('Search by Tracking ID')}
                                            prefix={<img src='/assets/icons/search.png' width={16} alt='search icon' fetchPriority="high" />}
                                        />
                                    </Col>
                                    <Col span={24} lg={12}>
                                        <Dropdown
                                            menu={{
                                                items: packageItem(t),
                                                onClick: handlePkgClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {selectedPkgLabel}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} md={24} xl={7}>
                                <Flex justify='end' gap={10}>
                                    <MyDatepicker
                                        withoutForm
                                        rangePicker
                                        className="datepicker-cs"
                                        placeholder={[t('Start Year'),t('End Year')]}
                                        value={selectedYear}
                                        onChange={(dates: [Dayjs, Dayjs] | null) => setSelectedYear(dates ?? undefined)}
                                    />
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table<AllPackageProviderType>
                        size='large'
                        columns={allpackageproviderColumn({ navigate },t)}
                        dataSource={allpkgproviderData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 800 }}
                        rowHoverable={false}
                        pagination={false}
                    />
                </Flex>
            </Flex>
        </>
    )
}

export { AllPackagesProviderTable } 
