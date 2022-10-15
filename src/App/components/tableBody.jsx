/* eslint-disable */

import React from "react";
import _ from "lodash";
import { Link, Route, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";

import User from "./user";

const TableBody = ({ data, columns }) => {
 const renderContent = (item, column) => {
  if (columns[column].component) {
   const component = columns[column].component;
   if (typeof component === "function") {
    return component(item);
   }
   return component;
  }
  return _.get(item, columns[column].path);
 };
 return (
  <>
   <tbody>
    {data.map((item) => (
     <tr key={item._id}>
      {Object.keys(columns).map((column) => (
       <td key={column}>
        {column === "name" ? (
         <>
          <Route path={"/users/" + item._id} component={User} />
          <Link to={"/users/" + item._id}>{renderContent(item, column)}</Link>
         </>
        ) : (
         renderContent(item, column)
        )}
       </td>
      ))}
     </tr>
    ))}
   </tbody>
  </>
 );
};
TableBody.propTypes = {
 data: PropTypes.array.isRequired,
 columns: PropTypes.object.isRequired
};

export default TableBody;
