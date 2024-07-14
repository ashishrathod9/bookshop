import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear the authenticated user from state
      setAuthUser(null);

      // Remove user data from localStorage (assuming "Users" is the key)
      localStorage.removeItem("Users");

      // Show logout success message
      toast.success("Logged out successfully");

      // Redirect to the home page after logout
      navigate("/");
    } catch (error) {
      // Handle any errors that occur during logout
      toast.error("Error logging out: " + error.message);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
