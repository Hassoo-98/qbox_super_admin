import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/globalContext";
import { 
  Flex,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  Typography,
  Table,
  type TableColumnsType,
  type MenuProps,
  Avatar,
} from "antd";
import message from "antd/lib/message";
import api from "../../../../lib/axios";
import type { AppointApprovalItems } from "../../../../data/appointmentapprovalrequestData";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchInput, MySelect } from "../../../Forms";
import { CustomPagination } from "../../../PageComponents";
import { useTranslation } from "react-i18next";
import i18n from "../../../../sources/i18n";
const { Text } = Typography;
const AccountApprovalRequestsTable: React.FC = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<
    number | string | undefined
  >();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handlePageChange = (page: number, size: number): void => {
    setCurrent(page);
    setPageSize(size);
  };

  const [dataSource, setDataSource] = useState<AppointApprovalItems[]>([]);
  const [loading, setLoading] = useState(false);
  const { dataRefreshToken } = useGlobalContext();

  const mapItem = (it: unknown, idx: number): AppointApprovalItems => {
    const obj = (it || {}) as Record<string, unknown>;
    const item = obj as Record<string, unknown>;
    const owner = (item["home_owner"] ?? {}) as Record<string, unknown>;
    const addr = (owner["address"] ?? {}) as Record<string, unknown>;
    const key = idx + 1;
    const qboxes = Array.isArray(owner["qboxes"]) ? (owner["qboxes"] as unknown[]) : [];
    const firstQbox = qboxes.length ? (qboxes[0] as Record<string, unknown>) : null;
    const qboxIdFromOwner = firstQbox ? String(firstQbox["id"] ?? firstQbox["qbox_id"] ?? "") : "";
    const asStr = (v: unknown) => (v === null || v === undefined ? "" : String(v));
    return {
      key,
      ownerid: asStr(owner["id"]),
      homeownername: asStr(owner["full_name"] ?? owner["name"]),
      qboxid: qboxIdFromOwner,
      qboximage: asStr(owner["installation_qbox_image_url"]) || "/assets/images/qbox.png",
      phonenumber: asStr(owner["phone_number"] ?? owner["phone"]),
      email: asStr(owner["email"]),
      shortaddress: asStr(addr["short_address"] ?? addr["address_short"]),
      city: asStr(addr["city"]),
      requestedDate: asStr(item["created_at"]),
      installationstatus: asStr(item["status"]),
      district: asStr(addr["district"]),
      street: asStr(addr["street"]),
      postalcode: asStr(addr["postal_code"] ?? addr["postalcode"]),
      building: asStr(addr["building_number"]),
      secondarynumber: asStr(owner["secondary_phone_number"]),
      idtypenumber: asStr(owner["id_type_number"]),
      preferdlocation: asStr(owner["installation_location_preference"]),
      instruction: asStr(owner["installation_access_instruction"]),
      supervisortechnician: asStr(owner["supervisortechnician"]),
    } as AppointApprovalItems;
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/home_owner/account-approval/list");
      
      // Debug logging to inspect API response structure
      console.log("=== API Response Debug ===");
      console.log("Full response:", res);
      console.log("Response data:", res?.data);
      console.log("Response data type:", typeof res?.data);
      console.log("Is res.data an array?", Array.isArray(res?.data));
      console.log("Response data.data:", res?.data?.data);
      console.log("Is res.data.data an array?", Array.isArray(res?.data?.data));
      console.log("Response data.results:", res?.data?.results);
      console.log("Response data.items:", res?.data?.items);
      console.log("Response data.list:", res?.data?.list);
      console.log("Response data.records:", res?.data?.records);
      console.log("All response data keys:", res?.data ? Object.keys(res.data) : "N/A");
      
      // Log the actual values of each key
      if (res?.data) {
        Object.keys(res.data).forEach(key => {
          console.log(`  - ${key}:`, res.data[key]);
          console.log(`    Type: ${typeof res.data[key]}, Is Array: ${Array.isArray(res.data[key])}`);
        });
      }
      
      // Check if data.data has keys that might contain the array
      if (res?.data?.data && typeof res.data.data === 'object') {
        console.log("Keys in data.data:", Object.keys(res.data.data));
        Object.keys(res.data.data).forEach(key => {
          console.log(`  - data.data.${key}:`, res.data.data[key]);
          console.log(`    Type: ${typeof res.data.data[key]}, Is Array: ${Array.isArray(res.data.data[key])}`);
        });
      }
      
      // Try multiple possible response structures
      const items = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data?.results)
        ? res.data.results
        : Array.isArray(res?.data?.items)
        ? res.data.items
        : Array.isArray(res?.data?.list)
        ? res.data.list
        : Array.isArray(res?.data?.records)
        ? res.data.records
        : Array.isArray(res?.data?.data?.results)
        ? res.data.data.results
        : Array.isArray(res?.data?.data?.items)
        ? res.data.data.items
        : Array.isArray(res?.data?.data?.list)
        ? res.data.data.list
        : Array.isArray(res?.data?.data?.records)
        ? res.data.data.records
        : [];
      
      console.log("Extracted items:", items);
      console.log("Items count:", items.length);
      
      if (items.length > 0) {
        console.log("First item structure:", items[0]);
        console.log("First item keys:", Object.keys(items[0]));
      }
      
      const mapped = items.map(mapItem);
      console.log("Mapped data:", mapped);
      console.log("Mapped data count:", mapped.length);
      console.log("=== End Debug ===");
      
      setDataSource(mapped);
    } catch (err: unknown) {
      console.error("API Error:", err);
      message.error(
        t("Failed to load account approval requests. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRefreshToken]);

  const Cities = [
    { id: 1, name: t("Qatif") },
    { id: 2, name: t("Qaseem") },
  ];
  const accountColumns: TableColumnsType<AppointApprovalItems> = [
    {
      title: t("Owner ID"),
      dataIndex: "ownerid",
    },
    {
      title: t("Homeowner Name"),
      dataIndex: "homeownername",
    },
    {
      title: t("QBox ID"),
      dataIndex: "qboxid",
    },
    {
      title: t("QBox Image"),
      dataIndex: "qboximage",
      render: (qboximage) => (
        <Avatar src={qboximage} size={50} shape="square" />
      ),
      width: 100,
    },
    {
      title: t("Phone Number"),
      dataIndex: "phonenumber",
    },
    {
      title: t("City"),
      dataIndex: "city",
    },
    {
      title: t("Requested Date"),
      dataIndex: "requestedDate",
    },
    {
      title: t("Installation Status"),
      dataIndex: "installationstatus",
      render: (subscriptionplane) => {
        return subscriptionplane === "installed" ? (
          <Text className="btnpill fs-12 success">{t("Installed")}</Text>
        ) : (
          <Text className="btnpill fs-12 inactive">{t("Not Installed")}</Text>
        );
      },
    },
    {
      title: t("Action"),
      key: "action",
      width: 100,
      render: (_, row: AppointApprovalItems) => {
        const items: MenuProps["items"] = [
          {
            label: (
              <NavLink
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/requestsqueue/accountapprovaldetails/" + row?.key);
                }}
              >
                {t("View")}
              </NavLink>
            ),
            key: "1",
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button className="bg-transparent border-0 p-0">
              <img
                src="/assets/icons/dots.webp"
                alt="dots icon"
                fetchPriority="high"
                width={16}
              />
            </Button>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <div>
      <Flex vertical gap={20} style={{ direction: isRTL ? "rtl" : "ltr" }}>
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
                        fetchPriority="high"
                      />
                    }
                  />
                </Col>
                <Col span={24} md={24} lg={12}>
                  <Flex gap={5}>
                    <MySelect
                      withoutForm
                      className="filter-bg fs-13 text-black"
                      options={Cities}
                      placeholder={t("City")}
                      value={selectedCity}
                      onChange={(val) => setSelectedCity(val)}
                      allowClear
                      maxWidth={150}
                    />
                  </Flex>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <Flex vertical gap={20}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Button onClick={fetchRequests} loading={loading}>
              {t("Refresh")}
            </Button> */}
          </div>
          <Table<AppointApprovalItems>
            size="large"
            columns={accountColumns}
            dataSource={dataSource}
            loading={loading}
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 1300 }}
            rowHoverable={false}
            pagination={false}
          />
          <CustomPagination
            total={12}
            current={current}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export { AccountApprovalRequestsTable };
