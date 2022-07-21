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
import { FIREBASE_COLLECTION_PEOPLES, FIREBASE_ENABLE } from "./global";
import { onSnapshot, doc, getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";

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
        if (FIREBASE_ENABLE) {
          synchronizeFirebaseData(data.people)
        } else {
          cacheLocalPeoples(data.people, false);
        }
      });
  };

  const synchronizeFirebaseData = async (peoples) => {
    let refPeoples = [] 
    await peoples.map(async (people)=> {
      const docRef = await addDoc(collection(db, FIREBASE_COLLECTION_PEOPLES), people).catch(err=>console.error(err))
      people.refId = docRef.id
      refPeoples.push(people)
    })

    props.AddAllPeople(refPeoples)

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

    /*const unsubscribe = onSnapshot(query(itemsCol), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
      });
    });*/
    //clearFirebaseData(itemSnapshot.docs)
    if (itemSnapshot.docs.length <= 0) {
      getLocalJsonData()
    } else {
      cacheLocalPeoples(itemSnapshot.docs, true)
    }
  }

  const cacheLocalPeoples = (peoples, isFirebase = false) => {
    let cachePeoples = []
    peoples.forEach((people)=>{
      let cachePeople = people
      if (isFirebase) {
        cachePeople = people.data()
        cachePeople.refId = people.id
      } else {
        cachePeople.refId = ''
      }
      
      cachePeoples.push(cachePeople)
    })

    props.AddAllPeople(cachePeoples)
  }

  useEffect(() => {
    if (FIREBASE_ENABLE) {
      initData()
    } else {
      getLocalJsonData()
    }
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
