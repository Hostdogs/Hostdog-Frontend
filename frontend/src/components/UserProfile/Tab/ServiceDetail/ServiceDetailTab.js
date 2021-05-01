import React, { useState, useEffect } from "react";
import ServiceDetailBox from "./ServiceDetailBox";
import axios from "axios";
import { useCookies } from "react-cookie";
import HostServiceAPI from "../../../API/HostServiceAPI";
export default function ServiceDetailTab({ profileId }) {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [serviceDetail, setServiceDetail] = useState({});

  useEffect(() => {
    HostServiceAPI.getHostService(cookies["mytoken"], profileId).then(
      (resp) => {
        setServiceDetail(resp.data);
      }
    );
  }, []);

  return (
    <div>
      <ServiceDetailBox serviceDetail={serviceDetail} />
    </div>
  );
}
