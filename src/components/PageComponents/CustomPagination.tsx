import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Flex, Select, Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";

interface CustomPaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onPageChange: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  pageSize,
  current,
  onPageChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  const { t } = useTranslation();
     const isRTL = i18n.language === "ar";
     
       

  const itemRender: PaginationProps["itemRender"] = (
    page,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <a className="text-black">
          <LeftOutlined /> {t("Previous")}
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="text-black">
          {t("Next")} <RightOutlined />
        </a>
      );
    }
    if (type === "page") {
      const isActive = page === current;
      return (
        <a
          className={isActive ? "ant-pagination-item-active" : ""}
          style={{
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#1677ff" : "inherit",
          }}
        >
          {page.toString()}
        </a>
      );
    }
    return originalElement;
  };

  return (
    <Flex justify="space-between" align="center" className="px-2 py-4"   style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Flex align="center" gap={8}>
        <span className="text-gray-500">{t("Rows per page:")}</span>
        <Select
          value={pageSize}
          onChange={(value) => onPageChange(1, value)}
          options={pageSizeOptions.map((size) => ({
            value: size,
            label: size,
          }))}
          className="filter-pag w-80"
        />
      </Flex>

      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        showLessItems
        className={`pagination `}
        itemRender={itemRender}
        showTotal={(total, range) =>
          `${t("Showing")} ${range[0]}-${range[1]} ${t("of")} ${total} ${t(
            "items"
          )}`
        }
      />
    </Flex>
  );
};
