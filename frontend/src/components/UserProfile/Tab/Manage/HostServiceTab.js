import React, { useState, useEffect } from "react";
import HostServiceBox from "./HostServiceBox";
import { Container } from "reactstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

import HostServiceAPI from "../../../API/HostServiceAPI";
import HostAvailableDateAPI from "../../../API/HostAvailableDateAPI";
import MealAPI from "../../../API/MealAPI";

export default function HostServiceTab({ profileId }) {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [serviceDetail, setServiceDetail] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [newAvailableDates, setNewAvailableDates] = useState([]);
  const [isChange, setIsChange] = useState(false);

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

  useEffect(() => {
    HostAvailableDateAPI.GetHostAvailableDate(
      cookies["mytoken"],
      profileId
    ).then((resp) => {
      setAvailableDates(resp.data);
    });
  }, [newAvailableDates]);

  function formatDate(dates) {
    const newDates = [];
    dates.forEach((date) => {
      newDates.push(new Date(date.date));
    });
    return newDates;
  }

  return (
    <div>
      <HostServiceBox
        serviceDetail={serviceDetail}
        newAvailableDates={newAvailableDates}
        availableDates={availableDates}
        setNewAvailableDates={setNewAvailableDates}
      />
    </div>
  );
}
