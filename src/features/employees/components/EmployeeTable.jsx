import EmployeeRow from "./EmployeeRow";
import Loader from "../../../components/Loader/Loader";

const columns = [
  "#",
  "Name",
  "Email",
  "Department",
  "Salary",
  "Role",
  "Actions",
];

function EmployeeTable({ employees = [], isLoading, onEdit, onDelete }) {
  if (isLoading) return <Loader />;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-gray-400"
              >
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <EmployeeRow
                key={emp.id}
                employee={emp}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
