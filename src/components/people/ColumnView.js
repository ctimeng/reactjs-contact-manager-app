import { useMemo, useEffect } from "react";

const ColumnView = (props) => {
  const gridData = (peoples) => {
    const gridColumn = 3;
    let rowData = [];
    let columnData = [];
    peoples.forEach(function (people, i) {
      columnData.push(people);
      if ((i + 1) % gridColumn === 0) {
        rowData.push(columnData);
        columnData = [];
      }
    });

    console.log(rowData);

    return rowData;
  };

  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  /*
  useEffect(() => {
    //console.log(props.peoples)
    //console.log(columnData(prop.peoples))
    //console.log(peoples)
  }, [props.peoples, peopleRows]);
  */

  return (
    <div>
      {peopleRows.map((peopleColumns) => (
        <div className="row">
          {peopleColumns.map((people) => (
          <div className="col-md-4" key={people.id}>
            <div className="card card-widget widget-user-2 shadow-sm">
              <div className="widget-user-header bg-info">
                <div className="widget-user-image">
                  <img
                    className="img-circle elevation-2"
                    src="img/user2-160x160.jpg"
                    alt="User Avatar"
                  />
                </div>

                <h3 className="widget-user-username">Nadia Carmichael</h3>
                <h5 className="widget-user-desc">Lead Developer</h5>
              </div>
              <div className="card-footer p-0">
                <ul className="nav flex-column">
                  <li className="nav-item pt-2 pb-2">
                    <a href="#/" className="btn btn-sm btn-outline-primary">
                      <i className="fab fa-facebook-f fa-fw"></i>
                    </a>
                    <a
                      href="#/"
                      className="btn btn-sm btn-outline-primary ml-2"
                    >
                      <i className="fab fa-twitter fa-fw"></i>
                    </a>
                    <a
                      href="#/"
                      className="btn btn-sm btn-outline-primary ml-2"
                    >
                      <i className="fab fa-instagram fa-fw"></i>
                    </a>
                    <a
                      href="#/"
                      className="btn btn-sm btn-outline-primary ml-2"
                    >
                      <i className="fab fa-linkedin fa-fw"></i>
                    </a>
                    <a
                      href="#/"
                      className="btn btn-sm btn-outline-primary ml-2"
                    >
                      <i className="fab fa-skype fa-fw"></i>
                    </a>
                  </li>
                  <li className="nav-item pt-2 pb-2">Ukraine, Lviv</li>
                  <li className="nav-item pt-2 pb-2">
                    <a href="#/" className="btn btn-primary">
                      Add to Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColumnView;
