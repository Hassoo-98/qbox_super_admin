import { Flex } from "antd"
import { BreadCrumb, StaffsTable } from "../../components"
import { useTranslation } from "react-i18next"
const StaffsPage = () => {
    const {t} = useTranslation()
    return (
        <div>
            <Flex vertical gap={20}>
                <BreadCrumb items={[
                    {title:t('System Management')},
                    {title:t('Staffs')}
                ]}/>
                <StaffsTable />
            </Flex>
        </div>
    )
}

export {StaffsPage}
