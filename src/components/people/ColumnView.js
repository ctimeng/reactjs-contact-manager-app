import { useMemo } from "react";
import SocialIconView from "../SocialIconView";
import { connect } from "react-redux";
import {
  AddContact,
  DeleteContact,
  AddFavourite,
  DeleteFavourite,
} from "../../actions";

const ColumnView = (props) => {
  const gridData = (peoples) => {
    const gridColumn = 3;
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

  const onAddContact = (event, id) => {
    event.preventDefault();
    props.AddContact(id);
  };

  const onDeleteContact = (event, id) => {
    event.preventDefault();
    props.DeleteContact(id);
  };

  const onAddFavourite = (event, id) => {
    event.preventDefault();
    props.AddFavourite(id);
  };

  const onDeleteFavourite = (event, id) => {
    event.preventDefault();
    props.DeleteFavourite(id);
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
                      {Object.keys(people.social_networks).map((key, index) => (
                        <a
                          href={people.social_networks[key]}
                          className="btn btn-sm btn-outline-primary ml-2"
                          key={index}
                        >
                          <SocialIconView social={key} />
                        </a>
                      ))}
                    </li>
                    <li className="nav-item pt-2 pb-2">{people.city}</li>
                    <li className="nav-item pt-2 pb-2">
                      {people.isContact === false ? (
                        <a
                          href="#/"
                          className="btn btn-sm btn-primary ml-2"
                          onClick={(e) => onAddContact(e, `${people.id}`)}
                        >
                          ADD TO CONTACTS
                        </a>
                      ) : (
                        <a
                          href="#/"
                          className="btn btn-sm btn-danger ml-2"
                          onClick={(e) => onDeleteContact(e, `${people.id}`)}
                        >
                          DELETE FROM CONTACTS
                        </a>
                      )}
                      {people.isFavourite === false ? (
                        <a
                          href="#/"
                          className="btn btn-sm btn-primary ml-2"
                          onClick={(e) => onAddFavourite(e, `${people.id}`)}
                        >
                          ADD TO FAVOURITES
                        </a>
                      ) : (
                        <a
                          href="#/"
                          className="btn btn-sm btn-danger ml-2"
                          onClick={(e) => onDeleteFavourite(e, `${people.id}`)}
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

function mapDispatchToProps(dispatch) {
  return {
    AddContact: (id) => dispatch(AddContact(id)),
    DeleteContact: (id) => dispatch(DeleteContact(id)),
    AddFavourite: (id) => dispatch(AddFavourite(id)),
    DeleteFavourite: (id) => dispatch(DeleteFavourite(id)),
  };
}

export default connect(null, mapDispatchToProps)(ColumnView);
