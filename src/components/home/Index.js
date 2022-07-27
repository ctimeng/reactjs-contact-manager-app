import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Index = (props) => {
  const totalContact = () => {
    const contacts = props.peoples.filter(
      (people) => people.isContact === true
    );
    return contacts.length;
  };

  const totalFavourite = () => {
    const favourites = props.peoples.filter(
      (people) => people.isFavourite === true
    );
    return favourites.length;
  };

  const totalCompany = () => {
    const companies = props.peoples
      .map((people) => people["company"])
      // store the keys of the unique objects
      .map((people, index, final) => final.indexOf(people) === index && index)
      // eliminate the dead keys & store unique objects
      .filter((people) => props.peoples[people])
      .map((people) => props.peoples[people]);

    return companies.length;
  };

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{props.peoples.length}</h3>
                <p>People</p>
              </div>
              <div className="icon">
                <i className="fas fa-user"></i>
              </div>
              <NavLink className="small-box-footer" to="/">
                More info <i className="fas fa-arrow-circle-right"></i>
              </NavLink>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{totalCompany()}</h3>
                <p>Company</p>
              </div>
              <div className="icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <NavLink className="small-box-footer" to="/company">
                More info <i className="fas fa-arrow-circle-right"></i>
              </NavLink>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{totalContact()}</h3>
                <p>Contact</p>
              </div>
              <div className="icon">
                <i className="fas fa-address-book"></i>
              </div>
              <NavLink className="small-box-footer" to="/contact">
                More info <i className="fas fa-arrow-circle-right"></i>
              </NavLink>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>{totalFavourite()}</h3>
                <p>Favourite</p>
              </div>
              <div className="icon">
                <i className="fas fa-heart"></i>
              </div>
              <NavLink className="small-box-footer" to="/favourite">
                More info <i className="fas fa-arrow-circle-right"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(Index);
