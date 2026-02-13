import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Image, Row, Typography } from "antd";
import { useNavigate, } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BreadCrumb } from "../../../PageComponents";
import { ProviderActivityTable } from "../../../ShippingManagementComponents";
import { useGlobalContext } from "../../../../context/globalContext";
import { useQueryClient } from "@tanstack/react-query";
import type { PackageItem, CrudQboxResponse } from "../../../../types/AllQboxTypes";
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
const QboxSingleViewAllPackages = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  const querClient = useQueryClient();

  const { tableSelectedIds: { packageSelectedId, qboxSelectedId } } = useGlobalContext();
  const lastqbox = querClient.getQueryData<CrudQboxResponse>(["single-qbox", qboxSelectedId]);
  const selectedPackage = lastqbox?.data?.packages?.find(
    (pkg: PackageItem) => pkg.id === packageSelectedId
  );
  const cardData = [
    {
      icon: "/assets/icons/pkg.webp",
      title: selectedPackage?.details?.package_type,
      subtitle: t("Package Type"),
    },
    {
      icon: "/assets/icons/amount.webp",
      title: "SAR 200",
      subtitle: t("Item Value"),
    },
    {
      icon: "/assets/icons/kg.webp",
      title: selectedPackage?.details?.package_weight,
      subtitle: t("Package Weight"),
    },
  ];

  const isRTL = i18n.language === "ar";

  return (
    <>
      <Flex vertical gap={10}
        style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <BreadCrumb
          items={[
            { title: t("QBox Management") },
            { title: qboxSelectedId, to: `/` },
            { title: selectedPackage?.tracking_id },
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
                    {selectedPackage?.tracking_id}
                  </Title>
                </Flex>
                <Flex gap={5}>
                  <Text
                    className={`sm-pill radius-20 fs-12 text-white ${statusColors[selectedPackage?.package_type ?? ""] ||
                      "bg-delivery-failed"
                      }`}
                  >
                    {selectedPackage?.package_type}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Row gutter={[24, 24]}>
              <Col span={24} lg={9} xl={9}>
                <Flex vertical gap={15}>
                  <Text className="fs-15 fw-500">{t("Package Image")}</Text>
                  <img
                    src={selectedPackage?.img}
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
                      {selectedPackage?.package_type === "Incoming" ? (
                        <Text className="sm-pill sky-status radius-12 fs-12">
                          {selectedPackage?.package_type}
                        </Text>
                      ) : selectedPackage?.package_type === "Send" ? (
                        <Text className="sm-pill radius-12 fs-12 bg-light-yellow text-brown">
                          {selectedPackage?.package_type}
                        </Text>
                      ) : (
                        <Text className="sm-pill radius-12 fs-12 inactive">
                          {selectedPackage?.package_type}
                        </Text>
                      )}
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Sender / Platform Name")}
                      </Text>
                      <Text className="fs-13">{selectedPackage?.merchant_name}</Text>
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Courier / Service Provider")}
                      </Text>
                      <Text className="fs-13">{selectedPackage?.service_provider}</Text>
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">
                        {t("Driver Name")}
                      </Text>
                      <Text className="fs-13">{selectedPackage?.driver_name}</Text>
                    </Flex>
                    <Flex align="center" gap={10} justify="space-between">
                      <Text className="text-gray fs-13">{t("QR Code")}</Text>
                      <Text className="fs-13">{selectedPackage?.qr_code}</Text>
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
                     {selectedPackage?.details?.summary}
                    </Text>
                  </Flex>
                </Flex>
              </Col>
              <Col span={24} lg={14} xl={15}>
                <Flex vertical gap={15}>
                  <Text className="fs-15 fw-500">{t("Activity Log")}</Text>
                  <ProviderActivityTable />
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

export { QboxSingleViewAllPackages };
