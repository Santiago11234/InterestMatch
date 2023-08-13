
import React from 'react';
import MyAccountContent from './Pages/MyAccountContent';
import ProfileContent from './Pages/ProfileContent';

const ProfileChangeContent = ({ selectedSetting }) => {
 
  const contentMap = {
    'my-account': MyAccountContent,
    'profile': ProfileContent,
  };

  const ContentComponent = contentMap[selectedSetting];

  return (
    <div>
      {ContentComponent && <ContentComponent />}
    </div>
  );
};

export default ProfileChangeContent;
