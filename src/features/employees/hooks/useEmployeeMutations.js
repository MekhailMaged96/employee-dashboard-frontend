import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created.");
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee updated.");
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    // Runs BEFORE the request is sent — this is what makes it "optimistic".
    onMutate: async (id) => {
      // Stop any in-flight refetch from overwriting our optimistic edit.
      await queryClient.cancelQueries({ queryKey: ["employees"] });

      // Snapshot every cached "employees" page so we can restore on failure.
      const previousPages = queryClient.getQueriesData({ queryKey: ["employees"] });

      // Remove the row from every cached page immediately (UI updates now, not after the server responds).
      queryClient.setQueriesData({ queryKey: ["employees"] }, (old) => {
        if (!old?.content) return old;
        return { ...old, content: old.content.filter((emp) => emp.id !== id) };
      });

      // Handed to onError as `context` if the mutation fails.
      return { previousPages };
    },

    onError: (err, id, context) => {
      // Roll back to the snapshot — the optimistic delete didn't actually happen.
      context?.previousPages?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error("Failed to delete employee. Reverted.");
    },

    onSettled: () => {
      // Always resync with the server once the mutation finishes (success or fail).
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },

    onSuccess: () => {
      toast.success("Employee deleted.");
    },
  });
};
