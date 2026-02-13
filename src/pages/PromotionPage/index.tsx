import {  Flex } from "antd";
import { BreadCrumb,  } from "../../components";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";
import { PromotionTable } from "../../components/SystemManagementComponent/PromotionComponent/structure";
const PromotionPage = () => {
  const { t } = useTranslation();
     const isRTL = i18n.language === "ar";

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb items={[
                    {title:t('System Management')},
                    {title:t('Promotions')}
                ]}/>
        <PromotionTable />
      </Flex>
    </div>
  );
};

export { PromotionPage };
