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
      detail: <Text>{details?.homeownername}</Text>,
    },
    {
      key: "2",
      type: <Text className="text-gray">{t("Email Address")}</Text>,
      detail: <Text>{details?.email}</Text>,
    },
    {
      key: "3",
      type: <Text className="text-gray">{t("Phone Number")}</Text>,
      detail: <Text>{details?.phonenumber}</Text>,
    },
    {
      key: "4",
      type: <Text className="text-gray">{t("Short Address")}</Text>,
      detail: <Text>{details?.shortaddress}</Text>,
    },
    {
      key: "5",
      type: <Text className="text-gray">{t("City")}</Text>,
      detail: <Text>{details?.city}</Text>,
    },
    {
      key: "6",
      type: <Text className="text-gray">{t("District")}</Text>,
      detail: <Text>{details?.district}</Text>,
    },
    {
      key: "7",
      type: <Text className="text-gray">{t("Street")}</Text>,
      detail: <Text>{details?.street}</Text>,
    },
    {
      key: "8",
      type: <Text className="text-gray">{t("Postal Code")}</Text>,
      detail: <Text>{details?.postalcode}</Text>,
    },
    {
      key: "9",
      type: <Text className="text-gray">{t("Building #")}</Text>,
      detail: <Text>{details?.building}</Text>,
    },
    {
      key: "10",
      type: <Text className="text-gray">{t("ID Type & Number")}</Text>,
      detail: <Text>{details?.idtypenumber}</Text>,
    },
    {
      key: "11",
      type: <Text className="text-gray">{t("Secondary Number")}</Text>,
      detail: <Text>{details?.secondarynumber}</Text>,
    },
    {
      key: "12",
      type: <Text className="text-gray">{t("Preferred Location")}</Text>,
      detail: <Text>{details?.preferdlocation}</Text>,
    },
    {
      key: "13",
      type: <Text className="text-gray">{t("Instruction")}</Text>,
      detail: <Text>{details?.instruction}</Text>,
    },
  ];

  return (
    <>
      <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <BreadCrumb
          items={[
            { title: t("Client Management") },
            { title: t("Home Owners") },
            { title: details?.homeownername || "" },
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
                ID . {details?.homeownername}
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
            {details?.accountstatus === "active" ? (
              <Button
                className="btncancel bg-red text-white"
                onClick={() => setInactiveStatus(true)}
              >
                {t("Inactive Account")}
              </Button>
            ) : (
              <Button
                className="btncancel bg-green text-white"
                onClick={() => setActiveStatus(true)}
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
                    src={details?.qboximage}
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
        visible={inactivestatus}
        title={t("Inactivate Account")}
        desc={t("Are you sure you want to inactive this account?")}
        onClose={() => setInactiveStatus(false)}
      />
      <ActiveModal
        visible={activestatus}
        title={t("Activate Account")}
        desc={t("Are you sure you want to active this account?")}
        onClose={() => setActiveStatus(false)}
      />
    </>
  );
};

export { HomeOwnersDetails };
