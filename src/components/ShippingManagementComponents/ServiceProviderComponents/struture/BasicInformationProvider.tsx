import { Flex, Image, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { ServiceProviderType } from "../../../../Type";


interface basicInfoProp {
  details: ServiceProviderType | undefined;
}

const { Text } = Typography;
const BasicInformationProvider: React.FC<basicInfoProp> = ({ details }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const workinghours = [
    {
      id: 1,
      title: "Monday",
      starttime: "09:00",
      endtime: "06:00",
    },
    {
      id: 2,
      title: "Tuesday",
      starttime: "09:00",
      endtime: "06:00",
    },
    {
      id: 3,
      title: "Wednesday",
      starttime: "09:00",
      endtime: "06:00",
    },
    {
      id: 4,
      title: "Thursday",
      starttime: "09:00",
      endtime: "06:00",
    },
    {
      id: 5,
      title: "Friday",
    },
    {
      id: 6,
      title: "Saturday",
      starttime: "09:00",
      endtime: "06:00",
    },
    {
      id: 7,
      title: "Sunday",
      starttime: "09:00",
      endtime: "06:00",
    },
  ];

  const columns = [
    {
      title: t("Type"),
      dataIndex: "type",
    },
    {
      title: t("Details"),
      dataIndex: "detail",
    },
  ];

  const data = [
    {
      key: "1",
      type: <Text className="text-gray">{t("Contact-Person Name")}</Text>,
      detail: <Text>{details?.contactpersonName}</Text>,
    },
    {
      key: "2",
      type: <Text className="text-gray">{t("Email Address")}</Text>,
      detail: <Text>example@gmail.com</Text>,
    },
    {
      key: "4",
      type: <Text className="text-gray">{t("Phone Number")}</Text>,
      detail: <Text>+966-xxxxxxxxx</Text>,
    },
    {
      key: "6",
      type: (
        <Text className="text-gray">{t("Business Registration Number")}</Text>
      ),
      detail: <Text>xxxxxxxxx</Text>,
    },
    {
      key: "7",
      type: <Text className="text-gray">{t("Settleent Cycle")}</Text>,
      detail: <Text>+966 798 328 129</Text>,
    },
    {
      key: "8",
      type: <Text className="text-gray">{t("Markup Value")}</Text>,
      detail: <Text>Percentage . 20%</Text>,
    },
    {
      key: "9",
      type: <Text className="text-gray">{t("Working Hours")}</Text>,
      detail: (
        <Flex gap={5} vertical>
          {workinghours?.map((schedule, index) => (
            <Flex gap={4} key={index}>
              <Text strong>{t(schedule?.title)}:</Text>
              <Flex gap={5}>
                <Text className="">08:00 am to 10:00pm</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      ),
    },

    {
      key: "10",
      type: <Text className="text-gray">{t("Delivery Charges")}</Text>,
      detail: (
        <Flex vertical gap={4}>
          <Flex gap={125} align="center">
            <Text strong>First:</Text>
            <Text>5KG</Text>
          </Flex>
          <Flex gap={100} align="center">
            <Text strong>Charges:</Text>
            <Text>SAR 35</Text>
          </Flex>
          <Flex gap={27} align="center">
            <Text strong>Additional Charges:</Text>
            <Text>SAR 10</Text>
          </Flex>
          <Flex gap={100} align="center">
            <Text strong>Tax Fuel:</Text>
            <Text>SAR 10</Text>
          </Flex>
        </Flex>
      ),
    },
    {
      key: "11",
      type: <Text className="text-gray">{t("Bank Name")}</Text>,
      detail: <Text>Saudi Bank</Text>,
    },

    {
      key: "12",
      type: <Text className="text-gray">{t("Card Holder Name")}</Text>,
      detail: <Text>Mohammad Ibrahim</Text>,
    },
    {
      key: "13",
      type: <Text className="text-gray">{t("IBAN")}</Text>,
      detail: <Text>XXXXXXXXXXXXXXXXXXXXXXX</Text>,
    },
    {
      key: "14",
      type: <Text className="text-gray">{t("Account Number")}</Text>,
      detail: <Text>XXXXXXXXXXXX</Text>,
    },
    {
      key: "15",
      type: <Text className="text-gray">{t("Tax ID")}</Text>,
      detail: <Text>XXXXXXXX</Text>,
    },
  ];

  const isRTL = i18n.language === "ar";

  return (
    <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex justify="center">
        <Image
          src={details?.providerName?.img}
          alt="Category"
          className="radius-12 mxw-mxh"
          fetchPriority="high"
        />
      </Flex>
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        className={
          isArabic
            ? "pagination table-cs table right-to-left"
            : "pagination table-cs table left-to-right"
        }
        showSorterTooltip={false}
        scroll={{ x: 500 }}
        rowHoverable={false}
        pagination={false}
        // loading={isLoading}
      />
    </Flex>
  );
};

export { BasicInformationProvider };
