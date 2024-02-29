import axios from "axios";
import qs from "qs";
import Constants from "expo-constants";

const baseURL = Constants?.expoConfig?.hostUri
  ? `http://${Constants.expoConfig?.hostUri?.split(`:`)?.shift()}:3000`
  : process.env.EXPO_PUBLIC_API_BASE_URL;

type AccType = {
  arrayParams: any;
  nonArrayParams: any;
};

const customParamSerializer = (params: any): string => {
  const { arrayParams, nonArrayParams } = Object.entries(params).reduce(
    (acc: AccType, [key, value]) => {
      if (Array.isArray(value)) {
        acc.arrayParams[key] = value;
      } else {
        acc.nonArrayParams[key] = value;
      }
      return acc;
    },
    { arrayParams: {}, nonArrayParams: {} } as AccType
  );

  const serializedNonArrayParams = qs.stringify(nonArrayParams, {
    skipNulls: true,
  });
  const serializedArrayParams = qs.stringify(arrayParams, {
    arrayFormat: "repeat",
  });

  return `${serializedNonArrayParams}${
    serializedArrayParams ? `&${serializedArrayParams}` : ""
  }`;
};

export default axios.create({
  baseURL: `${baseURL}/api/`,
  paramsSerializer: customParamSerializer,
});
