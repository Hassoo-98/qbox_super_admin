import { Flex } from "antd"
import { BreadCrumb, HomeOwnersTable } from "../../components"

const HomeOwnersPage = () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <BreadCrumb items={[
            {title:'Client Management'},
            {title:'Home Owners'}
        ]}/>
        <HomeOwnersTable/>
      </Flex>
    </div>
  )
}

export {HomeOwnersPage}
