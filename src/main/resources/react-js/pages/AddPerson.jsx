import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddPerson = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);

  if (error) {
    return "Error";
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      }}
      onSubmit={async ({ firstName, lastName, email, phoneNumber }) => {
        try {
          const response = await fetch("http://localhost:8080/api/person", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email, phoneNumber }),
          });
          const data = await response.json();
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
              <button type="submit" disabled={isSubmitting} className="button">
                Add
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddPerson;
