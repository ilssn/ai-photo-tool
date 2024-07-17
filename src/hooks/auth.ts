import { useQuery } from "@tanstack/react-query";
// import { env } from "@/env.mjs";

const AUTH_URL = process.env.NEXT_PUBLIC_302AI_AUTH;

export const fetchAuth= async (user: string, token: string): Promise<any> => {
  const response = await fetch(`${AUTH_URL}/${user}?pwd=${token}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch auth");
  }
  const data = await response.json();
  return data;
};

export const useAuth = (user: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["auth"],
    queryFn: async () => {
      return fetchAuth(user, token);
    },
    retry: false,
  });
};
