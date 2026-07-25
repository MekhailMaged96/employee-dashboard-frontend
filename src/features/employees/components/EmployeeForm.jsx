import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

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
});

function EmployeeForm({ employee, onSubmit, isSubmitting, onCancel }) {
  const isEdit = !!employee;
  const schema = isEdit ? editSchema : createSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: isEdit
      ? { name: employee.name, salary: employee.salary }
      : { name: "", username: "", email: "", password: "", salary: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <div className="mt-2 flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
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
