import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to access your profile.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.dispatchEvent(new Event("userUpdated"));
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
        setMessage("Error fetching profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to delete your account.");
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userUpdated"));
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error.response?.data || error);
      setMessage("Error deleting account.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg mt-10">Loading user data...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-white shadow rounded space-y-6">
      <h1 className="text-3xl font-bold text-center">User Profile</h1>

      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Registered on:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mt-4 mx-auto"
            />
          )}
        </div>
      ) : (
        <p className="text-red-600 text-center">{message}</p>
      )}

      <hr />

      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Delete Account
      </button>

      {message && <p className="text-red-500 text-center">{message}</p>}
    </div>
  );
};

export default UserProfile;
