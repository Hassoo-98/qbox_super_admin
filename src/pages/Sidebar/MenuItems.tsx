import { useMemo } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

// MenuItem Type
interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  type?: "group" | "divider";
  className?: string;
}

// Props
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
  const { t } = useTranslation();

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        type: "group",
        label: t("DASHBOARD"),
        key: "header",
        className: "heading-menu",
      },

      getItem(
        t("Dashboard Overview"),
        "1",
        currentTab === "1" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="dashboard icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="dashboard gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-1",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("CLIENT MANAGEMENT"),
        key: "header-1",
        className: "heading-menu",
      },

      getItem(
        t("Home Owners"),
        "2",
        currentTab === "2" ? (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="customer icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="customer gray icon"
          />
        )
      ),

      getItem(
        t("Requests Queue"),
        "3",
        currentTab === "3" ? (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="promotions icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="promotions gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-2",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("QBOX MANAGEMENT"),
        key: "header-2",
        className: "heading-menu",
      },

      getItem(
        t("All QBoxes"),
        "4",
        currentTab === "4" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("Installment Pending"),
        "5",
        currentTab === "5" ? (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-3",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("SUBSCRIPTION & REVENUE"),
        key: "header-3",
        className: "heading-menu",
      },

      getItem(
        t("Subscription Management"),
        "14",
        currentTab === "14" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("Revenue Management"),
        "15",
        currentTab === "15" ? (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/window.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-4",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("SHIPPING MANAGEMENT"),
        key: "header-4",
        className: "heading-menu",
      },

      getItem(
        t("Service Providers"),
        "6",
        currentTab === "6" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("All Shipments"),
        "7",
        currentTab === "7" ? (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("Service Provider Requests"),
        "8",
        currentTab === "8" ? (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-7",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("PAYOUTS MANAGEMENT"),
        key: "header-7",
        className: "heading-menu",
      },

      getItem(
        t("Payout History"),
        "16",
        currentTab === "16" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("Payout Requests"),
        "17",
        currentTab === "17" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-5",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("SYSTEM MANAGEMENT"),
        key: "header-5",
        className: "heading-menu",
      },

      getItem(
        t("Staffs"),
        "9",
        currentTab === "9" ? (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/bag.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("Role & Permission"),
        "10",
        currentTab === "10" ? (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      getItem(
        t("QR Logs"),
        "11",
        currentTab === "11" ? (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="booking gray icon"
          />
        )
      ),

      {
        type: "divider",
        key: "divider-6",
        className: "bg-divider my-3",
        label: "",
      },

      {
        type: "group",
        label: t("ADMIN SETTINGS"),
        key: "header-6",
        className: "heading-menu",
      },

      getItem(
        t("Setting"),
        "12",
        currentTab === "12" ? (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="setting icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="setting gray icon"
          />
        )
      ),

      getItem(
        t("Activity Log"),
        "13",
        currentTab === "13" ? (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="setting icon"
          />
        ) : (
          <img
            src="/assets/icons/side-icon/file.png"
            width={20}
            alt="setting gray icon"
          />
        )
      ),
    ],
    [currentTab, t]
  );

  return menuItems;
};

export { MenuItems };
