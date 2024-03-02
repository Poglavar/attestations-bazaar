// Utility function to extract specific data by key
export const extractDataByKey = (decodedData: any[], key: string) => {
  const foundObject = decodedData.find((obj) => obj.name === key)
  return foundObject ? foundObject.value.value : undefined
}
