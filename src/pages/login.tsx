import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: "url('/Frame 1216257562.png')",
      }}
    >

      <div
        className="p-8 rounded-2xl  backdrop-blur-md"
        style={{
          width: "554px",
          marginLeft: "40px",
          backgroundColor: "rgba(255, 255, 255, 0)", 
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
}
