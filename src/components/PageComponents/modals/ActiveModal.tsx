
import { Modal, Flex, Button, Typography, Divider } from "antd"
const {Text, Title} = Typography;
import { useTranslation } from "react-i18next";
import i18n from "../../../sources/i18n";
interface ActiveModalProps {
  visible: boolean;
  onClose: () => void;
  title:string,
  desc:string
}

const ActiveModal: React.FC<ActiveModalProps> = ({visible, onClose, title, desc}) => {
  const {t} = useTranslation();
    const isRTL = i18n.language === "ar";
  
   
  return (
    <Modal
        title={null}
        open={visible}
        onCancel={onClose}
         style={{ direction: isRTL ? "rtl" : "ltr" }}
        centered
        footer={
            <Flex justify='center' gap={5}>
                <Button  onClick={onClose} className='btncancel text-black border-gray' >
                    {t('Cancel')}
                </Button>
                <Button className={`btnsave border-0 text-white bg-slate-blue`}>
                    {t('Confirm')}
                </Button>
            </Flex>
        }
      > 

        <Flex vertical align='center' className='mt-3' gap={10}>
            <img src='/assets/icons/active.png' width={50} alt='bin icon' fetchPriority="high" />
            <Title level={5} className='m-0'>
                {title}
            </Title>
            <Text className='fs-14 text-center'>
             {desc}
            </Text>
        </Flex>
        <Divider className='my-2 bg-light-brand' />
    </Modal>
  )
}

export {ActiveModal} 
