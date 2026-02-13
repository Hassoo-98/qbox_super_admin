import { Typography, Card, Flex, Table, Form, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import { CustomPagination, ModuleTopHeading } from "../../../PageComponents";
import { MyDatepicker, SearchInput, } from "../../../Forms";
import type { PromotionItem } from "../../../../types/AllQboxTypes";
import { promotionColumn, promotionData } from "../../../../data";
import { AddEditPromotion } from "../modal";
import { usePromotion } from "../../../../hooks/usePromotion";
const { Text } = Typography;
const PromotionTable = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>();
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
        undefined,
    );
    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };
    const { t } = useTranslation();
    const { promotionList, isLoadingPromotion, promotionListError } = usePromotion();
    const PromotionData = Array.isArray(promotionList?.data?.items) ? promotionList?.data?.items : [];
    const TotalPromotion = promotionList?.data?.total || 0;
    return (
        <>
            <Card className="radius-12 border-gray card-cs h-100">
                <Flex vertical gap={15} className="mb-3">
                    <Flex justify="space-between" gap={10} align="flex-start">
                        <Flex vertical>
                            <ModuleTopHeading level={5} name={t("Promotions")} />
                            <Text className="text-gray fs-13">
                                {t("Manage all promotions in your system")}
                            </Text>
                        </Flex>
                        <Button
                            className="btncancel text-black bg-gray"
                            onClick={() => setVisible(true)}
                        >
                            <PlusOutlined /> {t("Add New Promotion")}
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col span={24} md={24} lg={8}>
                                <SearchInput
                                    placeholder={t("Search by promotion")}
                                    prefix={
                                        <img
                                            src="/assets/icons/search.png"
                                            width={16}
                                            alt="search icon"
                                            fetchPriority="high"
                                        />
                                    }
                                />
                            </Col>
                            <Col span={24} md={24} xl={7}>
                                <Flex justify="end" gap={10}>
                                    <MyDatepicker
                                        withoutForm
                                        rangePicker
                                        className="datepicker-cs"
                                        placeholder={[t("Start Year"), t("End Year")]}
                                        value={selectedYear}
                                        onChange={(dates: [Dayjs, Dayjs] | null) =>
                                            setSelectedYear(dates ?? undefined)
                                        }
                                    />
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table<PromotionItem>
                        size="large"
                        columns={promotionColumn(
                            { t }
                        )}
                        dataSource={PromotionData}
                        className="pagination table-cs table"
                        showSorterTooltip={false}
                        scroll={{ x: 1600 }}
                        rowHoverable={false}
                        pagination={false}
                    />
                    {
                        TotalPromotion >10 && (
                            <CustomPagination
                        total={TotalPromotion}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                        )
                    }
                    
                </Flex>
            </Card>
            <AddEditPromotion
                visible={visible}
                title="Add Modal"
                onClose={() => setVisible(false)}
                onConfirm={() => setVisible(false)}

            />
        </>
    );
};

export { PromotionTable };
