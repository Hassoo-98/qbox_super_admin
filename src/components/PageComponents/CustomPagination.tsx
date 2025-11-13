import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Flex, Select, Pagination } from "antd";
import type { PaginationProps } from "antd";

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

  // if (!total || total <= pageSize) return null;

  const itemRender: PaginationProps["itemRender"] = (page, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className="text-black">
       <LeftOutlined />Previous
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="text-black">
          Next <RightOutlined />
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
    <Flex justify="space-between" align="center" className="px-2 py-4">
      <Flex align="center" gap={8}>
        <span className="text-gray-500">Rows per page:</span>
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
          `Showing ${
            range[0]
          }-${range[1]} of ${total} items`
        }
      />
    </Flex>
  );
};
