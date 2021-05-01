import React, { useState, useEffect } from "react";
import HostServiceBox from "./HostServiceBox";
import { Container } from "reactstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import APIManage from "./APIManage";
export default function HostServiceTab({ profileId }) {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [serviceDetail, setServiceDetail] = useState({});

  async function getServiceDetial() {
    const resp = await axios.get(
      `http://127.0.0.1:8000/api/profilehost/${profileId}/host-service/${profileId}/`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${cookies["mytoken"]}`,
        },
      }
    );
    setServiceDetail(resp.data);
  }

  useEffect(() => {
    getServiceDetial();
  }, []);

  return (
    <div>
      <HostServiceBox serviceDetail={serviceDetail} />
    </div>
  );
}
