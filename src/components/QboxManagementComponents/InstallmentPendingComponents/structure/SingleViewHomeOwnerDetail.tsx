import {
  ArrowLeftOutlined,
  ExpandOutlined,
  CloseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Modal, Tag, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { installmentpendingData } from "../../../../data";
import { HomeOwnerDetailTable } from "./HomeOwnerDetailTable";
import { BreadCrumb } from "../../../PageComponents";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";


const { Title } = Typography;
const SingleViewHomeOwnerDetail = () => {
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { id } = useParams();
  const details = installmentpendingData?.find(
    (list) => list?.key === Number(id)
  );
  const { t } = useTranslation();

  return (
    <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <BreadCrumb
        items={[
          { title: t("QBox Management") },
          { title: t("Installment Pending") },
          { title: `${details?.homeownerName}` },
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
                #{details?.id} {details?.homeownerName}
              </Title>
              {details?.status && (
                <Tag
                  className={`sm-pill radius-20 fs-12 border-0 ${
                    details.status.toLowerCase() === "active"
                      ? t("success")
                      : t("inactive")
                  }`}
                >
                  {details.status.charAt(0).toUpperCase() +
                    details.status.slice(1).toLowerCase()}
                </Tag>
              )}
            </Flex>
            <Button className="btncancel bg-red text-white">
              {t("Inactivate Account")}
            </Button>
          </Flex>
          <Flex vertical gap={5} justify="center" align="center">
            {/* <Image
                            src={details?.img}
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
                  src={details?.img}
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
                src={details?.img}
                style={{
                  width: "100%",
                  height: "380px",
                  marginTop: "25px",
                  borderRadius: "5px",
                }}
              />
            </Modal>
          </Flex>
          <HomeOwnerDetailTable details={details} />
        </Flex>
      </Card>
    </Flex>
  );
};

export { SingleViewHomeOwnerDetail };
