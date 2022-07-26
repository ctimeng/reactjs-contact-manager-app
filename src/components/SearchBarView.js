import { Link } from "react-router-dom";

const SearchBarView = ({ cities, option, setOption, setCity, setSearch }) => {
  return (
    <form>
      <div className="row">
        <div className="col-md-2 col-sm-12 mt-2">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              className={"btn btn-info " + (option === "1" ? "active" : "")}
            >
              <input
                type="radio"
                name="options"
                id="option_a1"
                autoComplete="off"
                checked=""
                value="1"
                onChange={(event) => setOption(event.target.value)}
              />{" "}
              <i className="fas fa-th-large"></i>
            </label>
            <label
              className={"btn btn-info " + (option === "2" ? "active" : "")}
            >
              <input
                type="radio"
                name="options"
                id="option_a2"
                autoComplete="off"
                value="2"
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

export default SearchBarView;
