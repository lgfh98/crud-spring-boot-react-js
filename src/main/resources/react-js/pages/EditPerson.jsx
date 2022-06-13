import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const EditPerson = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [person, setPerson] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/persons/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setPerson(data);
        setLoading(false);
        if (data.error) {
          setError(data.error);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return "Error";
  }
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <Formik
          initialValues={{
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email,
            phoneNumber: person.phoneNumber,
          }}
          onSubmit={async ({ id, firstName, lastName, email, phoneNumber }) => {
            try {
              const response = await fetch("http://localhost:8080/api/person", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id,
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                }),
              });
              const data = response.json();
              if (data.error) {
                setError(data.error);
              } else {
                navigate("/");
              }
            } catch (error) {
              setError(error);
            }
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email().required("Required"),
            phoneNumber: Yup.string().required("Required"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="py-2">
                  <label htmlFor="firstName" className="block">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Enter your firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.firstName && touched.firstName
                        ? "rounded text-error outline outline-2 outline-offset-2"
                        : "rounded"
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="mt-1 text-error">{errors.firstName}</div>
                  )}
                </div>

                <div className="py-2">
                  <label htmlFor="lastName" className="block">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Enter your lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.lastName && touched.lastName
                        ? "rounded text-error outline outline-2 outline-offset-2"
                        : "rounded"
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="mt-1 text-error">{errors.lastName}</div>
                  )}
                </div>

                <div className="py-2">
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "rounded text-error outline outline-2 outline-offset-2"
                        : "rounded"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="mt-1 text-error">{errors.email}</div>
                  )}
                </div>

                <div className="py-2">
                  <label htmlFor="phoneNumber" className="block">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    placeholder="Enter your phoneNumber"
                    type="text"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.phoneNumber && touched.phoneNumber
                        ? "rounded text-error outline outline-2 outline-offset-2"
                        : "rounded"
                    }
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="mt-1 text-error">{errors.phoneNumber}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="button"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button"
                  >
                    Edit
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default EditPerson;
