import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock ,FaEye, FaEyeSlash } from "react-icons/fa";
type FormValues = { email: string; password: string };

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setLoading(true);
    try {
      await axios.post("/api/auth/login", data);
      router.push("/dashboard");
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Login failed";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const emailVal = watch("email");
  const passwordVal = watch("password");
  const disable = !emailVal || !passwordVal || !!errors.email;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[381px] text-center"
    >
      <h1 className="text-[56px] font-normal text-[#1A1A1E] leading-[100%] mb-4 font-[ABeeZee]">
        Welcome back
      </h1>

      <p className="text-[18px] font-normal text-[#62626B] leading-[155%] mb-8 font-[ABeeZee]">
        Step into our shopping metaverse for an unforgettable shopping
        experience
      </p>

      <div className="mb-4 relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
className="w-full h-[57px] pl-12 pr-4 rounded-[8px] border border-gray-300 text-[16px] outline-none bg-white text-black"
        />
      </div>


<div className="mb-6 relative">
  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    {...register("password", { required: "Password is required" })}
    className="w-full h-[57px] pl-12 pr-10 rounded-[8px] border border-gray-300 text-[16px] outline-none bg-white text-black"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>


      {serverError && (
        <p className="text-red-500 text-sm mb-2">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={disable || loading}
      
  className="w-full h-[57px] rounded-[8px] text-white text-[16px] cursor-pointer"
        style={{ backgroundColor: "#9414FF" }}
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <p className="mt-4 text-[16px] text-[#62626B] leading-[155%] font-[ABeeZee]">
        Don’t have an account?{" "}
        <a href="#" className="underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
