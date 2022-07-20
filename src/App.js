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
import { useEffect } from "react";
import Home from "./components/home/Index";
import Company from "./components/company/Index";
import CompanyList from "./components/company/List";
import NoPage from './components/NoPage'
import firebaseApp from './Firebase';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { FIREBASE_COLLECTION_PEOPLES } from "./global";

function App(props) {

  const db = getFirestore(firebaseApp);

  const getLocalJsonData = async() => {
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
        //synchronizeFirebaseData(data.people)
      });
  };

  const synchronizeFirebaseData = async (peoples) => {
    await peoples.map(async (people)=> {
      addDoc(collection(db, FIREBASE_COLLECTION_PEOPLES), people).catch(err=>console.error(err))
    })

    /*const batch = db.batch();
    await peoples.map(async (people)=> {
      const collectionRef = await db.collection('peoples').doc();
      batch.create(collectionRef, people);
    });

    const result = await batch.commit();
    console.log(result)*/
  }

  const clearFirebaseData = async (collections) => {
    collections.forEach((docPeople) => {
      const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, docPeople.id);
      deleteDoc(noteRef);
    })
  }

  const initData = async () => {
    const itemsCol = collection(db, FIREBASE_COLLECTION_PEOPLES);
    const itemSnapshot = await getDocs(itemsCol);
    //clearFirebaseData(itemSnapshot.docs)
    if (itemSnapshot.docs.length <= 0) {
      getLocalJsonData()
    } else {
      let peoples = []
      itemSnapshot.docs.forEach((peopleDoc)=>{
        let people = peopleDoc.data()
        people.refId = peopleDoc.id
        peoples.push(people)
      })

      props.AddAllPeople(peoples)
    }
  }

  useEffect(() => {
    //initData()
    getLocalJsonData()
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
    AddAllPeople: (peoples) => dispatch(AddAllPeople(peoples))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
