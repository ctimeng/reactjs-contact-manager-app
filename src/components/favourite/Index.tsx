import {Outlet} from "react-router-dom";
import NavigationBarView from "../custom/NavigationBarView";

const Index = () => {
  return (
    <div>
      <NavigationBarView page="Favourite"/>
      <section className="content">
        <div className="container-fluid">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Index;
