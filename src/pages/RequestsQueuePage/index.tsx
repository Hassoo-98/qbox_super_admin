import { useState } from "react";
import { Card, Flex, Row, Col, Typography, Segmented } from "antd";
import {
  AccountApprovalRequestsTable,
  BreadCrumb,
  ModuleTopHeading,
  RelocationApprovalRequestsTable,
} from "../../components";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";
const { Text } = Typography;
const RequestsQueuePage = () => {
  const isRTL = i18n.language === "ar";

  const { t } = useTranslation();
  const [view, setView] = useState<string>("Account Approval Requests");
  return (
    <>
      <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <BreadCrumb
          items={[
            { title: t("Client Management") },
            { title: t("Requests Queues") },
          ]}
        />
        <Card className="radius-12 border-gray card-cs h-100">
          <Row gutter={[16, 24]}>
            <Col span={24}>
              <Flex vertical gap={10}>
                <Flex vertical>
                  <ModuleTopHeading level={5} name={t("Requests Queue")} />
                  <Text className="text-gray fs-13">
                    {t("Manage all the requests in your system")}
                  </Text>
                </Flex>
                <Flex>
                  <Segmented
                    options={[
                      t("Account Approval Requests"),
                      t("Relocation Approval Requests"),
                    ]}
                    value={view}
                    onChange={(val) => setView(val as string)}
                    className="custom-segment"
                  />
                </Flex>
              </Flex>
            </Col>
            <Col span={24}>
              {view === t("Account Approval Requests") && (
                <AccountApprovalRequestsTable />
              )}

              {view === t("Relocation Approval Requests") && (
                <RelocationApprovalRequestsTable />
              )}
            </Col>
          </Row>
        </Card>
      </Flex>
    </>
  );
};

export { RequestsQueuePage };
