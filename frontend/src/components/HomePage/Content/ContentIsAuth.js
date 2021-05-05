import React, { useState, useEffect} from 'react';
import InboxPage from '../../Inbox/InboxPage';
import SearchHostPage from '../../SearchHost/SearchHostPage'
import { useCookies } from 'react-cookie'
import AuthenAPI from '../../API/AuthenAPI';
import { Spinner } from 'reactstrap';
import Loading from '../../Handle/Loading';

const ContentIsAuth = (props) => {
  const [isHost, setisHost] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['mytoken', 'user_id'])
  const [isLoad, setisLoad] = useState(false)
  useEffect(() => {
      console.log(cookies["user_id"])
      if(!cookies["user_id"]){
        window.location.reload()
      }
      if(cookies["user_id"]){
        AuthenAPI.getUserAllInfo(cookies["mytoken"],cookies["user_id"]).then(res=>{
          setisHost(res.data.is_host)
          setisLoad(true)
        })
      }
   
    console.log(cookies["user_id"])
    

  }, [cookies["user_id"]])
 
  return (
    <div >
      {isHost&&isLoad ? (<InboxPage/>):(null)}
      {!isHost&&isLoad ? (<SearchHostPage/>):(null)}
      {!isLoad ? (<Loading/>):(null)}
      
    </div>
  );
};

export default ContentIsAuth;
