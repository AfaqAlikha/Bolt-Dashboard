import React, { useState,useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firbase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  category: Yup.string().required("Category is required"),
});

const AddAdminModal = ({ show, handleClose }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
 
    const db = getDatabase(app);
    const dbRef = ref(db);
  
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
  
    const uid = currentUser ? currentUser.uid : null;
  
    useEffect(() => {
      const getCurrentUser = async () => {
        if (uid) {
         
          try {
            const snapshot = await get(child(dbRef, `users/parents/${uid}`));
            if (snapshot.exists()) {
              const userData = snapshot.val();
             
              setUser(userData);
            } else {
              console.log("No data available for the current user");
            }
          } catch (error) {
            console.error("Error retrieving data:", error);
          }
        } else {
          console.log("No user is currently logged in");
        }
      };
  
      getCurrentUser();
    }, [uid]);

    const handleFormSubmit = async (values, { setSubmitting }) => {
      try {
        const { email, password, category, active } = values;
    
        // Create a new user with email and password in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newAdminUid = userCredential.user.uid;
    
        // Save to users/admin/{newAdminUid}
        await set(ref(db, `users/admin/${newAdminUid}`), {
          email,
          category,
          password,
          active,
          parentUid: uid,
          parentPhone: user?.phone || "",
        });
    
        setError(null);
        toast.success("Admin added successfully!");
        signOut(auth)
        signInWithEmailAndPassword(
          auth,
          "+233264300000@gmail.com",
          "828207"
        );
        handleClose();
      } catch (error) {
        console.error("Error creating admin:", error);
        setError("Error creating admin. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };
    
  
    return (
      <>
        <Modal
          show={show}
          onHide={() => {
            setError(null);
            handleClose();
          }}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{ email: "", password: "", category: "sub admin", active: true }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div
                    className="card p-4 shadow"
                    style={{
                      background: 'linear-gradient(to bottom, black, gray)',
                      color: 'white',
                    }}
                  >
                    <FormGroup controlId="email" className="mb-3">
                      <FormLabel style={{ fontSize: "14px" }}>Email</FormLabel>
                      <Field
                        as={FormControl}
                        name="email"
                        placeholder="Enter email"
                        style={{ backgroundColor: 'white', color: 'black', fontSize: "12px", border: '1px solid #ccc' }}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                        style={{ fontSize: "12px", padding: "1px 4px" }}
                      />
                    </FormGroup>
  
                    <FormGroup controlId="password" className="mb-3">
                      <FormLabel style={{ fontSize: "14px" }}>Password</FormLabel>
                      <Field
                        as={FormControl}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        style={{ backgroundColor: 'white', color: 'black', fontSize: "12px", border: '1px solid #ccc' }}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                        style={{ fontSize: "12px", padding: "1px 4px" }}
                      />
                    </FormGroup>
  
                    <FormGroup controlId="category" className="mb-3">
                      <FormLabel style={{ fontSize: "14px" }}>Category</FormLabel>
                      <Field
                        as="select"
                        name="category"
                        className="form-select"
                        style={{ backgroundColor: 'white', color: 'black', fontSize: "12px", border: '1px solid #ccc' }}
                      >
                        <option value="sub admin">Sub Admin</option>
                        <option value="super admin">Super Admin</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-danger"
                        style={{ fontSize: "12px", padding: "1px 4px" }}
                      />
                    </FormGroup>
  
                    <FormGroup controlId="active" className="mb-3">
                      <FormLabel style={{ fontSize: "14px", padding: "1px 7px" }}>Active</FormLabel>
                      <Field
                        type="checkbox"
                        name="active"
                        className="form-check-input"
                        style={{ transform: "scale(1.2)" }}
                      />
                    </FormGroup>
  
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setError(null);
                          handleClose();
                        }}
                        disabled={isSubmitting}
                      >
                        Close
                      </Button>
                      <Button type="submit" variant="dark" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : "Add Admin"}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
        <ToastContainer />
      </>
    );
  };
  

export default AddAdminModal;
