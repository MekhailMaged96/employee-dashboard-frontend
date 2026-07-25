import { useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import SearchInput from "../../../components/SearchInput/SearchInput";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployees } from "../hooks/useEmployees";
import {
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from "../hooks/useEmployeeMutations";
import { useDebounce } from "../../../hooks/useDebounce";

const EmployeesPage = () => {
  const { data: employees = [], isLoading } = useEmployees();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const filteredEmployees = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((emp) =>
      `${emp.name} ${emp.user?.email ?? ""}`.toLowerCase().includes(term)
    );
  }, [employees, debouncedSearch]);

  const openCreate = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const handleDelete = (employee) => {
    setDeletingEmployee(employee);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingEmployee(null);
  };

  const handleFormSubmit = (data) => {
    if (editingEmployee) {
      updateEmployee.mutate(
        { id: editingEmployee.id, data },
        { onSuccess: closeForm }
      );
    } else {
      createEmployee.mutate(data, { onSuccess: closeForm });
    }
  };

  const confirmDelete = () => {
    deleteEmployee.mutate(deletingEmployee.id, {
      onSuccess: () => setDeletingEmployee(null),
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={openCreate}>Add Employee</Button>
      </div>

      <div className="mb-4 max-w-sm">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
        />
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={formOpen}
        onClose={closeForm}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
      >
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          isSubmitting={createEmployee.isPending || updateEmployee.isPending}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingEmployee}
        message={`Delete "${deletingEmployee?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingEmployee(null)}
        loading={deleteEmployee.isPending}
      />
    </div>
  );
};

export default EmployeesPage;
