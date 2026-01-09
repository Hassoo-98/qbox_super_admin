// src/components/PageComponents/ModuleTopHeading.tsx
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Space, Button, Typography } from "antd";
import i18n from "../../sources/i18n";

const { Title } = Typography;

interface ModuleTopHeadingProps {
  name: string;
  onClick?: () => void;
  level?: 1 | 2 | 3 | 4 | 5;
}

export const ModuleTopHeading: React.FC<ModuleTopHeadingProps> = ({
  name,
  onClick,
  level = 4,
}) => {
     const isRTL = i18n.language === "ar";
       
     
  return (
    <Space className="align-center"   style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Title level={level} className="my-0 fw-500">
        {name}
      </Title>

      {onClick && (
        <Button
          className="my-0"
          type="primary"
          shape="circle"
          size="small"
          style={{
            color: "var(--white-text)",
            backgroundColor: "var(--brand-color)",
          }}
          icon={<PlusOutlined />}
          onClick={onClick}
        />
      )}
    </Space>
  );
};
