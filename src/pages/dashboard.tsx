import React, { useEffect } from 'react';
import axios from 'axios';
import { parse } from 'cookie';
import type { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';

type Props = { user: { id: string; name: string } };

export default function Dashboard({ user }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) dispatch(setUser({ id: String(user.id), name: user.name }));
  }, [user, dispatch]);

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    router.push('/login');
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
    <p className="mb-2 text-black"><strong>ID:</strong> {user.id}</p>
<p className="mb-6 text-black"><strong>Name:</strong> {user.name}</p>

      <button
        onClick={handleLogout}
        className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
      >
        Logout
      </button>
    </div>
  </div>
);


}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie;
  const parsed = cookies ? parse(cookies) : {};
  const token = parsed['ys_token'];

  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    const resp = await axios.get('https://api-yeshtery.dev.meetusvr.com/v1/user/info', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { props: { user: resp.data } };
  } catch (err) {
    
    return { redirect: { destination: '/login', permanent: false } };
  }
};
