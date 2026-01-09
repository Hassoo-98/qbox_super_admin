import { Typography, Card, Flex, Table, Form, Row, Col } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import type { ServiceProviderType } from "../../../../Type";
import {
  ConfirmModal,
  DeleteModal,
  ModuleTopHeading,
} from "../../../PageComponents";
import { serviceproviderColumn, serviceproviderData } from "../../../../data";
import { MyDatepicker, SearchInput } from "../../../Forms";

const { Text } = Typography;
const ServiceProviderRequestTable = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [edititem, setEditItem] = useState<ServiceProviderType | null>(null);
  const [statuschanged, setStatusChanged] = useState<boolean>(false);
  const [deleteitem, setDeleteItem] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
    undefined
  );

  const { t } = useTranslation();

  return (
    <>
      <Card className="radius-12 border-gray card-cs h-100">
        <Flex vertical gap={15} className="mb-3">
          <Flex vertical>
            <ModuleTopHeading level={5} name={t("Service Provider Requests")} />
            <Text className="text-gray fs-13">
              {t("Manage all service providers approval requests in your system")}
            </Text>
          </Flex>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={8} md={24} span={24}>
                <SearchInput
                  placeholder={t("Search by Service Provider Name")}
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
              <Col span={24} md={24} xl={7}>
                <Flex justify="end" gap={10}>
                  <MyDatepicker
                    withoutForm
                    rangePicker
                    className="datepicker-cs"
                    placeholder={[t("Start Year"), t("End Year")]}
                    value={selectedYear}
                    onChange={(dates: [Dayjs, Dayjs] | null) =>
                      setSelectedYear(dates ?? undefined)
                    }
                  />
                </Flex>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<ServiceProviderType>
            size="large"
            columns={serviceproviderColumn(
              {
                setVisible,
                setEditItem,
                navigate,
                setStatusChanged,
                setDeleteItem,
              },
              t
            )}
            dataSource={serviceproviderData}
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
        title="Are you sure?"
        desc=" Are you sure you want to status change of this service provider?"
        onClose={() => setStatusChanged(false)}
      />
      <DeleteModal
        title="Delete Provider"
        subtitle="This action in undone. Are you sure you want to delete this service provider?"
        visible={deleteitem}
        onClose={() => setDeleteItem(false)}
      />
    </>
  );
};

export { ServiceProviderRequestTable };
