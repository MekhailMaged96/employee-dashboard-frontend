import Button from "../../../components/Button/Button";

const EmployeesPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>

        <Button>Add Employee</Button>
      </div>
    </div>
  );
};

export default EmployeesPage;
