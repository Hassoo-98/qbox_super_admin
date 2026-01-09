import { Flex } from "antd";
import { AllQboxesTable, BreadCrumb } from "../../components";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";

const AllqboxesPage = () => {
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation();
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex vertical gap={20}>
        <BreadCrumb
          items={[{ title: t("QBox Management") }, { title: t("All QBoxes") }]}
        />
        <AllQboxesTable />
      </Flex>
    </div>
  );
};

export { AllqboxesPage };
