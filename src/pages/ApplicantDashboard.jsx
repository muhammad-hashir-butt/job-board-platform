import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ApplicantDashboard = () => {
  const [myApplications, setMyApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "applications"), where("applicantId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Applications</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Job Title</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Applied Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {myApplications.length > 0 ? myApplications.map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{app.jobTitle}</td>
                <td className="p-4 text-blue-600 font-bold">{app.status}</td>
                <td className="p-4 text-gray-500">
                   {app.appliedAt?.toDate().toLocaleDateString()}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="3" className="p-4 text-center text-gray-400">No applications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
