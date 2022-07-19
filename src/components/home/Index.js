const Index = () => {
  return (
    <div className="row">
      <div className="col-lg-3 col-6">
        <div className="small-box bg-info">
          <div className="inner">
            <h3>150</h3>
            <p>People</p>
          </div>
          <div className="icon">
            <i className="ion ion-bag"></i>
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="small-box bg-success">
          <div className="inner">
            <h3>
              53<sup>%</sup>
            </h3>
            <p>Contact</p>
          </div>
          <div className="icon">
            <i className="ion ion-stats-bars"></i>
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>44</h3>
            <p>Favourite</p>
          </div>
          <div className="icon">
            <i className="ion ion-person-add"></i>
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="small-box bg-danger">
          <div className="inner">
            <h3>65</h3>
            <p>Company</p>
          </div>
          <div className="icon">
            <i className="ion ion-pie-graph"></i>
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
