import { Flex } from "antd";
import { BreadCrumb, HomeOwnersTable } from "../../components";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";
const HomeOwnersPage = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb
          items={[
            { title: t("Client Management") },
            { title: t("Home Owners") },
          ]}
        />
        <HomeOwnersTable />
      </Flex>
    </div>
  );
};

export { HomeOwnersPage };
