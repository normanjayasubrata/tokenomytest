import React from "react";

const ListCurr = ({ currList, setSelected, selectedCurr }) => {
  return (
    <select className="list-curr" onChange={setSelected} value={selectedCurr}>
        {selectedCurr === "" ? <option>Please Select...</option> : null}
      {currList.map((list, index) => {
        return <option key={index} value={list.code}>{list.code}</option>;
      })}
    </select>
  );
};

export default ListCurr;
