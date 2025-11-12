
import { Modal, Flex, Button, Typography, Divider } from "antd"
const {Text, Title} = Typography;

interface ActiveModalProps {
  visible: boolean;
  onClose: () => void;
}

const ActiveModal: React.FC<ActiveModalProps> = ({visible, onClose}) => {
  return (
    <Modal
        title={null}
        open={visible}
        onCancel={onClose}
        centered
        footer={
            <Flex justify='center' gap={5}>
                <Button  onClick={onClose} className='btncancel text-black border-gray' >
                    Cancel
                </Button>
                <Button className={`btnsave border-0 text-white bg-slate-blue`}>
                    Confirm
                </Button>
            </Flex>
        }
      > 

        <Flex vertical align='center' className='mt-3' gap={10}>
            <img src='/assets/icons/active.png' width={50} alt='bin icon' fetchPriority="high" />
            <Title level={5} className='m-0'>
                Activate Account 
            </Title>
            <Text className='fs-14 text-center'>
              Are you sure you want to active this account?
            </Text>
        </Flex>
        <Divider className='my-2 bg-light-brand' />
    </Modal>
  )
}

export {ActiveModal} 
