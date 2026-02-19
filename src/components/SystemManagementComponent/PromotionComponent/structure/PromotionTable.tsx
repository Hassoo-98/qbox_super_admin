import { Typography, Card, Flex, Table, Form, Row, Col, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import { ConfirmModal, CustomPagination, DeleteModal, ModuleTopHeading } from "../../../PageComponents";
import { MyDatepicker, SearchInput, } from "../../../Forms";
import type { PromotionItem } from "../../../../types/AllQboxTypes";
import { promotionColumn } from "../../../../data";
import { AddEditPromotion } from "../modal";
import { usePromotion } from "../../../../hooks/usePromotion";
import { useGlobalContext } from "../../../../context/globalContext";
import { useQueryClient } from "@tanstack/react-query";
const { Text } = Typography;
const PromotionTable = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>();
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [editItem, setEditItem] = useState<PromotionItem | null>(null);
    const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
        undefined,
    );
    const handlePageChange = (page: number, size: number): void => {
        setCurrent(page);
        setPageSize(size);
    };
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { promotionList, isLoadingPromotion, promotionListError, promotionChangeStatus, deletePromotion } = usePromotion();
    const PromotionData = Array.isArray(promotionList?.data?.items) ? promotionList?.data?.items : [];
    const TotalPromotion = promotionList?.data?.total || 0;
    const { modals, setModals, tableSelectedIds, setTableSelectedIds, selectedRowStatus, setSelectedRowStatus } = useGlobalContext();

    const changeStatus = (currentStatus: boolean | null) => {
        if (!tableSelectedIds.promotionSelectedId) {
            message.error("promotion  is not selected");
            return;
        }

        console.log("Cussrent", currentStatus);
        promotionChangeStatus(
            { id: tableSelectedIds.promotionSelectedId, payload: { is_active: !currentStatus } },
            {
                onSuccess: () => {
                    message.success("promotion status changed"),
                        queryClient.invalidateQueries({ queryKey: ["promotion"] }),
                        setModals((prev: any) => ({ ...prev, statusModal: false })),
                        setTableSelectedIds((perv: any) => ({ ...perv, promotionSelectedId: null }))
                }
            }
        );
    };

    const handlePromotionDelete = () => {
        if (!tableSelectedIds?.promotionSelectedId) return;
        deletePromotion(tableSelectedIds.promotionSelectedId, {
            onSuccess: () => {
                setModals((prev) => ({ ...prev, deleteModal: false }));
                queryClient.invalidateQueries({ queryKey: ["promotion"] }),
                setTableSelectedIds((prev) => ({
                    ...prev,
                    promotionSelectedId: null
                }))
            },
            onError: () => {
                setModals((prev) => ({ ...prev, deleteModal: false }));
                setTableSelectedIds((prev) => ({
                    ...prev,
                    promotionSelectedId: null
                }))
            }
        })
    }
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
                            {
                                setModals,
                                setTableSelectedIds,
                                setSelectedRowStatus,
                                setEditItem,
                                setVisible,
                                t
                            }
                        )}
                        dataSource={PromotionData}
                        className="pagination table-cs table"
                        showSorterTooltip={false}
                        scroll={{ x: 1600 }}
                        rowHoverable={false}
                        pagination={false}
                        loading={isLoadingPromotion}
                    />
                    {
                        TotalPromotion > 10 && (
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
                title={editItem ? "Edit Promotion" : "Add Promotion"}
                onClose={() => setVisible(false)}
                edititem={editItem}

            />
            <ConfirmModal
                visible={modals.statusModal}
                img={selectedRowStatus?.currentStatus ? "inactive.png" : "active.png"}
                title={selectedRowStatus?.currentStatus ? t("Inactivate Promotion") : t("Activate Promotion")}
                desc={selectedRowStatus?.currentStatus ? t("Are you sure you want to inactive this promotion?") : t("Are you sure you want to active this promotion?")}
                onClose={() => {
                    setModals((prev) => ({ ...prev, statusModal: false }));
                    setTableSelectedIds((prev) => ({ ...prev, promotionSelectedId: null }));
                }}
                onConfirm={() => changeStatus(selectedRowStatus?.currentStatus)}
            />
            <DeleteModal
                title={t("Delete Promotion")}
                subtitle={t("Are you sure you want to delete")}
                visible={modals.deleteModal}
                // item={itemToDelete}
                onConfirm={handlePromotionDelete}
                onClose={() =>
                    setModals((prev) => ({ ...prev, deleteModal: false }))
                }
            />
        </>
    );
};

export { PromotionTable };
