import React from 'react';
import ProfilePageCard from '../ProfilePageCard'; 

const Hobby = ( {userId} ) => {
  return (
    <ProfilePageCard
      userId={userId}
      index={1}
      color="rgba(253, 187, 45, 1)"
    />
  );
};

export default Hobby;
