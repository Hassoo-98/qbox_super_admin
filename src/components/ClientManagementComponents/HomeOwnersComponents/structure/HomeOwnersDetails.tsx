import { useState } from "react";
import {
  Button,
  Card,
  Flex,
  Typography,
  Row,
  Col,
  Table,
  type TableColumnsType,
  Modal,
} from "antd";
import { ActiveModal, BreadCrumb, ConfirmModal } from "../../../PageComponents";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  ExpandOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { homeownersData } from "../../../../data";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { useHomeowner } from "../../../../hooks/useHomeOwner";
import { useGlobalContext } from "../../../../context/globalContext";
const { Text, Title } = Typography;

const HomeOwnersDetails: React.FC = () => {
  const { t } = useTranslation();
  const [inactivestatus, setInactiveStatus] = useState<boolean>(false);
  const [activestatus, setActiveStatus] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const { id } = useParams();
  const details = homeownersData?.find((list) => list?.key === Number(id));

  const { Homeowner, homeOwnerChangeStatus } = useHomeowner()
  const homeOwnerdetial = Homeowner?.data;
  const { modals, setModals, tableSelectedIds, setTableSelectedIds } = useGlobalContext();
  const changeStatus = (is_active: boolean) => {
    console.log("is_active value being sent:", is_active);
    if (!tableSelectedIds.homeOwnerSelectedId) {
      // message.error("homwOwner is not selected");
      return;
    }
    homeOwnerChangeStatus(
      { id: tableSelectedIds.homeOwnerSelectedId, payload: { is_active } },
      {
        onSuccess: () => {
          // message.success("Home owner status changed"),
          setModals((prev: any) => ({ ...prev, homeOwnerStatus: false })),
            setTableSelectedIds((perv: any) => ({ ...perv, homeOwnerSelectedId: null }))
        }
      }
    );
  };
  interface DetailItem {
    key: string;
    type: React.ReactNode;
    detail: React.ReactNode;
  }

  const columns: TableColumnsType<DetailItem> = [
    { title: t("Type"), dataIndex: "type", width: 500 },
    { title: t("Details"), dataIndex: "detail" },
  ];

  const data: DetailItem[] = [
    {
      key: "1",
      type: <Text className="text-gray">{t("Full Name")}</Text>,
      detail: <Text>{homeOwnerdetial?.full_name}</Text>,
    },
    {
      key: "2",
      type: <Text className="text-gray">{t("Email Address")}</Text>,
      detail: <Text>{homeOwnerdetial?.email}</Text>,
    },
    {
      key: "3",
      type: <Text className="text-gray">{t("Phone Number")}</Text>,
      detail: <Text>{homeOwnerdetial?.phone_number}</Text>,
    },
    {
      key: "4",
      type: <Text className="text-gray">{t("Short Address")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.short_address}</Text>,
    },
    {
      key: "5",
      type: <Text className="text-gray">{t("City")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.city}</Text>,
    },
    {
      key: "6",
      type: <Text className="text-gray">{t("District")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.district}</Text>,
    },
    {
      key: "7",
      type: <Text className="text-gray">{t("Street")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.street}</Text>,
    },
    {
      key: "8",
      type: <Text className="text-gray">{t("Postal Code")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.postal_code}</Text>,
    },
    {
      key: "9",
      type: <Text className="text-gray">{t("Building #")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.building_number}</Text>,
    },
    {
      key: "10",
      type: <Text className="text-gray">{t("ID Type & Number")}</Text>,
      detail: <Text>not found</Text>,
    },
    {
      key: "11",
      type: <Text className="text-gray">{t("Secondary Number")}</Text>,
      detail: <Text>{homeOwnerdetial?.address?.secondary_building_number}</Text>,
    },
    {
      key: "12",
      type: <Text className="text-gray">{t("Preferred Location")}</Text>,
      detail: <Text>{homeOwnerdetial?.installation_location_preference}</Text>,
    },
    {
      key: "13",
      type: <Text className="text-gray">{t("Instruction")}</Text>,
      detail: <Text>{homeOwnerdetial?.installation_access_instruction}</Text>,
    },
  ];

  return (
    <>
      <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <BreadCrumb
          items={[
            { title: t("Client Management") },
            { title: t("Home Owners") },
            { title: homeOwnerdetial?.full_name || "" },
          ]}
        />

        <Card className="card-cs radius-12 border-gray h-100">
          <Flex align="center" justify="space-between" className="mb-4">
            <Flex align="center" gap={5}>
              <Button
                className="border-0 p-0 bg-transparent"
                onClick={() => navigate("/homeowners")}
              >
                {isRTL ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
              </Button>
              <Title level={4} className="fw-500 m-0">
                ID . {homeOwnerdetial?.full_name}
              </Title>
              {details?.subscriptionplane === "active" ? (
                <Text className="btnpill fs-12 success py-1">
                  {t("Active")}
                </Text>
              ) : (
                <Text className="btnpill fs-12 inactive py-1">
                  {t("Inactive")}
                </Text>
              )}
            </Flex>
            {homeOwnerdetial?.is_active ? (
              <Button
                className="btncancel bg-red text-white"
                onClick={() => {
                  setModals(prev => ({ ...prev, homeOwnerStatus: true }));
                  setTableSelectedIds(prev => ({ ...prev, homeOwnerSelectedId: homeOwnerdetial.id }));
                }}
              >
                {t("Inactive Account")}
              </Button>
            ) : (
              <Button
                className="btncancel bg-green text-white"
                onClick={() => {
                  setModals(prev => ({ ...prev, homeOwnerStatus: true }));
                  setTableSelectedIds(prev => ({ ...prev, homeOwnerSelectedId: homeOwnerdetial.id }));
                }}
              >
                {t("Active Account")}
              </Button>
            )}

          </Flex>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              {/* Custom Image Preview */}
              <div
                style={{
                  position: "relative",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "200px", position: "relative" }}>
                  <img
                    src={homeOwnerdetial?.installation_qbox_image_url}
                    alt="Package"
                    style={{
                      width: "100%",

                      // objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />

                  <div
                    onClick={() => setPreviewOpen(true)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "10px",
                      background: "rgba(255, 255, 255, 0.4)",
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "3px 6px",
                      cursor: "pointer",
                    }}
                  >
                    <ExpandOutlined
                      style={{ fontSize: "16px", color: "#000" }}
                    />
                  </div>
                </div>
              </div>

              <Modal
                open={previewOpen}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
                closeIcon={
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.4)",
                      position: "relative",
                      borderRadius: "20%",
                      top: 0,
                      right: 0,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <CloseOutlined
                      style={{ color: "black", fontSize: "18px" }}
                    />
                  </div>
                }
                centered
                bodyStyle={{ padding: 0 }}
              >
                <img
                  src={details?.qboximage}
                  style={{
                    width: "100%",
                    height: "380px",
                    marginTop: "25px",
                    borderRadius: "5px",
                  }}
                />
              </Modal>
            </Col>

            <Col span={24}>
              <Table<DetailItem>
                size="large"
                columns={columns}
                dataSource={data}
                className="pagination table-cs table"
                showSorterTooltip={false}
                scroll={{ x: 500 }}
                rowHoverable={false}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>
      </Flex>

      <ConfirmModal
        visible={modals.homeOwnerStatus}
        title={homeOwnerdetial?.is_active ? t("Inactivate Staff") : t("Activate Staff")}
        desc={
          homeOwnerdetial?.is_active
            ? t("Are you sure you want to inactivate this staff?")
            : t("Are you sure you want to activate this staff?")

        }
        onClose={() => {
          setModals((prev) => ({ ...prev, homeOwnerStatus: false }));
          setTableSelectedIds((prev) => ({ ...prev, homeOwnerSelectedId: null }));
        }}
        onConfirm={() => changeStatus(true)}
      />
      {/* <ActiveModal
        visible={modals.homeOwnerStatus}
        title={t("Activate Account")}
        desc={t("Are you sure you want to active this account?")}
        onClose={() => {
          setModals((prev) => ({ ...prev, homeOwnerStatus: false }));
          setTableSelectedIds((prev) => ({ ...prev, homeOwnerSelectedId: null }));
        }}
        onConfirm={() => changeStatus(false)}
      /> */}
    </>
  );
};

export { HomeOwnersDetails };
