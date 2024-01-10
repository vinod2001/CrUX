import axios from "axios";
import {useQueries } from "@tanstack/react-query";

type Props = {
  url: string;
};
const fetchCrux = (url: string, type: string, metricLists: []) => {
  return axios.post(
    `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${process.env.REACT_APP_API_KEY}`,
    {
      formFactor: type,
      origin: url,
      metrics: metricLists,
    }
  );
};
export const useCrUXfetchHook: any = (
  url: string,
  formFactors: [],
  metricLists: []
) => {
  //   return useQuery({
  //     queryKey: ["crux-fetch"],
  //     queryFn: () => fetchCrux(url,type, metricLists),
  //     enabled: false,
  //   });

  // This handles multiple API calls
  console.log("hook formFactors",formFactors)

  const dataList = useQueries({
    queries: formFactors.map((type, index) => {
      return {
        queryKey: [type, index],
        queryFn: () => {
          return url.length > 0 ? fetchCrux(url, type, metricLists) : null;
        },
        retry : false,
        cache : false,
        stale : false,
        refetchOnWindowFocus: false
      };
    }),
    // combine: (results) => {
    //   return ({
    //     data: results.map(result => result.data),
    //     pending: results.some(result => result.isPending),
    //   })
    // }
  });

  const isLoaded = dataList.some(dataList => {
    return dataList.data;
  })

  const error = dataList.some(dataList => {
    return dataList.error;
  })

  const errorMsg = dataList.map((dataList,index)=>{
    if(dataList.error !== null){
      console.log("error res", JSON.stringify(dataList.error))
      console.log("error List",{error:dataList.error.message,type:formFactors[index]})
      return {error:dataList.error.message,type:formFactors[index]}
    }
  }).filter(item => item);

  console.log("erroMsg",errorMsg);
  return {isLoaded,dataList, error, errorMsg}
  
};
