import {
  ArrowLeftOutlined,
  ExpandOutlined,
  CloseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Modal, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOwnerDetailTable } from "./HomeOwnerDetailTable";
import { BreadCrumb, ConfirmModal } from "../../../PageComponents";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { useInstallment } from "../../../../hooks/useInstallment";
import { useGlobalContext } from "../../../../context/globalContext";
import { useHomeowner } from "../../../../hooks/useHomeOwner";
const { Title } = Typography;
const SingleViewHomeOwnerDetail = () => {
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { t } = useTranslation();
  const {installmentView,} = useInstallment();
  const detials  = installmentView?.data
  const {modals, setModals, tableSelectedIds, setTableSelectedIds } = useGlobalContext();
  const {homeOwnerChangeStatus} = useHomeowner();
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
          setModals((prev: any) => ({ ...prev, statusModal: false })),
            setTableSelectedIds((perv: any) => ({ ...perv, homeOwnerSelectedId: null }))
        }
      }
    );
  };
  return (
    <>
    <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <BreadCrumb
        items={[
          { title: t("QBox Management") },
          { title: t("Installment Pending") },
          { title: `${detials?.homeowner?.full_name}` },
        ]}
      />
      <Card className="card-bg card-cs radius-12 border-gray">
        <Flex vertical gap={20}>
          <Flex gap={10} align="center" justify="space-between">
            <Flex gap={10} align="center">
              <Button
                className="border-0 p-0 text-brand bg-transparent"
                onClick={() => navigate("/installmentpending")}
              >
             {isRTL ? <ArrowRightOutlined/> :    <ArrowLeftOutlined />}
              </Button>
              <Title level={5} className="fw-500 m-0">
                #{detials?.homeowner?.qboxes[0]?.qbox_id} {detials?.homeowner?.full_name}
              </Title>
              {detials?.homeowner?.is_active && (
                <Tag
                  className={`sm-pill radius-20 fs-12 border-0 ${
                    detials?.homeowner?.is_active
                      ? t("success")
                      : t("inactive")
                  }`}
                >
                  {detials?.homeowner?.is_active ? "Active" : "Inactive"}
                </Tag>
              )}
            </Flex>
            {
              detials?.homeowner?.is_active ? (
                 <Button className="btncancel bg-red text-white" onClick={() => {
                  setModals(prev => ({ ...prev, homeOwnerStatus: true }));
                  setTableSelectedIds(prev => ({ ...prev, homeOwnerSelectedId: detials?.homeowner?.id ?? null }));
                }}>
              {t("Inactivate Account")}
            </Button>
              ):(
                 <Button className="btncancel  bg-green text-white" 
                 onClick={() => {
                  setModals(prev => ({ ...prev, homeOwnerStatus: true }));
                  setTableSelectedIds(prev => ({ ...prev, homeOwnerSelectedId: detials?.homeowner?.id ?? null }));
                }}
                 >
              {t("Active Account")}
            </Button>
              )
            }
           
          </Flex>
          <Flex vertical gap={5} justify="center" align="center">
            {/* <Image
                            src={detials?.homeowner?.installation_qbox_image_url}
                            alt="home owner image"
                            className='radius-12 mxw-mxh'
                            fetchPriority="high"
                        /> */}
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
                  src={detials?.homeowner?.installation_qbox_image_url}
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
                  <ExpandOutlined style={{ fontSize: "16px", color: "#000" }} />
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
                  <CloseOutlined style={{ color: "black", fontSize: "18px" }} />
                </div>
              }
              centered
              bodyStyle={{ padding: 0 }}
            >
              <img
                src={detials?.homeowner?.installation_qbox_image_url}
                style={{
                  width: "100%",
                  height: "380px",
                  marginTop: "25px",
                  borderRadius: "5px",
                }}
              />
            </Modal>
          </Flex>
          <HomeOwnerDetailTable detials={detials} />
        </Flex>
      </Card>
    </Flex>
    <ConfirmModal
        visible={modals.homeOwnerStatus}
        img={detials?.homeowner?.is_active ? 'active.png' : 'inactive.png'}
        title={detials?.homeowner?.is_active ? t("Inactivate Home Owner") : t("Activate Home Owner")}
        desc={
          detials?.homeowner?.is_active
            ? t("Are you sure you want to inactivate this home owner?")
            : t("Are you sure you want to activate this home owner?")

        }
        onClose={() => {
          setModals((prev) => ({ ...prev, homeOwnerStatus: false }));
          setTableSelectedIds((prev) => ({ ...prev, homeOwnerSelectedId: null }));
        }}
        onConfirm={() => changeStatus(true)}
      />
    </>
  );
};

export { SingleViewHomeOwnerDetail };
