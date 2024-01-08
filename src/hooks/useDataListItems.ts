export function useDataListItems(dataList: any) {
  let datListItems: any = {};
  for (let i in dataList) {
    datListItems[`isLoading${i}`] = dataList[i].isLoading;
    datListItems[`data${i}`] = dataList[i].data;
    datListItems[`refetch${i}`] = dataList[i].refetch;
  }
  return { datListItems };
}
