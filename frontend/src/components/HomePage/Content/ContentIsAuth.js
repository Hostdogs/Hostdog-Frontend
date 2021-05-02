import React, { useState, useEffect} from 'react';
import InboxPage from '../../Inbox/InboxPage';
import SearchHostPage from '../../SearchHost/SearchHostPage'

const ContentIsAuth = (props) => {
  const [isHost, setisHost] = useState(false)
  useEffect(() => {
    setisHost(true)
  }, [])
  return (
    <div >
      {isHost ? (<InboxPage/>):(<SearchHostPage/>)}
    </div>
  );
};

export default ContentIsAuth;
