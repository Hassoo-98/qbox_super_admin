import { Flex } from "antd";
import { BreadCrumb, SubscriptionTable } from "../../components";
import { useTranslation } from "react-i18next";
import { subscriptionTitle } from "../../shared";
import i18n from "../../sources/i18n";

const SubscriptionManagementPage = () => {
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation();

  const title = subscriptionTitle(t);
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb
          items={[{ title: title }, { title: t("Subscription Management") }]}
        />
        <SubscriptionTable />
      </Flex>
    </div>
  );
};

export { SubscriptionManagementPage };
