import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert("Invalid credentials. Please check your email/password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Account</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition">Login</button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
