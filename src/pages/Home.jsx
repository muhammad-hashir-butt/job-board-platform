import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, DollarSign } from 'lucide-react';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Filter Logic
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  const handleApply = async (jobId, jobTitle) => {
    if (!user) return alert("Please login first!");
    if (user.role !== 'applicant') return alert("Only applicants can apply for jobs.");

    const coverLetter = prompt("Please write your cover letter:");
    const resumeLink = prompt("Please provide the link to your resume (Drive/Dropbox):");

    if (coverLetter && resumeLink) {
      try {
        await addDoc(collection(db, "applications"), {
          jobId,
          jobTitle,
          applicantId: user.uid,
          applicantName: user.fullName,
          coverLetter,
          resumeLink,
          status: "Pending",
          appliedAt: serverTimestamp()
        });
        alert("Application submitted successfully!");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search & Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by job title..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px] relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Filter by location..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6 underline decoration-blue-500 underline-offset-8">
        Latest Job Openings
      </h1>

      {/* Jobs Grid */}
      <div className="grid gap-4">
        {filteredJobs.length > 0 ? filteredJobs.map(job => (
          <div key={job.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <p className="text-blue-600 font-semibold text-lg">{job.company}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2">
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin size={14} /> {job.location}
                </span>
                <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                  <DollarSign size={14} /> {job.salary}
                </span>
              </div>
            </div>
            <button 
              onClick={() => handleApply(job.id, job.title)}
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition"
            >
              Apply Now
            </button>
          </div>
        )) : (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border">
            No jobs found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
