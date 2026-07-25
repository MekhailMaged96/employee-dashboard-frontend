import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { getEmployees } from "../services/employeeService";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await getEmployees();
      return response;
    },
  });
};
