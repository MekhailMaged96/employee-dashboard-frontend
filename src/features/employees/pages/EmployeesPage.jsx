import Button from "../../../components/Button/Button";
import EmployeeTable from "../components/EmployeeTable";
import { useEmployees } from "../hooks/useEmployees";

const EmployeesPage = () => {
  const { data: employees = [], isLoading } = useEmployees();

  console.log("employees", employees);

  const handleEdit = (employee) => {
    console.log("edit", employee);
  };

  const handleDelete = (employee) => {
    console.log("delete", employee);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button>Add Employee</Button>
      </div>

      <EmployeeTable
        employees={employees}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeesPage;
