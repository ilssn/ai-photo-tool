import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
// import { ChatSnapshot } from "../../generated";

const HOT_URL = env.NEXT_PUBLIC_HOT_URL;

export const fetchHot= async (): Promise<any> => {
  const response = await fetch(`${HOT_URL}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch hot");
  }
  const data = await response.json();
  return data.realtimehot;
};

export const useHot = () => {
  return useQuery<any, Error>({
    queryKey: ["hot"],
    queryFn: async () => {
      return fetchHot();
    },
    retry: false,
  });
};
