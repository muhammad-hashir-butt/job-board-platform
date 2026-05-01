import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, Link as LinkIcon } from 'lucide-react';

const EmployerDashboard = () => {
  const [formData, setFormData] = useState({ title: '', company: '', location: '', salary: '', description: '' });
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Job Post Karne ka function
  const handlePostJob = async (e) => {
    e.preventDefault();
    if (user?.role !== 'employer') return alert("Only employers are authorized to post jobs.");

    try {
      await addDoc(collection(db, "jobs"), {
        ...formData,
        employerId: user.uid,
        createdAt: serverTimestamp()
      });
      alert("Job posted successfully!");
      setFormData({ title: '', company: '', location: '', salary: '', description: '' }); // Form clear karein
    } catch (err) { 
      alert("Error: " + err.message); 
    }
  };

  // 2. Apni jobs par aayi hui Applications fetch karna
  useEffect(() => {
    if (!user) return;
    
    // Firestore se saari applications le kar aao jo is employer ki jobs ke liye hain
    const q = query(collection(db, "applications"), where("employerId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* --- Section 1: Post Job Form --- */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Briefcase className="text-blue-600" /> Post a New Job
        </h2>
        <form onSubmit={handlePostJob} className="space-y-4">
          <input type="text" placeholder="Job Title" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <input type="text" placeholder="Company Name" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} required />
          <div className="flex gap-4">
            <input type="text" placeholder="Location" className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            <input type="text" placeholder="Salary" className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} required />
          </div>
          <textarea placeholder="Job Description" className="w-full p-3 border rounded-xl h-28 outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Publish Job</button>
        </form>
      </div>

      {/* --- Section 2: Received Applications --- */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Users className="text-green-600" /> Applications Received
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Applicant Name</th>
                <th className="p-4 font-semibold text-gray-600">Job Role</th>
                <th className="p-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? applications.map(app => (
                <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{app.applicantName}</td>
                  <td className="p-4 text-gray-600">{app.jobTitle}</td>
                  <td className="p-4">
                    <a href={app.resumeLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold hover:underline">
                      <LinkIcon size={16} /> View Resume
                    </a>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-gray-400 font-medium">No applications received yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
