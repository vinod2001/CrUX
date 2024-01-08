import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";
import { MetricLists } from "../types/types";

type Props = {
  metricLists: any;
};
export const Chart = ({ metricLists }: any) => {
  console.log("metricLists", metricLists);

  const { items, formFactors, listItems } = metricLists;

  let seriesDataFinal: any = [];

  console.log("items",items);
  // This function will return required data format to highchart
  function createSeries() {
    let seriesData = [];
    let name: any = ["Good", "Need Improvement", "Poor"];
    let color: any = ["green", "orange", "red"];
    for (let key in items) {
      let count = 0;
      for (let i in items[key]) {
        seriesData.push({
          name: name[count],
          type: "bar",
          color: color[count],
          data: [Math.round(items[key][i] * 100)],
        });
        count++;
      }
    }
    console.log("seriesData", seriesData);

    seriesData.filter((el) => {
      if (el.name === "Good") {
        if (seriesDataFinal.hasOwnProperty("Good")) {
          seriesDataFinal["Good"].data.push(el.data[0]);
        } else {
          seriesDataFinal["Good"] = el;
        }
      }
      if (el.name === "Need Improvement") {
        if (seriesDataFinal.hasOwnProperty("Need Improvement")) {
          seriesDataFinal["Need Improvement"].data.push(el.data[0]);
        } else {
          seriesDataFinal["Need Improvement"] = el;
        }
      }
      if (el.name === "Poor") {
        if (seriesDataFinal.hasOwnProperty("Poor")) {
          seriesDataFinal["Poor"].data.push(el.data[0]);
        } else {
          seriesDataFinal["Poor"] = el;
        }
      }
    });

    console.log("seriesDataFinal", seriesDataFinal);
  }
  createSeries();

  const chartOptions: Options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: formFactors,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      seriesDataFinal.Good,
      seriesDataFinal["Need Improvement"],
      seriesDataFinal.Poor,
    ],
  };

  return (
    <div style={{ height: "100%" }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
        style={{ height: "100%" }}
      />
    </div>
  );
};
