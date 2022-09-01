import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../../Firebase";
import { FIREBASE_COLLECTION_PEOPLES } from "../../global";
import { getFirestore, collection, addDoc } from "firebase/firestore";

type FormValues = {
  name: string;
  city: string;
  company: string;
  position: string;
  avatar: string;
  social_networks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    skype: string;
  };
};

const Create = () => {
  const navigate = useNavigate();
  const firestore = getFirestore(firebaseApp);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const errorStyle = {
    color: "red",
  };

  const URL_REGEX =
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

  const onSubmit = async (formData: any, event: any) => {
    event.preventDefault();
    setLoading(true);
    formData.isContact = true;
    formData.isFavourite = false;
    await addDoc(collection(firestore, FIREBASE_COLLECTION_PEOPLES), formData)
      .catch((error: any) => console.error(error))
      .then(() => {
        navigate("/contact");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  required: { value: true, message: "This field is required" },
                  pattern: { value: URL_REGEX, message: "Invalid URL" },
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
            {errors.social_networks?.facebook && (
              <span style={errorStyle}>Invalid URL</span>
            )}
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
            {errors.social_networks?.twitter && (
              <span style={errorStyle}>Invalid URL</span>
            )}
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
            {errors.social_networks?.instagram && (
              <span style={errorStyle}>Invalid URL</span>
            )}
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
            {errors.social_networks?.linkedin && (
              <span style={errorStyle}>Invalid URL</span>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Skype"
                {...register("social_networks.skype", {
                  required: false,
                  pattern: URL_REGEX,
                })}
              />
            </div>
            {errors.social_networks?.skype && (
              <span style={errorStyle}>Invalid URL</span>
            )}
          </fieldset>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-info">
            Save {loading ? <i className="fas fa-spinner fa-spin"></i> : ""}
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
};

export default Create;
