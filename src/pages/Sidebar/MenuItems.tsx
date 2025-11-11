import { useMemo } from "react";
import type { ReactNode } from "react";
import type { MenuProps } from "antd";

// MenuItem ka type define karte hain
interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  type?: "group" | "divider";
  className?: string;
}

// Props type
interface MenuItemsProps {
  currentTab: string;
}

// Helper function
const getItem = (label: string, key: string, icon?: ReactNode): MenuItem => ({
  key,
  icon,
  label,
});

const MenuItems = ({ currentTab }: MenuItemsProps): MenuItem[] => {
  const menuItems = useMemo<MenuItem[]>(
    () => [
      { type: "group", label: "DASHBOARD", key: "header", className: "heading-menu" },
      getItem(
        "Dashboard Overview",
        "1",
        currentTab === "1" ? (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="dashboard icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="dashboard gray icon" fetchPriority="high" />
        )
      ),

      { type: "divider", key: "divider-1", className: "bg-divider my-3", label:''},
      { type: "group", label: "LOCKER MANAGEMENT", key: "header-1", className: "heading-menu" },
      getItem(
        "Home Owners",
        "2",
        currentTab === "2" ? (
          <img src="/assets/icons/side-icon/window.png" width={20} alt="customer icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/window.png" width={20} alt="customer gray icon" fetchPriority="high" />
        )
      ),
      getItem(
        "Requests Queue",
        "3",
        currentTab === "3" ? (
          <img src="/assets/icons/side-icon/window.png" width={20} alt="promotions icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/window.png" width={20} alt="promotions gray icon" fetchPriority="high" />
        )
      ),

      { type: "divider", key: "divider-2", className: "bg-divider my-3", label:'' },
      { type: "group", label: "QBOX MANAGEMENT", key: "header-2", className: "heading-menu" },
      getItem(
        "All QBoxes",
        "4",
        currentTab === "4" ? (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),

      { type: "divider", key: "divider-3", className: "bg-divider my-3", label:''},
      { type: "group", label: "SHIPPING MANAGEMENT", key: "header-3", className: "heading-menu" },
      getItem(
        "Service Providers",
        "5",
        currentTab === "5" ? (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),
      getItem(
        "All Drivers",
        "6",
        currentTab === "6" ? (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),
      getItem(
        "All Shipments",
        "7",
        currentTab === "7" ? (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),

      { type: "divider", key: "divider-4", className: "bg-divider my-3", label:'' },
      { type: "group", label: "SYSTEM MANAGEMENT", key: "header-4", className: "heading-menu" },
      getItem(
        "Staffs",
        "8",
        currentTab === "8" ? (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/bag.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),
      getItem(
        "Role & Permission",
        "9",
        currentTab === "9" ? (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),
      getItem(
        "QR Logs",
        "10",
        currentTab === "10" ? (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="booking gray icon" fetchPriority="high" />
        )
      ),

      { type: "divider", key: "divider-5", className: "bg-divider my-3", label:'' },
      { type: "group", label: "ADMIN SETTINGS", key: "header-5", className: "heading-menu" },
      getItem(
        "Setting",
        "11",
        currentTab === "11" ? (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="setting icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="setting gray icon" fetchPriority="high" />
        )
      ),
      getItem(
        "Activity Log",
        "12",
        currentTab === "12" ? (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="setting icon" fetchPriority="high" />
        ) : (
          <img src="/assets/icons/side-icon/file.png" width={20} alt="setting gray icon" fetchPriority="high" />
        )
      ),
    ],
    [currentTab]
  );

  return menuItems;
};

export { MenuItems };
