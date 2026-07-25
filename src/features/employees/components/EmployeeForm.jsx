import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import { useDepartments } from "../../departments/hooks/useDepartments";

const createSchema = z.object({
  name: z.string().min(1, "Name is required."),
  username: z.string().min(1, "Username is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  password: z.string().min(6, "Min 6 characters."),
  salary: z.coerce.number().positive("Salary must be greater than 0."),
});

const editSchema = z.object({
  name: z.string().min(1, "Name is required."),
  salary: z.coerce.number().positive("Salary must be greater than 0."),
  departmentId: z.coerce.number({ invalid_type_error: "Department is required." }),
});

function EmployeeForm({ employee, onSubmit, isSubmitting, onCancel }) {
  const isEdit = !!employee;
  const schema = isEdit ? editSchema : createSchema;
  const { data: departments = [] } = useDepartments();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: isEdit
      ? {
          name: employee.name,
          salary: employee.salary,
          departmentId: employee.department?.id ?? "",
        }
      : { name: "", username: "", email: "", password: "", salary: "" },
  });

  const handleFormSubmit = (data) => {
    if (isEdit) {
      const { departmentId, ...rest } = data;
      onSubmit({ ...rest, department: { id: departmentId } });
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <Input
        label="Name"
        name="name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
      />

      {!isEdit && (
        <>
          <Input
            label="Username"
            name="username"
            placeholder="johndoe"
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Min 6 characters"
            error={errors.password?.message}
            {...register("password")}
          />
        </>
      )}

      <Input
        label="Salary"
        name="salary"
        type="number"
        step="0.01"
        placeholder="0.00"
        error={errors.salary?.message}
        {...register("salary")}
      />

      {isEdit && (
        <Select
          label="Department"
          name="departmentId"
          options={departments}
          placeholder="Select department"
          error={errors.departmentId?.message}
          {...register("departmentId")}
        />
      )}

      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? "Save Changes" : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}

export default EmployeeForm;
