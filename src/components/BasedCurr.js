import React from "react";

const BasedCurr = ({ defaultCurr, onChangeHandler }) => {
  const { curr, value } = defaultCurr;
  // console.log("norman", props);
  return (
    <div className="base-curr">
      <div className="base-curr-title">
        USD - United States Dollars
      </div>
      <div className="base-curr-text">
      <h1>{curr}</h1>
      <input defaultValue={value} onChange={onChangeHandler} />
      </div>
    </div>
  );
};

export default BasedCurr;
