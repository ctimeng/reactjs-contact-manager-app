import SocialIconView from "../SocialIconView";
import { DeleteFavourite } from "../../actions";
import { connect } from "react-redux";

const RowView = (props) => {

  const onDeleteFavourite = (event, id) => {
    event.preventDefault();
    props.DeleteFavourite(id);
  };

  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      {props.peoples.map((people, i) => (
        <li className="item" key={i}>
          <div className="product-img">
            <img
              src={people.avatar}
              alt={people.name}
              className="img-size-100 img-circle"
            />
          </div>
          <div className="product-info">
            <a href="#/" className="product-title">
              {people.name}
            </a>
            <span className="product-description">
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
                <a
                        href="#/"
                        className="btn btn-sm btn-danger ml-2"
                        onClick={(e) => onDeleteFavourite(e, `${people.id}`)}
                      >
                        DELETE FROM FAVOURITES
                      </a>
                </li>
              </ul>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    DeleteFavourite:(index) => dispatch(DeleteFavourite(index))
  };
}

export default connect(null, mapDispatchToProps)(RowView);
