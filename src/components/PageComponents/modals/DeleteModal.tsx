import { Modal, Flex, Button, Typography } from "antd";
import type { HomerOwnerTypes } from "../../../Type";
import { useTranslation } from "react-i18next";
import i18n from "../../../sources/i18n";
const { Text, Title } = Typography;
interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  item?: HomerOwnerTypes | null;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  item,
  title,
  subtitle,
}) => {
  const { t } = useTranslation();
   const isRTL = i18n.language === "ar";
   
  return (
    <Modal
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
            className="btnsave border-0 text-white bg-delivery-failed"
            onClick={onClose}
          >
            {t("Confirm")}
          </Button>
        </Flex>
      }
    >
      <Flex vertical align="center" className="mt-3" gap={5}>
        <img
          src="/assets/icons/delete.png"
          width={50}
          alt="bin icon"
          fetchPriority="high"
        />
        <Title level={5} className="m-0">
          {title}
        </Title>
        <Text className="fs-14 text-center">
          {subtitle}
          <>
            {item ? (
              <>
                <b>{item?.homeownername || "this account"}</b> ?
              </>
            ) : null}
          </>
        </Text>
      </Flex>
    </Modal>
  );
};
