import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";
import Layout from "./components/Layout";
import People from "./components/people/Index";
import PeopleList from "./components/people/List";
import Contact from "./components/contact/Index";
import ContactList from "./components/contact/List";
import ContactCreate from "./components/contact/Create";
import ContactEdit from "./components/contact/Edit";
import Favourite from "./components/favourite/Index";
import FavouriteList from "./components/favourite/List";
import Home from "./components/home/Index";
import Company from "./components/company/Index";
import CompanyList from "./components/company/List";
import NoPage from "./components/NoPage";
import { connect } from "react-redux";
import { AddAllPeople } from "./actions";
import { useEffect } from "react";
import firebaseApp from "./Firebase";
import { FIREBASE_COLLECTION_PEOPLES } from "./global";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  query,
  onSnapshot,
  orderBy
} from "firebase/firestore";

function App(props) {
  const db = getFirestore(firebaseApp);

  const clearFirebaseData = async () => {
    const itemsCol = collection(db, FIREBASE_COLLECTION_PEOPLES);
    const collections = await getDocs(itemsCol);
    collections.forEach((docPeople) => {
      const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, docPeople.id);
      deleteDoc(noteRef);
    });
  };

  const initData = async() => {
    const q = query(collection(db, FIREBASE_COLLECTION_PEOPLES), orderBy('name'))
    onSnapshot(q, (querySnapshot) => {
      let peoples = []
      querySnapshot.docs.forEach(function(doc){
        let people = doc.data()
        people.id = doc.id
        peoples.push(people)
      })
      props.AddAllPeople(peoples);
    })
  }

  useEffect(() => {
    //clearFirebaseData()
    initData()
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />}>
            <Route index element={<ContactList/>} />
            <Route path="create" element={<ContactCreate/>} />
            <Route path=":id/edit" element={<ContactEdit/>} />
          </Route>
          <Route path="/favourite" element={<Favourite />}>
            <Route index element={<FavouriteList/>} />
          </Route>
          <Route path="/people" element={<People />}>
            <Route index element={<PeopleList />} />
          </Route>
          <Route path="/company" element={<Company />}>
            <Route index element={<CompanyList />} />
          </Route>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddAllPeople: (peoples) => dispatch(AddAllPeople(peoples)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
