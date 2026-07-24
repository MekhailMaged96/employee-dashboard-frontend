import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/employees");
      return response;
    },
  });
};
