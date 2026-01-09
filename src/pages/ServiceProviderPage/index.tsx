import { Flex } from "antd";
import { BreadCrumb, ServiceProviderTable } from "../../components";
import { useTranslation } from "react-i18next";
import { shippingTitle } from "../../shared";
import i18n from "../../sources/i18n";
const ServiceProviderPage = () => {
  const { t } = useTranslation();
     const isRTL = i18n.language === "ar";
    

  const title = shippingTitle(t);
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb
          items={[{ title: title }, { title: t("Service Providers") }]}
        />
        <ServiceProviderTable />
      </Flex>
    </div>
  );
};

export { ServiceProviderPage };
