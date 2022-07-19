import {Outlet} from "react-router-dom";

const Index = () => {
  return (
    <div>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Favourite</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#/">Home</a>
                </li>
                <li className="breadcrumb-item active">Favourite</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Index;
