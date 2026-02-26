import { Flex, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
import type { QboxInstallmentItem } from "../../../../types/AllQboxTypes";
interface props {
  detials: QboxInstallmentItem | undefined;
}

const { Text } = Typography;
const HomeOwnerDetailTable: React.FC<props> = ({ detials }) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("Type"),
      dataIndex: "type",
      width: 300,
    },
    {
      title: t("Details"),
      dataIndex: "detail",
    },
  ];

  const data = [
    {
      key: "1",
      type: <Text className="text-gray">{t("Full Name")}</Text>,
      detail: <Text>{detials?.homeowner?.full_name}</Text>,
    },
    {
      key: "2",
      type: <Text className="text-gray">{t("Email Address")}</Text>,
      detail: <Text>{detials?.homeowner?.email}</Text>,
    },
    {
      key: "3",
      type: <Text className="text-gray">{t("Phone Number")}</Text>,
      detail: <Text>{detials?.homeowner?.phone_number}</Text>,
    },
    {
      key: "4",
      type: <Text className="text-gray">{t("Short Address")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.short_address}</Text>,
    },
    {
      key: "5",
      type: <Text className="text-gray">{t("City")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.city}</Text>,
    },
    {
      key: "6",
      type: <Text className="text-gray">{t("District")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.district}</Text>,
    },
    {
      key: "7",
      type: <Text className="text-gray">{t("Street")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.street}</Text>,
    },
    {
      key: "8",
      type: <Text className="text-gray">{t("Postal Code")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.postal_code}</Text>,
    },
    {
      key: "9",
      type: <Text className="text-gray">{t("Building #")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.building_number}</Text>,
    },
    {
      key: "10",
      type: <Text className="text-gray">{t("Secondary Number")}</Text>,
      detail: <Text>{detials?.homeowner?.address?.secondary_building_number}</Text>,
    },
    // {
    //   key: "11",
    //   type: <Text className="text-gray">{t("ID Type & Number")}</Text>,
    //   detail: <Text>{detials?.homeowner?.qboxes?.map((item) => item?.qbox_id)}</Text>,
    // },
    {
      key: "12",
      type: <Text className="text-gray">{t("Preferred Location")}</Text>,
      detail: <Text>{detials?.homeowner?.installation_location_preference}</Text>,
    },
    {
      key: "13",
      type: <Text className="text-gray">{t("Instruction")}</Text>,
      detail: <Text>{detials?.homeowner?.installation_access_instruction}</Text>,
    },
  ];
  const isRTL = i18n.language === "ar";

  return (
    <Flex vertical gap={10} style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        className="pagination table-cs table left-to-right"
        showSorterTooltip={false}
        scroll={{ x: 500 }}
        rowHoverable={false}
        pagination={false}
        // loading={isLoading}
      />
    </Flex>
  );
};

export { HomeOwnerDetailTable };
