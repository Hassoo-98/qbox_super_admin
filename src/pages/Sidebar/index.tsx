import "./index.css";
import { useEffect, useState, lazy, Suspense } from "react";
import { Layout, Divider, Image, Menu, Flex, Space, Button, Spin } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { MenuItems } from "./MenuItems";

const DashboardPage = lazy(() =>
  import("../DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
import {
  HomeOwnersDetails,
  PayoutRequestPackageDetail,
  QboxSingleViewAllPackages,
  SearchInput,
  SingleviewAccountApprovalDetails,
  SingleViewAllPackages,
  SingleViewHomeOwnerDetail,
  SingleViewPayoutHistory,
  SingleViewPayoutRequest,
  SingleViewQRHistory,
  SingleviewRelocationApprovalDetails,
  SingleViewServiceProvider,
  UserDropdown,
  ViewQboxDeatils,
} from "../../components";
import { LanguageChange } from "./LanguageChange";
const HomeOwnersPage = lazy(() =>
  import("../HomeOwnersPage").then((m) => ({ default: m.HomeOwnersPage })),
);
const RequestsQueuePage = lazy(() =>
  import("../RequestsQueuePage").then((m) => ({
    default: m.RequestsQueuePage,
  })),
);
const StaffsPage = lazy(() =>
  import("../StaffsPage").then((m) => ({ default: m.StaffsPage })),
);
const ActivitylogPage = lazy(() =>
  import("../ActivitylogPage").then((m) => ({ default: m.ActivitylogPage })),
);
const InstallmentPendingPage = lazy(() =>
  import("../InstallmentPendingPage").then((m) => ({
    default: m.InstallmentPendingPage,
  })),
);
const AllqboxesPage = lazy(() =>
  import("../AllqboxesPage").then((m) => ({ default: m.AllqboxesPage })),
);
const SettingPage = lazy(() =>
  import("../SettingPage").then((m) => ({ default: m.SettingPage })),
);
const SubscriptionManagementPage = lazy(() =>
  import("../SubscriptionManagementPage").then((m) => ({
    default: m.SubscriptionManagementPage,
  })),
);
const RevenuePage = lazy(() =>
  import("../RevenuePage").then((m) => ({ default: m.RevenuePage })),
);
const ServiceProviderPage = lazy(() =>
  import("../ServiceProviderPage").then((m) => ({
    default: m.ServiceProviderPage,
  })),
);
const ServiceProviderRequestPage = lazy(() =>
  import("../ServiceProviderRequestPage").then((m) => ({
    default: m.ServiceProviderRequestPage,
  })),
);
const RolePermissionPage = lazy(() =>
  import("../RolePermissionPage").then((m) => ({
    default: m.RolePermissionPage,
  })),
);
const PayoutHistoryPage = lazy(() =>
  import("../PayoutHistoryPage").then((m) => ({
    default: m.PayoutHistoryPage,
  })),
);
const PayoutRequestPage = lazy(() =>
  import("../PayoutRequestPage").then((m) => ({
    default: m.PayoutRequestPage,
  })),
);
const AllShipmentsPage = lazy(() =>
  import("../AllShipmentsPage").then((m) => ({ default: m.AllShipmentsPage })),
);

const { Header, Sider, Content } = Layout;
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [openKeys, setOpenKeys] = useState<string[]>([""]);

  useEffect(() => {
    let tab = location?.pathname?.split("/")[1];
    tab =
      tab === ""
        ? "1"
        : tab === "homeowners" || tab === "homeowners/homeownersdetails"
          ? "2"
          : tab === "requestsqueue" ||
              tab === "requestsqueue/accountapprovaldetails" ||
              tab === "requestsqueue/relocationapprovaldetails"
            ? "3"
            : tab === "allqboxes"
              ? "4"
              : tab === "installementpending"
                ? "5"
                : tab === "serviceproviders"
                  ? "6"
                  : tab === "allshipments"
                    ? "7"
                    : tab === "serviceproviderrequest"
                      ? "8"
                      : tab === "staffs"
                        ? "9"
                        : tab === "rolepermissions"
                          ? "10"
                          : tab === "qrlogs"
                            ? "11"
                            : tab === "settingpage"
                              ? "12"
                              : tab === "activitylogs"
                                ? "13"
                                : tab === "subscriptionmanagement"
                                  ? "14"
                                  : tab === "revenue"
                                    ? "15"
                                    : tab === "payouthistory"
                                      ? "16"
                                      : tab === "payoutrequests"
                                        ? "17"
                                        : "1";
    setCurrentTab(tab);
  }, [location]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        navigate("/", { replace: true });
        break;
      case "2":
        navigate("/homeowners", { replace: true });
        break;
      case "3":
        navigate("/requestsqueue", { replace: true });
        break;
      case "4":
        navigate("/allqboxes", { replace: true });
        break;
      case "5":
        navigate("/installementpending", { replace: true });
        break;
      case "6":
        navigate("/serviceproviders", { replace: true });
        break;
      case "7":
        navigate("/allshipments", { replace: true });
        break;
      case "8":
        navigate("/serviceproviderrequest", { replace: true });
        break;
      case "9":
        navigate("/staffs", { replace: true });
        break;
      case "10":
        navigate("/rolepermissions", { replace: true });
        break;
      case "11":
        navigate("/settingpage", { replace: true });
        break;
      case "12":
        navigate("/activitylogs", { replace: true });
        break;
      case "13":
        navigate("/subscriptionmanagement", { replace: true });
        break;
      case "14":
        navigate("/revenue", { replace: true });
        break;
      case "15":
        navigate("/payouthistory", { replace: true });
        break;
      case "16":
        navigate("/payoutrequests", { replace: true });
        break;
      default:
        break;
    }
  };

  const menuItems = MenuItems({ currentTab });

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Layout className="h-100vh">
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        width={250}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={
          collapsed
            ? "addclass overflowstyle h-100vh overflowy-auto border-right-side"
            : "overflowstyle h-100vh overflowy-auto border-right-side"
        }
      >
        <Flex align="center">
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Image
              style={{ width: collapsed ? 40 : 100 }}
              height="auto"
              src="/assets/images/logo.png"
              alt="logo image"
              preview={false}
              fetchPriority="high"
            />
          </div>
        </Flex>

        <Menu
          defaultSelectedKeys={["1"]}
          selectedKeys={[currentTab]}
          mode="inline"
          theme="dark"
          onClick={handleMenuClick}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          items={menuItems as MenuProps["items"]}
          className="listitem"
        />
        <Divider className="m-0 bg-divider" />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background header-mbl-cs header">
          <div className="position-relative w-98per">
            <Flex
              justify="space-between"
              align="center"
              gap={5}
              className="flex-col-mbl"
            >
              <Space className="mbl-space">
                <Button
                  className="bg-transparent border-0 p-0"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <Image
                    src="/assets/icons/collapse.png"
                    width={"25px"}
                    preview={false}
                    style={{
                      transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    alt="collapse icon"
                    fetchPriority="high"
                  />
                </Button>
                <SearchInput
                  prefix={
                    <img
                      src="/assets/icons/search.png"
                      width={20}
                      alt="search icon"
                      fetchPriority="high"
                    />
                  }
                  placeholder="Search by QBOX ID"
                />
              </Space>
              <Flex
                justify="space-between"
                align="center"
                className="w-100 flex-end"
              >
                <Button
                  className="bg-transparent border-0 p-0 d-none"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <Image
                    src="/assets/icons/collapse.png"
                    width={"25px"}
                    preview={false}
                    style={{
                      transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    alt="collapse icon"
                    fetchPriority="high"
                  />
                </Button>
                <Space size={15} align="center" className="right">
                  <LanguageChange />
                  <UserDropdown />
                </Space>
              </Flex>
            </Flex>
          </div>
        </Header>
        <Divider className="border-gray m-0" />
        <Content className="scroll-bar content-css">
          <Suspense
            fallback={
              <Flex align="center" justify="center" className="h-100">
                <Spin size="large" />
              </Flex>
            }
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/homeowners" element={<HomeOwnersPage />} />
              <Route
                path="/homeowners/homeownersdetails/:id"
                element={<HomeOwnersDetails />}
              />
              <Route path="/requestsqueue" element={<RequestsQueuePage />} />
              <Route
                path="/requestsqueue/accountapprovaldetails/:id"
                element={<SingleviewAccountApprovalDetails />}
              />
              <Route
                path="/requestsqueue/relocationapprovaldetails/:id"
                element={<SingleviewRelocationApprovalDetails />}
              />
              <Route path="/staffs" element={<StaffsPage />} />
              <Route
                path="/installementpending"
                element={<InstallmentPendingPage />}
              />
              <Route
                path="/installmentpending/viewdetail/:id"
                element={<SingleViewHomeOwnerDetail />}
              />
              <Route path="/activitylogs" element={<ActivitylogPage />} />
              <Route path="/allqboxes" element={<AllqboxesPage />} />
              <Route path="/allqboxes/view/:id" element={<ViewQboxDeatils />} />
              <Route
                path="/allqboxes/view/qboxallpackages/detailview/:id"
                element={<QboxSingleViewAllPackages />}
              />
              <Route
                path="/allqboxes/view/singleviewqrhistory/:id"
                element={<SingleViewQRHistory />}
              />
              <Route path="/settingpage" element={<SettingPage />} />
              <Route
                path="/subscriptionmanagement"
                element={<SubscriptionManagementPage />}
              />
              <Route path="/revenue" element={<RevenuePage />} />
              <Route
                path="/serviceproviders"
                element={<ServiceProviderPage />}
              />
              <Route
                path="/serviceproviders/view/:id"
                element={<SingleViewServiceProvider />}
              />
              <Route
                path="/serviceproviders/view/allpackages/detailview/:id"
                element={<SingleViewAllPackages />}
              />
              <Route
                path="/serviceproviderrequest"
                element={<ServiceProviderRequestPage />}
              />
              <Route path="/rolepermissions" element={<RolePermissionPage />} />
              <Route path="/payouthistory" element={<PayoutHistoryPage />} />
              <Route
                path="/payouthistory/singleviewpayouthistory/:id"
                element={<SingleViewPayoutHistory />}
              />
              <Route path="/payoutrequests" element={<PayoutRequestPage />} />
              <Route
                path="/payoutrequests/singleviewrequesthistory/:id"
                element={<SingleViewPayoutRequest />}
              />
              <Route
                path="/payoutrequests/payoutrequestpackageview/:id"
                element={<PayoutRequestPackageDetail />}
              />
              <Route path="/allshipments" element={<AllShipmentsPage />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export { Sidebar };
