import { useQuery } from "@tanstack/react-query";
import { getEmployeesPaged } from "../services/employeeService";

export const useEmployees = (page, pageSize) => {
  return useQuery({
    queryKey: ["employees", page, pageSize],
    queryFn: async () => {
      const response = await getEmployeesPaged(page, pageSize);
      return response;
    },
  });
};
