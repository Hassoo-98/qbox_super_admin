declare module "react-apexcharts" {
  import { Component } from "react";
  import { ApexOptions } from "apexcharts";

  interface Props {
    type?:
      | "line"
      | "area"
      | "bar"
      | "histogram"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "treemap"
      | "boxPlot"
      | "candlestick"
      | "radar"
      | "polarArea";
    series?: any[];
    options?: ApexOptions;
    width?: string | number;
    height?: string | number;
    [key: string]: any;
  }

  export default class Chart extends Component<Props> {}
}
