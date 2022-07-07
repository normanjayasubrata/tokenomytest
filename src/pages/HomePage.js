import React, { Component } from "react";
import BasedCurr from "../components/BasedCurr";
import TargetCurr from "../components/TargetCurr";
import ListCurr from "../components/ListCurr";
import { getCurr } from "../api/currency";
import errorHandler from "../utils/errorHandler";
export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      defaultCurr: {
        curr: "USD",
        value: 1,
      },
      targetCurr: [
        { curr: "IDR", value: 0, name: "Indonesian Rupiah" },
        { curr: "EUR", value: 0, name: "Euro" },
        { curr: "GBP", value: 0, name: "British Pound" },
        { curr: "SGD", value: 0, name: "Singaporean Dollar" },
      ],
      selectedCurr: "",
      isLoading: false,
      currList: [
        {code: "CAD", name: "Canadian Dollar"},
       {code: "IDR", name: "Indonesian Rupiah"},
       {code: "GBP", name: "British Pound"},
       {code: "CHF", name: "Swiss Franc"},
       {code: "SGD", name: "Singaporean Dollar"},
       {code: "INR", name: "Indian Rupee"},
       {code: "MYR", name: "Malaysian Ringgit"},
       {code: "JPY", name: "Japanese Yen"},
       {code: "KRW", name: "South Korean Won"},
    ],
    };
  }
  componentDidMount() {
    const { targetCurr, defaultCurr } = this.state;
    targetCurr.map(({ curr }) => {
      return getCurr(defaultCurr.curr, curr, defaultCurr.value)
        .then(({ data }) =>
          this.updateCurrency(data.query.to, data.info.rate)
        )
        .catch((error) => errorHandler(error));
    });
  }

  setSelected = (e) => {
    this.setState({ selectedCurr: e.target.value });
  };

  updateBasedValue = (newVal) => {
    this.setState((state) => {
      const defaultCurr = Object.assign({}, state.defaultCurr);
      defaultCurr.value = newVal;
      return {
        ...state,
        defaultCurr,
      };
    });
  };

  onChangeHandler = (e) => {
    return this.updateBasedValue(e.target.value);
  };

  addCurrency = (newelement) => {
    if (newelement === "") {
      alert("please select currentcy");

    } else {
      this.setState({ isLoading: true });

      const { defaultCurr } = this.state;

      getCurr(defaultCurr.curr, newelement, defaultCurr.value)
        .then(({ data }) =>
          this.setState(
            (prevState) => ({
              targetCurr: [
                ...prevState.targetCurr,
                { curr: data.query.to, value: data.info.rate, name: this.state.currList.filter(list => list.code === data.query.to)[0].name },
              ],
            }),
            () => {
              this.setState({
                selectedCurr: this.passedList()[0].code,
                isLoading: false,
              });
            }
          )
        )
        .catch((error) => {
          this.setState({ isLoading: false });
        //   alert("Please Try Again by Change the Currency");
          errorHandler(error)
        });
    }
  };

  deleteCurrency = (delCurr) => {
    const array = [...this.state.targetCurr]; // make a separate copy of the array
    let index = array.indexOf(
      array.filter((target) => target.curr === delCurr)[0]
    );
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ targetCurr: array });
    }
  };

  submitHandler = () => {
    this.addCurrency(this.state.selectedCurr);
  };

  updateCurrency = (target, rate) => {
    this.setState((state) => {
      const targetCurr = state.targetCurr.map((obj) =>
        obj.curr === target ? Object.assign(obj, { value: rate }) : obj
      );

      return {
        ...state,
        ...targetCurr,
      };
    });
  };

  passedList = () => {
    const { targetCurr } = this.state;
    const newList = this.state.currList.filter((list) => {
      let filtered = true;
      targetCurr.forEach((target) => {
        if (list.code === target.curr) {
          filtered = false;
        }
      });
      return filtered;
    });

    return newList;
  };

  render() {
    const {
      defaultCurr,
      targetCurr /* , currList  */,
      selectedCurr,
      isLoading,
    } = this.state;
    return (
      <React.Fragment>
        <BasedCurr
          defaultCurr={defaultCurr}
          onChangeHandler={this.onChangeHandler}
        />
        {targetCurr.map((data, index) => {
          return (
            <TargetCurr
              key={index}
              targetCurr={data}
              basedValue={defaultCurr.value}
              deleteCurrency={this.deleteCurrency}
            />
          );
        })}

        {this.passedList().length === 0 ? null : (
          <div>
            <ListCurr
              currList={this.passedList()}
              setSelected={this.setSelected}
              selectedCurr={selectedCurr}
            />
            {isLoading ? (
              " ...loading"
            ) : (
              <button className="list-button" onClick={this.submitHandler}>Submit</button>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default HomePage;
