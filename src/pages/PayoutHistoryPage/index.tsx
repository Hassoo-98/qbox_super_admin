import { Flex } from "antd"
import { BreadCrumb, PayoutHistoryTable } from "../../components"
import { useTranslation } from "react-i18next"
import i18n from "../../sources/i18n"

const PayoutHistoryPage = () => {
    const {t} = useTranslation()
      const isRTL = i18n.language === "ar";
     

    return (
        <div   style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Flex vertical gap={20}>
                <BreadCrumb
                    items={[
                        { title: t('Payout Management') },
                        { title: t('Payout History') }
                    ]}
                />
                <PayoutHistoryTable />
            </Flex>
        </div>
    )
}

export { PayoutHistoryPage } 
