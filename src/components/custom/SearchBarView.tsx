import { Link } from "react-router-dom";
import { useState } from "react";

const DISPLAY_COLUMN = "1"
const DISPLAY_ROW = "2"

const FilterData = () => {
  const [option, setOption] = useState("1")
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("")

  return {
      option,
      city,
      search,
      setOption,
      setCity,
      setSearch
  }
}

const SearchBarView = ({cities, filter}:{cities:Array<any>; filter: any}) => {
  const {option, _city, _search, setOption, setSearch, setCity} = filter;
  return (
    <form>
      <div className="row">
        <div className="col-md-2 col-sm-12 mt-2">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              className={"btn btn-info " + (option === DISPLAY_COLUMN ? "active" : "")}
            >
              <input
                type="radio"
                name="options"
                autoComplete="off"
                checked={false}
                value={DISPLAY_COLUMN}
                onChange={(event) => setOption(event.target.value)}
              />{" "}
              <i className="fas fa-th-large"></i>
            </label>
            <label
              className={"btn btn-info " + (option === DISPLAY_ROW ? "active" : "")}
            >
              <input
                type="radio"
                name="options"
                autoComplete="off"
                value={DISPLAY_ROW}
                onChange={(event) => setOption(event.target.value)}
              />{" "}
              <i className="fas fa-align-justify"></i>
            </label>
          </div>
        </div>
        <div className="col-md-2 col-sm-12 mt-2">
          <Link
            to={{ pathname: `/contact/create` }}
            className="btn btn-info"
          >
            <i className="nav-icon fas fa-address-book"></i> New Contact
          </Link>
        </div>
        <div className="col-md-5 col-sm-12 mt-2">
          <div className="form-group">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-default">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 mt-2">
          <div className="form-group">
            <select
              className="form-control"
              onChange={(event) => setCity(event.target.value)}
            >
              <option value="">--All--</option>
              {cities.map((city, i) => (
                <option value={city} key={i}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export {
  FilterData,
  SearchBarView,
  DISPLAY_COLUMN,
  DISPLAY_ROW
}
