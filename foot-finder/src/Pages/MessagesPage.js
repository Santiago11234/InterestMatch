import React, {useState, useEffect} from 'react';
import MessagesHeader from '../Components/MessagesPageComponents/MessagesPrePageComponents/MessagesHeader';
import MessagesList from '../Components/MessagesPageComponents/MessagesPrePageComponents/MessagesList';
import Requests from '../Components/MessagesPageComponents/MessagesPrePageComponents/Requests';
import Denied from '../Components/MessagesPageComponents/MessagesPrePageComponents/Denied';
import { useNavigate } from 'react-router-dom';

export default function MessagesPage({ userId }) {
  const [page, setPage] = useState(<MessagesList userId={userId} />)
  const navigate = useNavigate();
  const [pairSearchText, setPairSearchText] = useState(''); 

  function goback() {
    navigate('/home');
  }

  function changePage(newPage) {
     if (newPage === 'Messages') setPage(<MessagesList userId={userId} pairSearchText={pairSearchText} />);

    if (newPage === 'Requests') setPage(<Requests userId={userId} />);
    if (newPage === 'Denied') setPage(<Denied userId={userId} />);
  }

  useEffect(() => {
    setPage(<MessagesList userId={userId} pairSearchText={pairSearchText} />);
  }, [pairSearchText])



  return (
    <div>
      
      <MessagesHeader
        userId={userId}
        clickedBack={goback}
        changePage={changePage}
        updateSearchText={setPairSearchText}
      />
      {page}
    </div>
  );
}
