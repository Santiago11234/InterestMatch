import React from 'react';
import ProfilePageCard from '../ProfilePageCard'; 

const Job = ( {userId} ) => {
  return (
    <ProfilePageCard
      userId={userId}
      index={4}
      color="rgba(251, 177, 45, 1)"
    />
  );
};

export default Job;
