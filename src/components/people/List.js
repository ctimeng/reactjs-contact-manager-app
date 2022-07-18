import ColumnView from "./ColumnView";
import RowView from "./RowView";
import { useState, useEffect } from "react";

const List = () => {
  const [isColumn, setIsColumn] = useState(true);
  const [peoples, setPeople] = useState([]);

  const columnViewHandler = (e) => {
    setIsColumn(true);
  };

  const rowViewHandler = (e) => {
    setIsColumn(false);
  };

  const getData = async () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setPeople(data.people);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
                  placeholder="Type your keywords here"
                  value="Lorem ipsum"
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
              <select className="form-control"></select>
            </div>
          </div>
        </div>
      </form>
      {isColumn ? <ColumnView peoples={peoples} /> : <RowView peoples={peoples}/>}
    </div>
  );
};

export default List;
