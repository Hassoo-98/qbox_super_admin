import { Card, Flex, Table, Form, Row, Col } from "antd";

import { useState } from "react";
import type { DriverProviderType } from "../../../../types";
import { statusItems } from "../../../../shared";
import { driverproviderColumn, driverproviderData } from "../../../../data";
import { SearchInput, MySelect } from "../../../Forms";
import { ConfirmModal } from "../../../PageComponents";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";

type Props = {
  driversData?: any[];
};

const DriversTable = ({ driversData }: Props) => {
  const [form] = Form.useForm();
  const [statuschanged, setStatusChanged] = useState<boolean>(false);
  const [selectedStatus, setselectedStatus] = useState<string>("");
  const { t } = useTranslation();
  const statusOptions = statusItems(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handleStatusChange = (value: any) => {
    setselectedStatus(value);
  };

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
                <MySelect
                  withoutForm
                  className="px-3 filter-bg fs-13 text-black"
                  options={statusOptions}
                  placeholder={t("Status")}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  allowClear
                  maxWidth={150}
                />
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<DriverProviderType>
            size="large"
            columns={driverproviderColumn({ setStatusChanged }, t)}
            dataSource={
              Array.isArray(driversData)
                ? driversData.map((d: any, idx: number) => ({
                    key: d.id ?? d.pk ?? idx,
                    img: d.img ?? d.image ?? d.avatar ?? "",
                    driverName: d.name ?? d.driver_name ?? d.driverName ?? "",
                    phoneNumber: d.phone_number ?? d.phoneNumber ?? "",
                    emailAddress: d.email ?? d.emailAddress ?? "",
                    totalDeliveries: d.total_deliveries ?? d.totalDeliveries ?? 0,
                    issuesLogged: d.issues_logged ?? d.issuesLogged ?? 0,
                    status: d.status ?? (d.is_active ? "active" : "inactive"),
                  }))
                : driverproviderData
            }
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
          "Are you sure you want to status change of this service provider?",
        )}
        img={"active.png"}
        onClose={() => setStatusChanged(false)}
        onConfirm={() => setStatusChanged(false)}
      />
    </>
  );
};

export { DriversTable };
