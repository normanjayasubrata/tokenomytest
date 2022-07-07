import React from "react";
// import numberFormatter from '../utils/numberFormatter';
import NumberFormat from "react-number-format";
const TargetCurr = ({ targetCurr, basedValue, deleteCurrency }) => {
  const { curr, value, name } = targetCurr;
  //   console.log("norman", targetCurr);
  const calcValue = isNaN(basedValue)
    ? "Please input a Number"
    : (value * basedValue).toFixed(2);
  return (
    <div className="target-curr">
      <div className="target-curr-text">
        <div className="target-curr-calc">
          <div>{curr}</div>
          <NumberFormat
            value={calcValue}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value, props) => <div {...props}>{value}</div>}
          />
        </div>
        <div className="target-curr-title">{`${curr} - ${name}`}</div>
        <NumberFormat
            value={value.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(resultValue, props) => <div {...props} className="target-curr-rate">{`1 USD = ${curr} ${resultValue}`}</div>}
          />
        
      </div>
      <button onClick={() => deleteCurrency(curr)}>Delete</button>
    </div>
  );
};

export default TargetCurr;
