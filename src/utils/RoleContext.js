import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext(null);

// Single role - Profile completion status only
export const ProfileProvider = ({ children }) => {
  const [profileComplete, setProfileComplete] = useState(false);

  return (
    <ProfileContext.Provider value={{ profileComplete, setProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileStatus = () => useContext(ProfileContext);
