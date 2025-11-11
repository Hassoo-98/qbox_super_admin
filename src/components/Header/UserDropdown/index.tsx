
import { Avatar, Button, Card, Dropdown, Flex, Space, Typography} from "antd";
import { DownOutlined } from '@ant-design/icons';
  const dropdownContent = (
    <Card className='radius-12 shadow-c card-cs'>
      <Space direction='vertical'> 
        <Flex align='center' gap={10}>
          <Avatar size={44} src='/assets/images/admin.png' />
          <Flex vertical gap={1}>
            <Typography.Text strong className='fs-13'>Abdulllah</Typography.Text>
            <Typography.Text className='text-gray fs-13'>Admin</Typography.Text>
          </Flex>
        </Flex>
        <Button className='btnsave w-100'
          type='primary' 
          >
            Logout
        </Button>
      </Space>
    </Card>
);
const UserDropdown = () => {
  return (
    <div>
      <Dropdown
          popupRender={()=>dropdownContent}
          trigger={['click']}
          className='p-0'
      >
        <Flex align='center' gap={5} className='cursor'>
          <Avatar size={44} src='/assets/images/admin.png' />
          <Flex align='flex-start' gap={5}>
            <Flex vertical gap={0} align='end'>
              <Typography.Text strong className='fs-12'>Abdullah </Typography.Text>
              <Typography.Text className='text-gray fs-12'>Admin</Typography.Text>
            </Flex>
            <DownOutlined className='fs-12 py-1' />
          </Flex>
        </Flex>
      </Dropdown>
    </div>
  )
}

export {UserDropdown}
