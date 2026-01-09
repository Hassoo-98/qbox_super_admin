import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Flex, Image, Row, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BreadCrumb } from "../../../PageComponents";
import { allpkgproviderData, serviceproviderData } from "../../../../data";
import { ProviderActivityTable } from "./ProviderActivityTable";
import { useState } from "react";
import { VideoModal } from "../modal";

const statusColors: Record<string, string> = {
  "Shipment Created": "bg-shipment",
  "Out for Pickup": "bg-outpickup",
  "Pickup Completed": "bg-pickup-completed",
  "Out for Delivery": "bg-outdelivery",
  "Pickup Failed": "bg-pickup-failed",
  "Issue Logged": "bg-issue-logged",
  "Delivery Completed": "bg-delivery-completed",
  "Delivery Failed": "bg-delivery-failed",
};

const { Text, Title } = Typography;
const SingleViewAllPackages = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const details = allpkgproviderData?.find((list) => list?.key === Number(id));
  const parentid = serviceproviderData?.find(
    (list) => list?.key === Number(id)
  );

  const cardData = [
    {
      icon: "/assets/icons/pkg.webp",
      title: "Electronics",
      subtitle: t("Package Type"),
    },
    {
      icon: "/assets/icons/amount.webp",
      title: "SAR 200",
      subtitle: t("Item Value"),
    },
    {
      icon: "/assets/icons/kg.webp",
      title: "1 kg",
      subtitle: t("Package Weight"),
    },
  ];

  return (
    <>
      <Flex vertical gap={10}>
        <BreadCrumb
          items={[
            { title: t("Business Management") },
            { title: t("Service Providers"), to: `/serviceproviders` },
            {
              title: t("Detail View Service Providers"),
              to: `/serviceproviders/view/${parentid?.key}`,
            },
            { title: `${details?.trackingID}` },
          ]}
        />
        <Card className="card-bg card-cs radius-12 border-gray">
          <Flex vertical gap={30}>
            <Flex justify="space-between" gap={10}>
              <Flex gap={10} align="center">
                <Flex gap={10} align="center">
                  <Button
                    className="border-0 p-0 bg-transparent"
                    onClick={() => navigate(-1)}
                  >
                    {isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                  </Button>
                  <Title level={5} className="fw-500 m-0">
                    {details?.trackingID}
                  </Title>
                </Flex>
                <Flex gap={5}>
                  <Text
                    className={`sm-pill radius-20 fs-12 text-white ${
                      statusColors[details?.status ?? ""] ||
                      "bg-delivery-failed"
                    }`}
                  >
                    {details?.status}
                  </Text>
                </Flex>
              </Flex>
              {(details?.status === "Pickup Completed" ||
                details?.status === "Delivery Completed") && (
                <Button
                  className="btnsave border-0 text-white bg-slate-blue"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <Flex gap={10} align="center" className="fs-12">
                    <img
                      src="/assets/icons/video-ic.webp"
                      width={20}
                      alt="camera image"
                      fetchPriority="high"
                    />
                    {t("View Recording")}
                  </Flex>
                </Button>
              )}
            </Flex>
            <Row gutter={[24, 24]}>
              <Col span={24} lg={8} xl={7}>
                <Flex vertical gap={15}>
                  <Text className="fs-15 fw-500">{t("Package Image")}</Text>
                  <img
                    src={details?.img}
                    alt="provider image"
                    className="radius-12 object-cover w-100 border-gray"
                    fetchPriority="high"
                    height={300}
                  />
                  <Flex vertical gap={5}>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Package Type")}
                      </Text>
                      {details?.packageType === "Incoming" ? (
                        <Text className="sm-pill sky-status radius-12 fs-12">
                          {details?.packageType}
                        </Text>
                      ) : details?.packageType === "Send" ? (
                        <Text className="sm-pill radius-12 fs-12 bg-light-yellow text-brown">
                          {details?.packageType}
                        </Text>
                      ) : (
                        <Text className="sm-pill radius-12 fs-12 inactive">
                          {details?.packageType}
                        </Text>
                      )}
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Sender / Platform Name")}
                      </Text>
                      <Text className="fs-13">{details?.senderName}</Text>
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Courier / Service Provider")}
                      </Text>
                      <Text className="fs-13">{t("XYZ Providers")}</Text>
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Driver Name")}
                      </Text>
                      <Text className="fs-13">{details?.driverName}</Text>
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">{t("QR Code")}</Text>
                      <Text className="fs-13">{details?.qrCode}</Text>
                    </Flex>
                  </Flex>
                  <Text className="fs-15 fw-500">{t("What inside")}</Text>
                  <Row gutter={[12, 12]}>
                    {cardData?.map((item, i) => (
                      <Col span={24} lg={{ span: 8 }} key={i}>
                        <Card className="brand-bg card-10 radius-12 h-100">
                          <Flex vertical gap={5}>
                            <Image
                              src={item?.icon}
                              width={24}
                              alt={item?.title}
                              fetchPriority="high"
                              preview={false}
                            />
                            <Flex vertical gap={0}>
                              <Text className="text-gray fs-11">
                                {item?.subtitle}
                              </Text>
                              <Text className="fs-13 fw-500">
                                {item?.title}
                              </Text>
                            </Flex>
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Flex vertical gap={8}>
                    <Text className="fs-15 fw-500">
                      {t("Package Description")}
                    </Text>
                    <Text className="text-gray">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, 
                    </Text>
                  </Flex>
                  {details?.packageType === "Send" && (
                    <>
                      <Text className="fs-15 fw-500">Payment Method</Text>
                      <Flex vertical gap={5}>
                        <Flex align="center" gap={10} justify="space-between">
                          <Text className="text-gray fs-13">
                            Base Delivery Fee
                          </Text>
                          <Text className="fs-13">SAR 30</Text>
                        </Flex>
                        <Flex align="center" gap={10} justify="space-between">
                          <Text className="text-gray fs-13">Package Size</Text>
                          <Text className="fs-13">SAR 5</Text>
                        </Flex>
                        <Flex align="center" gap={10} justify="space-between">
                          <Text className="text-gray fs-13">
                            Delivery Speed (Express)
                          </Text>
                          <Text className="fs-13">SAR 5</Text>
                        </Flex>
                        <Divider className="m-0" />
                        <Flex align="center" gap={10} justify="space-between">
                          <Text className="fw-600 fs-13">Total</Text>
                          <Text className="fs-13 fw-600">SAR 40</Text>
                        </Flex>
                      </Flex>
                    </>
                  )}
                </Flex>
              </Col>
              <Col span={24} lg={16} xl={17}>
                <Flex vertical gap={15}>
                  <Text className="fs-15 fw-500">{t("Activity Log")}</Text>
                  <ProviderActivityTable />
                  {details?.status === "Issue Logged" && (
                    <Flex vertical gap={8}>
                      <Text className="fs-15 fw-500">Issue Logged</Text>
                      <Flex vertical gap={0}>
                        <Text className="text-gray">
                          Issue related to:{" "}
                          <span className="text-red">Driver</span>
                        </Text>
                        <Text className="text-gray">
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, 
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Card>
      </Flex>
      <VideoModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export { SingleViewAllPackages };
