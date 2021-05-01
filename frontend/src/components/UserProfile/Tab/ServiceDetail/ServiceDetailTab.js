import React, { useState, useEffect } from "react";
import ServiceDetailBox from "./ServiceDetailBox";
import axios from "axios";
import { useCookies } from "react-cookie";
export default function ServiceDetailTab({ profileId }) {
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
      <ServiceDetailBox serviceDetail={serviceDetail} />
    </div>
  );
}
