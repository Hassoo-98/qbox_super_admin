import { Flex } from "antd";
import {
  BreadCrumb,
  ChangePasswordSetting,
  GeneralSetting,
} from "../../components";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";

const SettingPage = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";


  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb
          items={[{ title: t("Admin Setting") }, { title: t("Settings") }]}
        />
        <GeneralSetting />
        <ChangePasswordSetting />
      </Flex>
    </div>
  );
};

export { SettingPage };
