import { useMemo } from "react";
import SocialIconView from "../SocialIconView";

const ColumnView = (props) => {
  const gridData = (peoples) => {
    const gridColumn = 4;
    let rowData = [];
    let columnData = [];
    if (peoples.length <= gridColumn) {
      rowData.push(peoples);
    } else {
      peoples.forEach(function (people, i) {
        columnData.push(people);
        if ((i + 1) % gridColumn === 0 || i === peoples.length - 1) {
          rowData.push(columnData);
          columnData = [];
        }
      });
    }

    return rowData;
  };

  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  const myStyle = {
    borderBottom: 0,
  };

  return (
    <div>
      {peopleRows.map((peopleColumns, index) => (
        <div className="row" key={index}>
          {peopleColumns.map((people) => (
            <div className="col-md-3" key={people.id}>
              <div
                className="card card-widget widget-user"
              >
                <div className="widget-user-header"></div>
                <div className="widget-user-image">
                  <img
                    className="img-circle elevation-2"
                    src={people.avatar}
                    alt={people.name}
                  />
                </div>
                <div className="card-footer" style={{ textAlign: "center" }}>
                  <h3 className="widget-user-username">{people.name}</h3>
                  <h5 className="widget-user-desc">{people.position}</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item pt-2 pb-2" style={myStyle}>
                      {Object.keys(people.social_networks).map((key, index) => (
                        <a
                          href={people.social_networks[key]}
                          className="btn btn-sm btn-outline-primary ml-2"
                          key={index}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SocialIconView social={key} />
                        </a>
                      ))}
                    </li>
                    <li className="nav-item pt-2 pb-2" style={myStyle}>
                      <span className="badge bg-success">{people.city}</span>
                    </li>
                    <li className="nav-item pt-2 pb-2" style={myStyle}>
                      {people.isContact === false ? (
                        <a
                          href="#/"
                          className="btn btn-sm btn-primary ml-2 rounded-pill"
                          onClick={(e) => props.onAddContact(e, `${people.id}`)}
                        >
                          ADD TO CONTACTS
                        </a>
                      ) : (
                        <a
                          href="#/"
                          className="btn btn-sm btn-danger ml-2 rounded-pill"
                          onClick={(e) => props.onDeleteContact(e, `${people.id}`)}
                        >
                          DELETE FROM CONTACTS
                        </a>
                      )}
                      {people.isFavourite === false ? (
                        <a
                          href="#/"
                          className="btn btn-sm btn-primary ml-2 mt-2 rounded-pill"
                          onClick={(e) => props.onAddFavourite(e, `${people.id}`)}
                        >
                          ADD TO FAVOURITES
                        </a>
                      ) : (
                        <a
                          href="#/"
                          className="btn btn-sm btn-danger ml-2 mt-2 rounded-pill"
                          onClick={(e) => props.onDeleteFavourite(e, `${people.id}`)}
                        >
                          DELETE FROM FAVOURITES
                        </a>
                      )}
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
