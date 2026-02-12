import { useState } from "react";
import {
  Card,
  Flex,
  Button,
  Typography,
  Image,
  Segmented,
  Row,
  Col,
} from "antd";
import { BreadCrumb } from "../../../PageComponents";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AllPackagesTable, QRHistoryTable } from "../tabcontents";
// import { allboxesData } from "../../../../data";
import { useTranslation } from "react-i18next";
import { useQbox } from "../../../../hooks/useQbox";
const { Title, Text } = Typography;
const ViewQboxDeatils = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  // const { id } = useParams();
  // const details = allboxesData?.find((list) => list?.key === Number(id));
  const [view, setView] = useState<string>("All Packages");
  const isRTL = i18n.language === "ar";
  const { Qbox } = useQbox();
  const QboxData = Qbox?.data;
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb
          items={[{ title: t("QBox Management") }, { title: QboxData?.qbox_id }]}
        />
        <Card className="radius-12 border-gray card-cs h-100">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Flex vertical gap={20} justify="center">
                <Flex align="center" gap={10}>
                  <Button
                    className="border-0 p-0 bg-transparent"
                    onClick={() => navigate("/allqboxes")}
                  >
                    {isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                  </Button>
                  <Title level={4} className="fw-500 m-0">
                    {/* {t("QBox ID")} */}
                    {QboxData?.qbox_id}
                  </Title>
                  {
                    QboxData?.status === "Online" ? (
                      <Text className="btnpill fs-12 py-1 success">{t("Online")}</Text>
                    ) : QboxData?.status === "Offline" ? (
                      <Text className="btnpill fs-12 py-1 inactive">{t("Offline")}</Text>
                    ) : (
                      <Text className="btnpill fs-12 py-1 pending">{t("Error")}</Text>
                    )
                  }
                  <Text className="btnpill fs-12 bg-light-gray py-1">
                    {t("Locker Open")}
                  </Text>
                </Flex>
                <Flex align="center" gap={10}>
                  <Flex align="center" gap={7}>
                    <Image
                      src="/assets/icons/user.png"
                      preview={false}
                      width={18}
                    />
                    <Text className="pt-1">{QboxData?.homeowner_name_snapshot}</Text>
                  </Flex>
                  <Flex align="center" gap={7}>
                    <Image
                      src="/assets/icons/phone.png"
                      preview={false}
                      width={18}
                    />
                    <Text className="pt-1">Phone Number</Text>
                  </Flex>
                  <Flex align="center" gap={7}>
                    <Image
                      src="/assets/icons/world.png"
                      preview={false}
                      width={18}
                    />
                    <Text className="pt-1">{QboxData?.short_address_snapshot}</Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Segmented
                    options={[
                      { label: t("All Packages"), value: "All Packages" },
                      { label: t("QR History"), value: "QR History" },
                    ]}
                    value={view}
                    onChange={(val) => setView(val as string)}
                    className="custom-segment"
                  />
                </Flex>
              </Flex>
            </Col>
            <Col span={24}>
              {view === "All Packages" && <AllPackagesTable packagesData={QboxData?.packages ?? []} />}
              {view === "QR History" && <QRHistoryTable />}
            </Col>
          </Row>
        </Card>
      </Flex>
    </div>
  );
};

export { ViewQboxDeatils };
