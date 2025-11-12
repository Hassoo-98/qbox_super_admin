import { Avatar, Button, Card, Flex, Table, type TableColumnsType } from "antd"
import { ModuleTopHeading } from "../../PageComponents"
import { recentrequestData, type RecentRequestItem } from "../../../data"
const RececentQboxRequestTable = () => {
    const recentColumn: TableColumnsType<RecentRequestItem> =[
        {
            title:'QBox ID',
            dataIndex:'qboxid'
        },
        {
            title:'QBox Image',
            dataIndex:'qboximage',
             render: (qboximage: string) => <Avatar src={qboximage} size={50} shape="square" />,
            width: 100
        },
        {
            title:'Homeowner Name',
            dataIndex:'homeownername'
        },
        {
            title:'Phone Number',
            dataIndex:'phonenumber'
        },
        {
            title:'City',
            dataIndex:'city'
        },
        {
            title:'Short Address',
            dataIndex:'shortaddress'
        },
        {
            title:'Requested Date',
            dataIndex:'requestdate'
        }
    ];
    
  return (
    <Card className='radius-12 border-gray card-cs h-100'>
      <Flex justify='space-between' align='center' className='mb-2'>
        <ModuleTopHeading level={5} name={'Recent QBox Installment Requests'}/>
        <Button className='btncancel brand-bg text-black'>View All</Button>
      </Flex>
      <Flex vertical gap={20}>
        <Table<RecentRequestItem>
          size='large'
          columns={recentColumn}
          dataSource={recentrequestData}
          className='pagination table-cs table'
          showSorterTooltip={false}
          scroll={{ x: 1300 }}
          rowHoverable={false}
          pagination={false}
        />
      </Flex>
    </Card>
  )
}

export {RececentQboxRequestTable} 
