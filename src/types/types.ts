export type MetricList = {
  histogram: {
    density: number;
  }[];
};
export type MetricLists = {
  name: string;
  metricList: MetricList;
};
