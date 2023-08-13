import React from 'react';
import ProfilePageCard from '../ProfilePageCard'; 

const Food = ( {userId} ) => {

  return (
    <ProfilePageCard
      userId={userId}
      index={0}
      color="rgba(231, 48, 45, 1)"
    />
  );
};

export default Food;
