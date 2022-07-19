import ColumnView from "./ColumnView";
import RowView from "./RowView";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const List = (props) => {
  const [isColumn, setIsColumn] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [search, setSearch] = useState('');

  const filteredData = props.peoples
  .filter((people) => people.isContact === true)
  .filter((people) => {
    if (search === '') {
      return people;
    }
    else {
      return people.name.toLowerCase().includes(search.toLowerCase()) || 
      people.city.toLowerCase().includes(search.toLowerCase()) ||
      people.company.toLowerCase().includes(search.toLowerCase()) ||
      people.position.toLowerCase().includes(search.toLowerCase())
    }
  }).filter((people) => {
    if (selectedCity === '') {
      return people;
    }
    else {
      return people.city.toLowerCase().includes(selectedCity.toLowerCase())
    }
  })

  const columnViewHandler = (e) => {
    setIsColumn(true);
  };

  const rowViewHandler = (e) => {
    setIsColumn(false);
  };

  const handleChange = (e) => {
    setSelectedCity(e.target.value)
  }

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-2">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-info active"
                onClick={columnViewHandler}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={rowViewHandler}
              >
                <i className="fas fa-align-justify"></i>
              </button>
            </div>
          </div>
          <div className="col-7">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={event => setSearch(event.target.value)}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-default">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <select className="form-control" value={selectedCity} onChange={handleChange}>
                {
                  props.cities.map((city, i) => (
                    <option value={city} key={i}>{city}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </form>
      {isColumn ? <ColumnView peoples={filteredData} /> : <RowView peoples={filteredData}/>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(List);
