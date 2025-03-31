/*
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../src/utils/validation";
import inputfield from "../src/component/inputfield";
import { useLogin } from "../src/hook/uselogin";
import React from "react";
import InputField from "./component/inputfield";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useLogin();

  const onSubmit = (data: { uid: string; password: string }) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField label="UID" {...register("uid")} error={errors.uid?.message} />
          <InputField label="Password" type="password" {...register("password")} error={errors.password?.message} />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' ? "Logging in..." : "Login"}
          </button>
          {mutation.isError && <p className="text-red-500 text-sm">{mutation.error.message}</p>}
        </form>
      </div>
    </div>
  );
}
*/
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// Define validation schema
const loginSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      return response.json();
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome back!</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="UID"
              {...register("uid")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.uid && <p className="text-red-500 text-sm">{errors.uid.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' ? "Logging in..." : "Login"}
          </button>
          {mutation.isError && <p className="text-red-500 text-sm">{(mutation.error as Error).message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;