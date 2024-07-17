import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { ChatSnapshot } from "../../generated";
import { useConfigStore } from "@/stores";

const BASE_URL = env.NEXT_PUBLIC_FETCH_URL;
// const BASE_URL = `//${window.location.host}/api`

export const fetchChatHistory = async (token: string): Promise<ChatSnapshot[]> => {
  const response = await fetch(`${BASE_URL}/history`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch chat history");
  }
  const data = await response.json();
  return data.snapshots;
};

export const useChatHistory = () => {
  const { token } = useConfigStore();
  return useQuery<ChatSnapshot[], Error>({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      return fetchChatHistory(token);
    },
    retry: false,
  });
};
