import React from "react";
import { Card, Breadcrumb, Typography } from "antd";
import { NavLink } from "react-router-dom";

const { Text } = Typography;

// ✅ Define the type for each breadcrumb item
interface BreadCrumbItem {
  title: string;
  to?: string;
}

// ✅ Define the component props
interface BreadCrumbProps {
  items?: BreadCrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  items = [],
  separator = "/",
  className = "",
}) => {
  return (
    <Card className={`card-bg card-cs radius-12 border-gray ${className}`}>
      <Breadcrumb
        separator={separator}
        items={items.map((item, index) => ({
          title: item.to ? (
            <NavLink
              to={item.to}
              className={`fs-13 text-gray ${
                index === items.length - 1 ? "fw-500 text-black" : ""
              }`}
            >
              {item.title}
            </NavLink>
          ) : (
            <Text
              className={
                index === items.length - 1
                  ? "fw-500 fs-14 text-black"
                  : "fs-13 text-gray"
              }
            >
              {item.title}
            </Text>
          ),
        }))}
      />
    </Card>
  );
};

export { BreadCrumb };
