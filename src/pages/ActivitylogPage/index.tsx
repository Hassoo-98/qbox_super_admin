import { Flex } from "antd"
import { ActivitylogTable, BreadCrumb } from "../../components"
import { useTranslation } from "react-i18next"

const ActivitylogPage = () => {
    const {t}=useTranslation()
    return (
        <div>
            <Flex vertical gap={20}>
                <BreadCrumb
                    items={[
                        { title: t('Admin Setting') },
                        { title: t('Activity Log') }
                    ]}
                />
                <ActivitylogTable/>
            </Flex>
        </div>
    )
}

export { ActivitylogPage } 
