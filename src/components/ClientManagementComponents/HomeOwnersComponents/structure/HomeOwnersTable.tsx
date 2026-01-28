import { useState } from "react";
import {
  Typography,
  Card,
  Flex,
  Table,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  type MenuProps,
} from "antd";
import {
  ActiveModal,
  ConfirmModal,
  CustomPagination,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { homeownersColumn } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { HomerOwnerTypes } from "../../../../types";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import { useHomeOwners } from "../../../../api/hooks";

const { Text } = Typography;

const HomeOwnersTable: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Real Data Hook
  const { data: owners, isLoading } = useHomeOwners();

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [inactiveModal, setInactiveModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [itemToDelete, setItemToDelete] = useState<HomerOwnerTypes | null>(
    null,
  );

  const [selectedCity, setselectedCity] = useState<
    number | string | undefined
  >();
  const [selectedQboxstatus, setselectedQboxstatus] = useState<
    number | string | undefined
  >();
  const [selecteAccountstatus, setselecteAccountstatus] = useState<
    number | string | undefined
  >();

  const navigate = useNavigate();

  const handleStatusClick = (status: "active" | "inactive") => {
    if (status === "active") {
      setInactiveModal(true);
    } else {
      setActiveModal(true);
    }
  };

  const isRTL = i18n.language === "ar";

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const cityItems = [
    { key: 1, label: t("Qatif") },
    { key: 2, label: t("Qaseem") },
  ];

  const QboxStatus = [
    { key: 1, label: t("Online") },
    { key: 2, label: t("Offline") },
    { key: 3, label: t("Error") },
  ];

  const AccountStatus = [
    { key: 1, label: t("Active") },
    { key: 2, label: t("Inactive") },
  ];

  const handleCityClick: MenuProps["onClick"] = ({ key }) => {
    setselectedCity(Number(key));
  };

  const selectedCityLabel =
    cityItems.find((item) => item.key === selectedCity)?.label || t("City");

  const handleQboxstatusClick: MenuProps["onClick"] = ({ key }) => {
    setselectedQboxstatus(Number(key));
  };

  const selectedQboxstatusLabel =
    QboxStatus.find((item) => item.key === selectedQboxstatus)?.label ||
    t("QBox Status");

  const handleAccountstatusClick: MenuProps["onClick"] = ({ key }) => {
    setselecteAccountstatus(Number(key));
  };

  const selectedAccounttatusLabel =
    AccountStatus.find((item) => item.key === selecteAccountstatus)?.label ||
    t("Account Status");

  // Map real data or use empty array
  const dataSource = owners || [];

  return (
    <>
      <Card
        className="radius-12 border-gray card-cs h-100"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <Flex vertical gap={10} className="mb-2">
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("Home Owners")} />
            <Text className="text-gray fs-13">
              {t("Manage all the home owners in your system")}
            </Text>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={16} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by Home Owner Name / QBox ID")}
                      prefix={
                        <img
                          src="/assets/icons/search.png"
                          width={16}
                          alt="search icon"
                        />
                      }
                    />
                  </Col>
                  <Col span={24} md={24} lg={12}>
                    <Flex gap={5}>
                      <Dropdown
                        menu={{
                          items: cityItems,
                          onClick: handleCityClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedCityLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                      <Dropdown
                        menu={{
                          items: QboxStatus,
                          onClick: handleQboxstatusClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedQboxstatusLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                      <Dropdown
                        menu={{
                          items: AccountStatus,
                          onClick: handleAccountstatusClick,
                        }}
                        trigger={["click"]}
                      >
                        <Button className="btncancel filter-bg fs-13 text-black">
                          <Flex justify="space-between" align="center" gap={30}>
                            {selectedAccounttatusLabel}
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                    </Flex>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<HomerOwnerTypes>
            size="large"
            loading={isLoading}
            columns={homeownersColumn({
              setItemToDelete,
              navigate,
              setDeleteItem,
              handleStatusClick,
              t,
            })}
            dataSource={dataSource as any}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 1300 }}
            rowHoverable={false}
            pagination={false}
          />
          <CustomPagination
            total={dataSource.length}
            current={current}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Card>

      <ConfirmModal
        visible={inactiveModal}
        title={t("Inactivate Account")}
        desc={t("Are you sure you want to inactive this account?")}
        onClose={() => setInactiveModal(false)}
      />
      <ActiveModal
        visible={activeModal}
        title={t("Activate Account")}
        desc={t("Are you sure you want to active this account?")}
        onClose={() => setActiveModal(false)}
      />
      <DeleteModal
        title={t("Delete Account")}
        subtitle={t("Are you sure you want to delete")}
        visible={deleteItem}
        onClose={() => setDeleteItem(false)}
        item={itemToDelete}
      />
    </>
  );
};

export { HomeOwnersTable };
