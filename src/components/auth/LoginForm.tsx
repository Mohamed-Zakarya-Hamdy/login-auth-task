import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ mode: 'onChange' });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setLoading(true);
    try {
      await axios.post('/api/auth/login', data);
      // redirect to dashboard (SSR will verify cookie and fetch user)
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const emailVal = watch('email');
  const passwordVal = watch('password');
  const disable = !emailVal || !passwordVal || !!errors.email;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
      <Input
        label="E-Mail"
        type="email"
        placeholder="name@company.com"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
        })}
        error={errors.email?.message}
      />
   <div className="mb-5 relative">
  <Input
    label="Password"
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    {...register('password', { required: 'Password is required' })}
    error={errors.password?.message}
  />
  <button
    type="button"
    onClick={() => setShowPassword(prev => !prev)}
    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? '🙈' : '👁️'}
  </button>
</div>

      {serverError && <p className="text-red-500 text-sm mb-2">{serverError}</p>}
      <Button type="submit" loading={loading} disabled={disable}>Login</Button>
    </form>
  );
}
