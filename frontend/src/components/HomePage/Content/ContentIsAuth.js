import React, { useState, useEffect} from 'react';
import InboxPage from '../../Inbox/InboxPage';
import SearchHostPage from '../../SearchHost/SearchHostPage'
import { useCookies } from 'react-cookie'
import AuthenAPI from '../../API/AuthenAPI';

const ContentIsAuth = (props) => {
  const [isHost, setisHost] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['mytoken', 'user_id'])
  useEffect(() => {
    if(cookies["user_id"]){
      AuthenAPI.getUserAllInfo(cookies["mytoken"],cookies["user_id"]).them(res=>{
        setisHost(res.data.is_host)
      })
    }
    
    
  }, [cookies])
  return (
    <div >
      {isHost ? (<InboxPage/>):(<SearchHostPage/>)}
    </div>
  );
};

export default ContentIsAuth;
