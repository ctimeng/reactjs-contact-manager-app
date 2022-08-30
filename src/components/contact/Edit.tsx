import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import firebaseApp from "../../Firebase";
import { FIREBASE_COLLECTION_PEOPLES } from "../../global";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc
} from "firebase/firestore";

function Edit(props) {

  const navigate = useNavigate();
  const params = useParams();
  const db = getFirestore(firebaseApp);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: useMemo(() => {
      return people;
    }, [people]),
  });

  const errorStyle = {
    color: "red",
  };

  const URL_REGEX =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  const onSave = async(formData, e) => {
    e.preventDefault();
    setLoading(true)
    formData.isContact = true
    const peopleDocRef = doc(db, FIREBASE_COLLECTION_PEOPLES, params.id)
    await updateDoc(
      peopleDocRef,
      formData
    ).catch((err) => console.error(err)).then(() => {
      navigate("/contact");
    }).finally(() => {
      setLoading(false)
    });
  }

  const getPeople = async () => {
    setLoading(true)
    const peopleDocRef = doc(db, FIREBASE_COLLECTION_PEOPLES, params.id)
    const docSnap =  await getDoc(peopleDocRef);
    setPeople(docSnap.data())
    reset(docSnap.data())
    setLoading(false)
  } 

  useEffect(() => {
    getPeople()
  }, [])

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSave)}>
        <div className="card-body">
          <fieldset className="border p-2">
            <legend className="w-auto">Personal</legend>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <span style={errorStyle}>This field is required</span>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                {...register("city", { required: true })}
              />
            </div>
            {errors.city && (
              <span style={errorStyle}>This field is required</span>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Company"
                {...register("company", { required: true })}
              />
            </div>
            {errors.company && (
              <span style={errorStyle}>This field is require</span>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Position"
                {...register("position", { required: true })}
              />
            </div>
            {errors.position && (
              <span style={errorStyle}>This field is require</span>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Avatar"
                {...register("avatar", { 
                  required: {value: true, message: "This field is required"}, 
                  pattern: {value: URL_REGEX, message:"Invalid URL"}
                })}
              />
            </div>
            {errors.avatar && (
              <span style={errorStyle}>{errors.avatar.message}</span>
            )}
          </fieldset>
          <fieldset className="border p-2">
            <legend className="w-auto">Social Networks</legend>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Facebook"
                {...register("social_networks.facebook", {
                  required: false,
                  pattern: URL_REGEX,
                })}
              />
            </div>
            {errors.facebook && <span style={errorStyle}>Invalid URL</span>}
            <div className="mb-3">
              {" "}
              <input
                type="text"
                className="form-control"
                placeholder="Twitter"
                {...register("social_networks.twitter", {
                  required: false,
                  pattern: URL_REGEX,
                })}
              />
            </div>
            {errors.twitter && <span style={errorStyle}>Invalid URL</span>}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Instagram"
                {...register("social_networks.instagram", {
                  required: false,
                  pattern: URL_REGEX,
                })}
              />
            </div>
            {errors.instagram && <span style={errorStyle}>Invalid URL</span>}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Linkedin"
                {...register("social_networks.linkedin", {
                  required: false,
                  pattern: URL_REGEX,
                })}
              />
            </div>
            {errors.instagram && <span style={errorStyle}>Invalid URL</span>}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Skype"
                {...register("social_networks.skype", { required: false, pattern: URL_REGEX })}
              />
            </div>
            {errors.skype && <span style={errorStyle}>Invalid URL</span>}
          </fieldset>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-info">
            Update {loading ? (<i className="fas fa-spinner fa-spin"></i>) : ''}
          </button>
          <Link
            to={{ pathname: `/contact` }}
            className="btn btn-default float-right"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Edit;
