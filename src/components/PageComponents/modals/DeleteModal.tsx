import { Modal, Flex, Button, Typography } from "antd";
const { Text, Title } = Typography;
import { type HomerOwnerItems } from "../../../data";
interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  item: HomerOwnerItems | null;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onClose, item }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      centered
      footer={
        <Flex justify="center" gap={5}>
          <Button onClick={onClose} className="btncancel text-black border-gray">
            Cancel
          </Button>
          <Button
            className="btnsave border-0 text-white bg-red"
            onClick={onClose}
          >
            Confirm
          </Button>
        </Flex>
      }
    >
      <Flex vertical align="center" className="mt-3" gap={5}>
        <img src="/assets/icons/delete.png" width={50} alt="bin icon" fetchPriority="high" />
        <Title level={5} className="m-0">
          Delete Account
        </Title>
        <Text className="fs-14 text-center">
          Are you sure you want to delete{" "}
          <b>{item?.homeownername || "this account"}</b>?
        </Text>
      </Flex>
    </Modal>
  );
};
