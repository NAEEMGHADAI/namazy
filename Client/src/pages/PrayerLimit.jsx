import React from "react";
import Dropdown from "../components/Dropdown";

const PrayerLimit = () => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap">
      <Dropdown placeholder="country" />
      <Dropdown placeholder="city" />
      <Dropdown placeholder="Method" />
      <Dropdown placeholder="school" />
    </div>
  );
};

export default PrayerLimit;
