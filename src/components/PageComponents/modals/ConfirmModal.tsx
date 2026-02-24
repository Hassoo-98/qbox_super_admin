import { Modal, Flex, Button, Typography, Divider } from "antd";
import { useTranslation } from "react-i18next";
const { Text, Title } = Typography;
import i18n from "../../../sources/i18n";
import { useGlobalContext } from "../../../context/globalContext";

interface ActiveModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  img:string;
  onConfirm:()=>void
}

const ConfirmModal: React.FC<ActiveModalProps> = ({
  visible,
  onClose,
  title,
  desc,
  img,
  onConfirm
}) => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
      
    
  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
       style={{ direction: isRTL ? "rtl" : "ltr" }}
      centered
      footer={
        <Flex justify="center" gap={5}>
          <Button
            onClick={onClose}
            className="btncancel text-black border-gray"
          >
            {t("Cancel")}
          </Button>
          <Button
            className={
              `btnsave border-0 text-white ` +
              (img === "inactive.png"
                ? "bg-delivery-failed"
                : img === "active.png"
                ? "bg-delivery-completed"
                : "bg-slate-blue")
            }
            onClick={onConfirm}
          >
            {t("Confirm")}
          </Button>
        </Flex>
      }
    >
      <Flex vertical align="center" className="mt-3" gap={10}>
        <img
          src={`/assets/icons/${img || 'active.png'}`}
          width={50}
          alt="action icon"
          fetchPriority="high"
        />
        <Title level={5} className="m-0">
          {title}
        </Title>
        <Text className="fs-14 text-center">{desc}</Text>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Modal>
  );
};

export { ConfirmModal };
