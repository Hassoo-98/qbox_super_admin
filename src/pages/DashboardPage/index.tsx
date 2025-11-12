import { Flex } from "antd"
import { RececentQboxRequestTable, TotalReportCards } from "../../components"

const DashboardPage = () => {
  
    return (
        <div>
            <Flex vertical gap={24}>
                <TotalReportCards />
                <RececentQboxRequestTable/>
            </Flex>
        </div>
    )
}

export { DashboardPage }
