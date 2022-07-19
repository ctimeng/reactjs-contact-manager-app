import { useMemo } from "react";
import SocialIconView from "../SocialIconView";
import { DeleteFavourite } from "../../actions";
import { connect } from "react-redux";

const ColumnView = (props) => {
  const gridData = (peoples) => {
    const gridColumn = 3;
    let rowData = [];
    let columnData = [];
    if (peoples.length <= gridColumn) {
        rowData.push(peoples);
    }else {
      peoples.forEach(function (people, i) {
        columnData.push(people);
        if (((i + 1) % gridColumn === 0) || i === peoples.length-1) {
          rowData.push(columnData);
          columnData = [];
        }
      });
    }

    return rowData;
  };

  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  const onDeleteFavourite = (event, index) => {
    event.preventDefault();
    props.DeleteFavourite(index);
  };

  return (
    <div>
      {peopleRows.map((peopleColumns, i) => (
        <div className="row" key={i}>
          {peopleColumns.map((people, index) => (
          <div className="col-md-4" key={people.id}>
            <div className="card card-widget widget-user-2 shadow-sm">
              <div className="widget-user-header bg-info">
                <div className="widget-user-image">
                  <img
                    className="img-circle elevation-2"
                    src={people.avatar}
                    alt={people.name}
                  />
                </div>

                <h3 className="widget-user-username">{people.name}</h3>
                <h5 className="widget-user-desc">{people.position}</h5>
              </div>
              <div className="card-footer p-0">
                <ul className="nav flex-column">
                  <li className="nav-item pt-2 pb-2">
                  { Object.keys(people.social_networks).map((key, index) => (
                    <a href={people.social_networks[key]} className="btn btn-sm btn-outline-primary ml-2" key={index}>
                      <SocialIconView social={key}/>
                    </a>
                    ))}
                  </li>
                  <li className="nav-item pt-2 pb-2">{people.city}</li>
                  <li className="nav-item pt-2 pb-2">
                  <a
                          href="#/"
                          className="btn btn-sm btn-danger ml-2"
                          onClick={(e) => onDeleteFavourite(e, `${index}`)}
                        >
                          DELETE FROM FAVOURITES
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

function mapDispatchToProps(dispatch) {
  return {
    DeleteFavourite:(index) => dispatch(DeleteFavourite(index))
  };
}

export default connect(null, mapDispatchToProps)(ColumnView);
