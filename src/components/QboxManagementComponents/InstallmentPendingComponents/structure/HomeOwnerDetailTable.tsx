import { Flex, Table, Typography } from "antd";
import type { InstallmentType } from "../../../../types";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
interface props {
  details: InstallmentType | undefined;
}

const { Text } = Typography;
const HomeOwnerDetailTable: React.FC<props> = ({ details }) => {
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
      detail: <Text>{details?.homeownerName}</Text>,
    },
    {
      key: "2",
      type: <Text className="text-gray">{t("Email Address")}</Text>,
      detail: <Text>{details?.email}</Text>,
    },
    {
      key: "3",
      type: <Text className="text-gray">{t("Phone Number")}</Text>,
      detail: <Text>{details?.phoneNumber}</Text>,
    },
    {
      key: "4",
      type: <Text className="text-gray">{t("Short Address")}</Text>,
      detail: <Text>{details?.shortAddress}</Text>,
    },
    {
      key: "5",
      type: <Text className="text-gray">{t("City")}</Text>,
      detail: <Text>{details?.city}</Text>,
    },
    {
      key: "6",
      type: <Text className="text-gray">{t("District")}</Text>,
      detail: <Text>{details?.district}</Text>,
    },
    {
      key: "7",
      type: <Text className="text-gray">{t("Street")}</Text>,
      detail: <Text>{details?.street}</Text>,
    },
    {
      key: "8",
      type: <Text className="text-gray">{t("Postal Code")}</Text>,
      detail: <Text>{details?.postalCode}</Text>,
    },
    {
      key: "9",
      type: <Text className="text-gray">{t("Building #")}</Text>,
      detail: <Text>{details?.building}</Text>,
    },
    {
      key: "10",
      type: <Text className="text-gray">{t("Secondary Number")}</Text>,
      detail: <Text>{details?.secondaryNumber}</Text>,
    },
    {
      key: "11",
      type: <Text className="text-gray">{t("ID Type & Number")}</Text>,
      detail: <Text>{details?.idType}</Text>,
    },
    {
      key: "12",
      type: <Text className="text-gray">{t("Preferred Location")}</Text>,
      detail: <Text>{details?.preLocation}</Text>,
    },
    {
      key: "13",
      type: <Text className="text-gray">{t("Instruction")}</Text>,
      detail: <Text>{details?.instruction}</Text>,
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
