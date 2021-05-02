import React, { useState, useEffect } from "react";
import HostServiceBox from "./HostServiceBox";
import { Container } from "reactstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

import HostServiceAPI from "../../../API/HostServiceAPI";
import HostAvailableDateAPI from "../../../API/HostAvailableDateAPI";

export default function HostServiceTab({ profileId }) {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [serviceDetail, setServiceDetail] = useState({});
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    HostServiceAPI.getHostService(cookies["mytoken"], profileId).then(
      (resp) => {
        setServiceDetail(resp.data);
      }
    );
    HostAvailableDateAPI.GetHostAvailableDate(
      cookies["mytoken"],
      profileId
    ).then((resp) => {
      setAvailableDates(resp.data);
    });
  }, []);

  return (
    <div>
      <HostServiceBox serviceDetail={serviceDetail} />
    </div>
  );
}
