import { Flex } from "antd"
import { AllShipmentsTable, BreadCrumb } from "../../components"
import { useTranslation } from "react-i18next"
import i18n from "../../sources/i18n"
const AllShipmentsPage = () => {
    const {t} = useTranslation();
     const isRTL = i18n.language === "ar";
      
  return (
    <div  style={{ direction: isRTL ? "rtl" : "ltr" }}>
       <Flex vertical gap={20}>
        <BreadCrumb items={[
            {title:t('Finance & Shipping Management')},
            {title:t('All Shipments')}
        ]}/>
        <AllShipmentsTable/>
      </Flex>
    </div>
  )
}

export {AllShipmentsPage} 
