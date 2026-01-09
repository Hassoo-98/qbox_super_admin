import { Flex } from "antd"
import { useTranslation } from "react-i18next"
import { BreadCrumb, RolePermissionTable } from "../../components"
import i18n from "../../sources/i18n"
const RolePermissionPage = () => {
    const {t} = useTranslation()
    const isRTL = i18n.language === "ar";
    
       
  return (
    <>
       <Flex vertical gap={20}  style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <BreadCrumb items={[
                    {title:t('System Management')},
                    {title:t('Role & Permissions')}
                ]}/>
                <RolePermissionTable/>
            </Flex>
    </>
  )
}

export {RolePermissionPage}
