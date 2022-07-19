import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";
import Layout from "./components/Layout";
import People from "./components/people/Index";
import PeopleList from "./components/people/List";
import Contact from "./components/contact/Index";
import ContactList from "./components/contact/List";
import Favourite from "./components/favourite/Index";
import FavouriteList from "./components/favourite/List";
import { connect } from "react-redux";
import { AddAllPeople } from "./actions";
import { useState, useEffect } from "react";
import Home from "./components/home/Index";
import Company from "./components/company/Index";
import CompanyList from "./components/company/List";

function App(props) {
  const getData = async () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        props.AddAllPeople(data.people);
        /*let peopleCities = ['']
        data.people.forEach(function (people, i) {
          if (!peopleCities.includes(people.city)) {
            peopleCities.push(people.city)
          }
        })
        setCities(peopleCities)*/
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<People />} >
            <Route index element={<PeopleList />} />
          </Route>
          <Route path="/contact" element={<Contact />} >
            <Route index element={<ContactList />} />
          </Route>
          <Route path="/favourite" element={<Favourite />} >
            <Route index element={<FavouriteList />} />
          </Route>
          <Route path="/company" element={<Company />} >
            <Route index element={<CompanyList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddAllPeople: (peoples) => dispatch(AddAllPeople(peoples))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
