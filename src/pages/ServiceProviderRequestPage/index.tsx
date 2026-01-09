import { Flex } from "antd"
import { BreadCrumb, ServiceProviderRequestTable } from "../../components"

import { shippingTitle } from "../../shared"
import { useTranslation } from "react-i18next"
import i18n from "../../sources/i18n"
const ServiceProviderRequestPage = () => {
    const {t} = useTranslation()
      const isRTL = i18n.language === "ar";
      

    const title = shippingTitle(t)
    return (
        <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Flex vertical gap={20}>
                <BreadCrumb
                    items={[
                        { title: title },
                        { title: t('Service Providers Requests') }
                    ]}
                />
                <ServiceProviderRequestTable/>
            </Flex>
        </div>
    )
}

export { ServiceProviderRequestPage } 
