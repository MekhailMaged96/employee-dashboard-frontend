import Button from "../../../components/Button/Button";

function EmployeeRow({ employee, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-900">{employee.id}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-50 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
            {employee.name}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {employee?.user?.email}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {employee?.department?.name ?? "N/A"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {employee?.user?.roles.join(", ")}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            employee.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {employee.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(employee)}
          >
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(employee)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;
