import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:justify-start"
      style={{
        backgroundImage: "url('/Frame 1216257562.png')",
      }}
    >
      {/* Form container */}
      <div
        className="w-full sm:w-[554px] bg-transparent backdrop-blur-md border border-gray-200 p-6 sm:p-8 rounded-2xl sm:ml-10"
      >
        <LoginForm />
      </div>
    </div>
  );
}
