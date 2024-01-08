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
  //     queryFn: () => fetchCrux(url),
  //     enabled: false,
  //   });

  // This handles multiple API calls
  return useQueries({
    queries: formFactors.map((type, index) => {
      return {
        queryKey: ["crux-fetch", index],
        queryFn: () => {
          return url.length > 0 ? fetchCrux(url, type, metricLists) : null;
        },
      };
    }),
  });
};
