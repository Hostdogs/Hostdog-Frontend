import React, { useState, useEffect } from "react";
import ServiceDetailBox from "./ServiceDetailBox";
import axios from "axios";
import { useCookies } from "react-cookie";
import HostServiceAPI from "../../../API/HostServiceAPI";
import HostAvailableDateAPI from "../../../API/HostAvailableDateAPI";
import moment from "moment-timezone";
export default function ServiceDetailTab({ profileId }) {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [serviceDetail, setServiceDetail] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [newAvailableDates, setNewAvailableDates] = useState([]);

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
      setNewAvailableDates(formatDate(resp.data));
    });
  }, []);

  function formatDate(dates) {
    const newDates = [];
    dates.forEach((date) => {
      newDates.push(new Date(date.date));
    });
    return newDates;
  }

  return (
    <div>
      <ServiceDetailBox
        serviceDetail={serviceDetail}
        newAvailableDates={newAvailableDates}
        profileId={profileId}
      />
    </div>
  );
}
