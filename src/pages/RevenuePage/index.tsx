import { Card, Flex, Tabs, Typography } from "antd";
import {
  BreadCrumb,
  CommissionBaseRevenueTable,
  ModuleTopHeading,
  SubscriptionBaseRevenueTable,
} from "../../components";
import { useTranslation } from "react-i18next";
import { subscriptionTitle } from "../../shared";
import { useState } from "react";
import i18n from "../../sources/i18n";

const { Text } = Typography;
const RevenuePage = () => {
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation();
  const title = subscriptionTitle(t);
  const [activeKey, setActiveKey] = useState("1");
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  const items = [
    {
      key: "1",
      label: t("Subscription based Revenue"),
      children: <SubscriptionBaseRevenueTable />,
    },
    {
      key: "2",
      label: t("Commission based Revenue"),
      children: <CommissionBaseRevenueTable />,
    },
  ];

  const currentContent = items.find((item) => item.key === activeKey)?.children;
  return (
    <div>
      <Flex vertical gap={15} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <BreadCrumb items={[{ title: title }, { title: t("Revenue") }]} />
        <Card className="radius-12 border-gray card-cs h-100">
          <Flex vertical gap={20}>
            <Flex vertical>
              <ModuleTopHeading level={5} name={t("Revenue")} />
              <Text className="text-gray fs-13">
                {t("Manage all the revenue generated in your system")}
              </Text>
            </Flex>
            <Tabs
              defaultActiveKey="1"
              items={items.map(({ key, label }) => ({
                key,
                label,
              }))}
              onChange={onChange}
              className="tab-fill"
            />

            {currentContent}
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export { RevenuePage };
