import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chart } from "./Chart";
import { useCrUXfetchHook } from "../hooks/useCrUXfetchHook";
import { useDataListItems } from "../hooks/useDataListItems";

function createData(name: string, chart: any) {
  return { name, chart };
}

//Passing data to Chart components
function ChartData(items: any, listItems: any, formFactors: any) {
  return (
    <div style={{ height: "200px" }}>
      <Chart metricLists={{ items, listItems, formFactors }} />
    </div>
  );
}

type Props = {
  url: string;
  formFactors: string[];
  metricType: string[];
  isSearchTriggered?: boolean;
};

export default function TableData({
  url,
  formFactors,
  metricType,
  //isSearchTriggered,
}: Props) {
  const {dataList, isLoaded} = useCrUXfetchHook(url, formFactors, metricType);
  const { datListItems } = useDataListItems(dataList);
  const [rows, setRows] = React.useState<any[]>([]);


  console.log("datListItems", datListItems);

  let allMetricLists: any = {
    metricType,
    data: {},
  };

  //filter fetched datas from React Query
  function filterDatas() {
    let dataDetails: any = {};
    if (datListItems.data0 !== null) {
      for (let key in datListItems) {
        if (key.indexOf("data") > -1 && datListItems[key]) {
          dataDetails[`${datListItems[key].data.record.key.formFactor}`] =
            datListItems[key].data.record.metrics;
        }
      }
    }
    console.log("filterDatas", dataDetails);
    allMetricLists.data = dataDetails;
  }

  filterDatas();

  let listItems: any = [{}];

  // this function will handle to massage the multiple API data to make a apt
  // JSON format which can read for Table and Chart
  function createMetricLists() {
    for (let type in formFactors) {
      for (let i in allMetricLists.data) {
        console.log("inside allMetricLists",allMetricLists.data)
        if (i.indexOf(formFactors[type]) > -1) {
          for (let key in allMetricLists.data[i]) {
            for (let histo in allMetricLists.data[i][key].histogram) {
              if (
                Object.keys(listItems[0]).length > 0 &&
                listItems[0].hasOwnProperty([`${key}`]) &&
                listItems[0][`${key}`].hasOwnProperty([`${formFactors[type]}`])
              ) {
                listItems[0][`${key}`][`${formFactors[type]}`].push(
                  allMetricLists.data[i][key].histogram[histo]?.density
                );
              } else {
                if (!listItems[0].hasOwnProperty([`${key}`])) {
                  listItems[0][`${key}`] = {};
                  console.log("else if",listItems[0][`${key}`])
                }
                listItems[0][`${key}`][`${formFactors[type]}`] = [
                  allMetricLists.data[i][key].histogram[histo]?.density,
                ];
              }
            }
          }
        }
      }
    }
   
  }
  createMetricLists();

  console.log("listItems", JSON.stringify(listItems[0]));

  console.log("allMetricLists", allMetricLists);
  console.log("metricType", metricType);

  React.useEffect(() => {
    setRows([]);
    if (datListItems.data0 && metricType) {
      for (let key in listItems[0]) {
        setRows((pre) => [
          ...pre,
          createData(
            key,
            ChartData(listItems[0][key], listItems[0], formFactors)
          ),
        ]);
      }
    }
  }, [datListItems.data0, metricType]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#333", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Metrics
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold" }}
                align="left"
                style={{ width: "70%" }}
              >
                Data Chart
              </TableCell>
            </TableRow>
          </TableHead>
          {rows.length > 0 && (
            <TableBody>
              {rows.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {}
                    {row.name}
                  </TableCell>
                  <TableCell align="right" sx={{ background: "#f2f2f2" }}>
                    {row.chart}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
