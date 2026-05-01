import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('applicant');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, role, fullName);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Join JobPortal</h2>
        
        <div className="flex gap-2 mb-4">
          <button type="button" onClick={() => setRole('applicant')} className={`flex-1 py-2 rounded ${role === 'applicant' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Applicant</button>
          <button type="button" onClick={() => setRole('employer')} className={`flex-1 py-2 rounded ${role === 'employer' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Employer</button>
        </div>

        <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 border rounded" onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-6 border rounded" onChange={(e) => setPassword(e.target.value)} required />
        
        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
