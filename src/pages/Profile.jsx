import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-medium">{user?.fullName}</p>
        </div>
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Email Address</p>
          <p className="text-lg font-medium">{user?.email}</p>
        </div>
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Account Type</p>
          <p className="text-lg font-medium capitalize text-blue-600">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
