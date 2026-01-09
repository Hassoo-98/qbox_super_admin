import { useState } from "react";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import i18n from "../../sources/i18n";

const LanguageChange = () => {
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");

  const items: MenuProps["items"] = [
    {
      key: "en",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={"https://flagcdn.com/w20/us.png"} width={22} />
          English
        </span>
      ),
    },
    {
      key: "ar",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={"https://flagcdn.com/w20/sa.png"} width={22} />
          العربية
        </span>
      ),
    },
  ];

  const handleSelect: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key); // <-- NOW WORKS
    setSelectedLang(key);
  };

  return (
    <Dropdown menu={{ items, onClick: handleSelect }} trigger={["click"]}>
      <Button type="text" icon={<DownOutlined />}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={
              selectedLang === "en"
                ? "https://flagcdn.com/w20/us.png"
                : "https://flagcdn.com/w20/sa.png"
            }
            width={22}
          />
          {selectedLang === "en" ? "Eng" : "العربية"}
        </span>
      </Button>
    </Dropdown>
  );
};

export { LanguageChange };
