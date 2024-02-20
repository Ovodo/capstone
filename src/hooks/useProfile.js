import { useState, useEffect } from "react";

const useProfile = () => {
  // Define initial state for user profile
  const [profile, setUserProfile] = useState(() => {
    const storedProfile =
      typeof window !== "undefined" ? localStorage.getItem("profile") : {};
    return storedProfile != "undefined" ? JSON.parse(storedProfile) : {};
  });

  // Function to set user profile
  const setProfile = (profile) => {
    setUserProfile(profile);
  };
  const clearProfile = () => {
    setUserProfile("");
    // Clear sessionStorage when cart is cleared
    typeof window !== "undefined" && sessionStorage.removeItem("profile");
  };

  // Update local storage whenever profile changes
  useEffect(() => {
    typeof window !== "undefined" &&
      localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  return { profile, setProfile, clearProfile };
};

export default useProfile;
