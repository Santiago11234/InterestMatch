import React, { useEffect, useState } from 'react';
import axios from '../../../Services/axios';
import MessagesPairListItem from './MessagesPairListItem';

export default function MessagesList({ userId, pairSearchText }) {
  const [pairs, setPairs] = useState([]);
  const [filteredPairs, setFilteredPairs] = useState([]);
  const [pairsFetched, setPairsFetched] = useState(false);
  const [shouldFilter, setShouldFilter] = useState(false);

  useEffect(() => {
    async function fetchPairs() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/get-pairs/${userId}`
        );
        setPairs(response.data);
        setFilteredPairs(response.data);
        setPairsFetched(true); 
      } catch (error) {
        console.error('Error fetching pairs:', error);
      }
    }
    if (userId && !pairsFetched) {
      fetchPairs();
    }
  }, [userId, pairSearchText]); 

  useEffect(() => {
    if (pairsFetched && shouldFilter) {
      if (pairs && pairs.length > 0) {
        const filtered = pairs.filter(pair =>
          pair.name && pair.name.toString().toLowerCase().includes(pairSearchText.toString().toLowerCase())
        );
        setFilteredPairs(filtered);
      }
    }
  }, [pairSearchText, pairs, pairsFetched, shouldFilter]);

  useEffect(() => {
    if (pairsFetched && pairSearchText) {
      setShouldFilter(true);
    }
  }, [pairsFetched, pairSearchText]); 

  return (
    <div>
       {filteredPairs.length !== 0 ? (
        filteredPairs.map((pair, index) => (
          <MessagesPairListItem key={index} pair={pair} />
        ))
      ) : (
        <div>No pairs found</div>
      )}
    </div>
  );
}
