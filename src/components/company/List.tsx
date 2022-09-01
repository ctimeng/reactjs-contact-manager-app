import { useState } from "react";
import { connect } from "react-redux";

const List = (props: any) => {
  const [isColumn, setIsColumn] = useState(true);
  const [search, setSearch] = useState("");

  const filteredData = props.peoples
    .map((people: any) => people["company"])
    // store the keys of the unique objects
    .map((people: any, index: number, final: any) => final.indexOf(people) === index && index)
    .filter((people: any) => props.peoples[people])
    .filter((people: any) => {
      if (search === "") {
        return props.peoples[people];
      } else {
        return props.peoples[people].company
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    })
    .map((people: any) => props.peoples[people]);

  const columnViewHandler = () => {
    setIsColumn(true);
  };

  const rowViewHandler = () => {
    setIsColumn(false);
  };

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
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-default">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </form>
      <div
        className={
          "d-flex bd-highlight mb-3 " + (isColumn ? "flex-row" : "flex-column")
        }
      >
        {filteredData.map((people: any, index: number) => (
          <div className="card ml-2" key={index}>
            <div className="card-body">
              <p className="card-text">{people.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: object) => ({
  ...state
});

export default connect(mapStateToProps, null)(List);
