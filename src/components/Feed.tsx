import {
  Box,
  InputBase,
  styled,
  Toolbar,
  Button,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import TableData from "./TableData";
import { useCrUXfetchHook } from "../hooks/useCrUXfetchHook";
import { useDataListItems } from "../hooks/useDataListItems";
import MetricListBox from "./MetricListBox";
import { formFactors, metricLists } from "../constants/contants";
import CustomizedDialogs from "./Dialog";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  border: "0px solid",
  width: "60%",
});
const Search = styled("div")(({ theme }) => ({
  background: "white",
  borderRadius: theme.shape.borderRadius,
  padding: "0 10px",
  width: "80%",
  border: "1px solid #999",
}));
function Feed() {
  const [url, setUrl] = React.useState("");
  const [reset, setReset] = React.useState(false)
  const [metricType, setMetricType] = React.useState(metricLists);
  const [formTypes, setFormTypes] = React.useState(formFactors);
  // useCrUXfetchHook provides the lists of data's from API along with Other API's provided by React Query
  const {dataList, isLoaded, error, errorMsg} = useCrUXfetchHook(url, formTypes.sort(), metricType);



  // useDataListItems destructuring the received data from useCrUXfetchHook. This will help to 
  // other use cases
  const { datListItems } = useDataListItems(dataList);

  console.log("datListItems", datListItems);

  //accessing refetch function provided through react query hook and listing them based on dataListItems
  // This function will trigger the API calls based on number of FormFactors
  const handleSearchClick = () => {
    console.log()
    for (let key in datListItems) {
      
      if (key.indexOf("refetch") > -1) {
        console.log("handleSearchClick",key)
        datListItems[key]();
      }
    }
    setReset(false);
  };

  // const { isLoading, isFetching, data, refetch, error } = dataList[0];
  // const { isLoading: secondLoading, refetch: secondReFetch } = dataList[1];
  console.log(dataList);

  console.log(datListItems);
  return (
    <Box width={"100%"}>
      <Box
        p={2}
        width={"100%"}
        sx={{ border: "0px solid", display: "flex", justifyContent: "center" }}
      >
        <StyledToolbar>
          <Search>
            <InputBase
              placeholder="search...."
              sx={{ width: "100%" }}
              onChange={(e) => {
                setReset(true)
                setUrl(e.target.value)
              }}
            />
          </Search>
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={() => {
              handleSearchClick();
            }}
          >
            Search
          </Button>
        </StyledToolbar>
      </Box>
      <Box>
        
          <>
            <Box sx={{ display: "flex" }}>
              <MetricListBox
                metricType={metricType}
                setMetricType={setMetricType}
                metricLists={metricLists}
                name={"Metric"}
                setReset={setReset}
                handleSearchClick={handleSearchClick}
              />
              <MetricListBox
                metricType={formTypes}
                setMetricType={setFormTypes}
                metricLists={formFactors}
                name={"Form Type"}
                setReset={setReset}
                handleSearchClick={handleSearchClick}
              />
            </Box>
            {(error && !reset) && (<div><CustomizedDialogs errorMsg={errorMsg}/></div>)}
            {(isLoaded && !reset)&& (
              <TableData
                url={url}
                formFactors={formTypes}
                metricType={metricType}
              />
            )}
          </>
        
      </Box>
    </Box>
  );
}

export default Feed;
