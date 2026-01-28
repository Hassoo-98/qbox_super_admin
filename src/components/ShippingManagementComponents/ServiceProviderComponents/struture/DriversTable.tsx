import {
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
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { DriverProviderType } from "../../../../types";
import { statusItems } from "../../../../shared";
import { driverproviderColumn, driverproviderData } from "../../../../data";
import { SearchInput } from "../../../Forms";
import { ConfirmModal } from "../../../PageComponents";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";

const DriversTable = () => {
  const [form] = Form.useForm();
  const [statuschanged, setStatusChanged] = useState<boolean>(false);
  const [selectedStatus, setselectedStatus] = useState<string>("");
  const { t } = useTranslation();
  const handleStatusClick: MenuProps["onClick"] = ({ key }) => {
    setselectedStatus(key);
  };
  const selectedStatusLabel =
    statusItems(t).find((item) => item.key === selectedStatus)?.label ||
    t("Status");

  const isRTL = i18n.language === "ar";

  return (
    <>
      <Card
        className="radius-12 border-gray card-cs h-100"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <Flex vertical gap={15} className="mb-3">
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]}>
              <Col span={24} md={24} lg={12}>
                <SearchInput
                  placeholder={t("Search by Driver Name")}
                  prefix={
                    <img
                      src="/assets/icons/search.png"
                      width={16}
                      alt="search icon"
                      fetchPriority="high"
                    />
                  }
                />
              </Col>
              <Col span={24} lg={12}>
                <Dropdown
                  menu={{
                    items: statusItems(t),
                    onClick: handleStatusClick,
                  }}
                  trigger={["click"]}
                >
                  <Button className="btncancel px-3 filter-bg fs-13 text-black">
                    <Flex justify="space-between" align="center" gap={30}>
                      {selectedStatusLabel}
                      <DownOutlined />
                    </Flex>
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<DriverProviderType>
            size="large"
            columns={driverproviderColumn({ setStatusChanged }, t)}
            dataSource={driverproviderData}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
            rowHoverable={false}
            pagination={false}
          />
        </Flex>
      </Card>

      <ConfirmModal
        visible={statuschanged}
        title={t("Are you sure?")}
        desc={t(
          "Are you sure you want to status change of this service provider?"
        )}
        onClose={() => setStatusChanged(false)}
      />
    </>
  );
};

export { DriversTable };
