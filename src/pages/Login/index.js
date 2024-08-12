import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firbase"; // Import the Firebase app
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const Index = ({ onLogin }) => {
    const navigate =useNavigate()
    const auth = getAuth(app);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async(values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log("User signed in:", userCredential.user);
            onLogin();
             navigate('/');
          } catch (error) {
            console.error("Error signing in:", error);
          }
      
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: 'lightgray',
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: '35rem',
          background: 'linear-gradient(to bottom, black, gray)',
          color: 'white',
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                }`}
                id="email"
                placeholder="Enter email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? 'is-invalid'
                    : ''
                }`}
                id="password"
                placeholder="Enter password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
