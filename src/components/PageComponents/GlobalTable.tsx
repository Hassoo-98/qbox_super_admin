import React from "react";
import { Card, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { ModuleTopHeading, CustomPagination } from "./";
import { useTranslation } from "react-i18next";
import i18n from "../../sources/i18n";

const { Text } = Typography;

interface GlobalTableProps<T> extends Omit<TableProps<T>, "title"> {
  title?: string;
  description?: string;
  extra?: React.ReactNode;
  filters?: React.ReactNode;
  paginationProps?: {
    total: number;
    current: number;
    pageSize: number;
    onPageChange: (page: number, pageSize: number) => void;
  };
}

export const GlobalTable = <T extends object>({
  title,
  description,
  extra,
  filters,
  paginationProps,
  columns,
  dataSource,
  loading,
  scroll = { x: 1300 },
  className = "",
  ...props
}: GlobalTableProps<T>) => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Card
      className="radius-12 border-gray card-cs h-100"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <Flex vertical gap={10} className="mb-2">
        <Flex justify="space-between" align="center">
          <Flex vertical>
            {title && <ModuleTopHeading level={5} name={t(title)} />}
            {description && (
              <Text className="text-gray fs-13">{t(description)}</Text>
            )}
          </Flex>
          {extra}
        </Flex>
        {filters && <div className="mt-2">{filters}</div>}
      </Flex>

      <Flex vertical>
        <Table<T>
          size="large"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          className={`pagination table-cs table ${className}`}
          showSorterTooltip={false}
          scroll={scroll}
          rowHoverable={false}
          pagination={false}
          {...props}
        />
        {paginationProps && (
          <CustomPagination
            total={paginationProps.total}
            current={paginationProps.current}
            pageSize={paginationProps.pageSize}
            onPageChange={paginationProps.onPageChange}
          />
        )}
      </Flex>
    </Card>
  );
};
