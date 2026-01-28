import React, { useState } from "react";
// import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Card, Flex, Typography, Select } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../../sources/i18n";
import "./RevenueChart.css";
import { ModuleTopHeading } from "../../PageComponents";
const { Text } = Typography;

const RevenueChart: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [, setSelectedYear] = useState("2025");

  // const options: any = {
  //   chart: {
  //     type: "area",
  //     toolbar: {
  //       show: false,
  //     },
  //     zoom: {
  //       enabled: false,
  //     },
  //     fontFamily: "Inter, sans-serif",
  //   },
  //   colors: ["#1E3A5F", "#1E3A5F"], // Using deep blue/teal from image
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //     width: [3, 2],
  //     dashArray: [0, 5], // Solid for first, dashed for second
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 1,
  //       opacityFrom: 0.15,
  //       opacityTo: 0,
  //       stops: [0, 90, 100],
  //     },
  //   },
  //   grid: {
  //     borderColor: "#f1f1f1",
  //     strokeDashArray: 4,
  //     xaxis: {
  //       lines: {
  //         show: true,
  //       },
  //     },
  //     yaxis: {
  //       lines: {
  //         show: true,
  //       },
  //     },
  //   },
  //   xaxis: {
  //     categories: [
  //       t("Jan"),
  //       t("Feb"),
  //       t("Mar"),
  //       t("Apr"),
  //       t("May"),
  //       t("Jun"),
  //       t("Jul"),
  //       t("Aug"),
  //       t("Sep"),
  //       t("Oct"),
  //       t("Nov"),
  //       t("Dec"),
  //     ],
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //     labels: {
  //       style: {
  //         colors: "#94a3b8",
  //         fontSize: "12px",
  //       },
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       formatter: (val: number) => {
  //         if (val === 0) return "0";
  //         return `${val / 1000}k`;
  //       },
  //       style: {
  //         colors: "#94a3b8",
  //         fontSize: "12px",
  //       },
  //     },
  //     min: 0,
  //   },
  //   tooltip: {
  //     custom: function ({
  //       series,
  //       dataPointIndex,
  //     }: {
  //       series: number[][];
  //       seriesIndex: number;
  //       dataPointIndex: number;
  //       w: any;
  //     }) {
  //       const subRevenue = series[0][dataPointIndex];
  //       const pkgRevenue = series[1][dataPointIndex];
  //       return `
  //         <div class="custom-tooltip">
  //           <div class="tooltip-row">
  //             <span class="tooltip-label">${t("Subscription revenue")}</span>
  //             <span class="tooltip-value">SAR ${subRevenue.toLocaleString()}</span>
  //           </div>
  //           <div class="tooltip-row">
  //             <span class="tooltip-label">${t("Package revenue")}</span>
  //             <span class="tooltip-value">SAR ${pkgRevenue.toLocaleString()}</span>
  //           </div>
  //         </div>
  //       `;
  //     },
  //   },
  //   legend: {
  //     show: false,
  //   },
  //   markers: {
  //     size: 0,
  //     hover: {
  //       size: 5,
  //     },
  //   },
  // };

  // const series = [
  //   {
  //     name: "Subscription revenue",
  //     data: [
  //       0, 5000, 2000, 10000, 11000, 8000, 20000, 10000, 10000, 20000, 10000,
  //       20000,
  //     ],
  //   },
  //   {
  //     name: "Package revenue",
  //     data: [0, 3000, 1000, 6000, 6500, 5000, 8000, 6000, 6000, 8000, 6000, 0],
  //   },
  // ];


    const series = [
    {
      name: "Subscription revenue",
      data: [0, 5000, 2000, 10000, 11000, 8000, 20000, 12000, 12000, 20000, 12000, 22000],
    },
    {
      name: "Package revenue",
      data: [0, 3000, 1500, 8000, 7000, 5000, 12000, 8000, 8000, 12000, 7000, 2000],
    },
  ];

  
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    dataLabels: {
      enabled:false,
    },

    stroke: {
      curve: "smooth",
      width: [2, 2],
      dashArray: [0, 5], // second line dotted
    },

    colors: ["#28475c", "#9CA3AF"],

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },

    markers: {
      size: 4,
      strokeWidth: 0,
      hover: { size: 6 },
    },

    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      labels: {
        formatter: (val) => `${val / 1000}k`,
      },
    },

    grid: {
      strokeDashArray: 4,
      borderColor: "#E5E7EB",
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `SAR ${val.toLocaleString()}`,
      },
    },

    legend: {
      position: "top",
      horizontalAlign: "left",
      // markers: {
      //   radius: 12,
      // },
    },
  };
  return (
    <Card
      className='radius-12 border-light-gray card-shadow card-cs'
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <Flex justify="space-between" align="start" className="revenue-header">
        <Flex vertical>
          <Text className="fs-14">{t("Revenue")}</Text>
          <ModuleTopHeading name='SAR 32000'/>
        </Flex>
        <Select
          defaultValue="2025"
          style={{ width: 100 }}
          onChange={(value) => setSelectedYear(value)}
          options={[
            { value: "2025", label: "2025" },
            { value: "2024", label: "2024" },
            { value: "2023", label: "2023" },
          ]}
        />
      </Flex>
      {/* <div id="revenue-chart">
        <Chart options={options} series={series} type="area" height={350} />
      </div> */}
         <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
    </Card>
  );
};

export { RevenueChart };
