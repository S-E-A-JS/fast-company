import React from "react";
import { useHistory } from "react-router-dom";

import QualitiesList from "./qualitiesList";

const UserInfo = ({ name, profession, qualities, completedMeetings, rate }) => {
 const history = useHistory();
 const handleBack = () => {
  history.push("/users");
 };
 return (
  <>
   <h4>Имя: {name}</h4>
   <p>Профессия: {profession.name}</p>
   <p>
    Качества:
    <QualitiesList qualities={qualities} />
   </p>
   <p>
    {`Произошло встреч: 
    ${completedMeetings}`}
   </p>
   <p>Оценка: {rate}</p>
   <button className="btn btn-primary" onClick={handleBack}>
    Все юзеры
   </button>
  </>
 );
};

export default UserInfo;
