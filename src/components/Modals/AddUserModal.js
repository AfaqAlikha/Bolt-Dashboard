import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../../Firbase";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const validationSchema = Yup.object({
  phoneType: Yup.string().required("Phone Type is required"),
  imei: Yup.string()
    .required("IMEI is required")
    .length(15, "IMEI must be exactly 15 characters"),
});

// Helper function to generate a random six-digit number
const generateRandomPassword = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const AddUserModal = ({ show, handleClose }) => {
  const [user, setUsers] = useState(null);

  const [error, setError] = useState(null);

  const db = getDatabase(app);  // Get database instance
  const dbRef = ref(db);  // Reference to the root of the database

  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const uid = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const getAllUsers = async () => {
      if (uid) {
        try {
          const snapshot = await get(child(dbRef, `users/parents/${uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUsers(userData);
          } else {
            console.log("No data available for the current user");
          }
        } catch (error) {
          console.error("Error retrieving data:", error);
        } finally {
         
        }
      } else {
        console.log("No user is currently logged in");
        
      }
    };

    getAllUsers();
  }, [uid]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (uid) {
      try {
        const childIMINumber = values.imei;
        const childId = `${uid}${childIMINumber}`;
        const childRef = child(dbRef, `users/parents/${uid}/kids/${childId}`);
        const childSnapshot = await get(childRef);

        if (childSnapshot.exists()) {
          setError("User already exists");
        } else {
          // Generate a random six-digit password
          const randomPassword = generateRandomPassword();

          // Save to users/childs/{parentUid + childIMINumber}
          await set(child(dbRef, `users/childs/${childId}`), {
            appDeleted: false,
            childnumber: values.imei,
            customercnic: "",
            customerphone: "",
            depositpaid: "",
            displayName: "",
            instalmenttype: "",
            
            kidpassword: randomPassword,  // Use generated password
            kidstatus: false,
            loanamount: "",
            loanbalance: "",
            loanperiod: "",
            mobileimei: values.imei,
            mobiletype: values.phoneType,
            name: "",
            parentPhone: user?.phone || "",
            parentUid: uid,
            phone: values.imei,
            photo: {
              params: {
                capturePhoto: false,
                facingPhoto: 1
              },
              permissionEnable: false
            },
            screenLock: {
              endmiliseconds: 0,
              hours: 0,
              hoursend: 0,
              locked: false,
              minutes: 0,
              minutesend: 0,
              startmiliseconds: 0,
              timeInMinutes: 0,
              timeInMinutesend: 0,
              timeInSeconds: 0,
              timeInSecondsend: 0
            }
          });

         
          await set(child(dbRef, `users/parents/${uid}/kids/${childId}`), {
            key: childId,
            kidphone: values.imei,
          });

          // Clear any previous errors
          setError(null);

          // Show success toast
          toast.success("User added successfully!");

          // Close the modal
          handleClose();
        }
      } catch (error) {
        console.error("Error saving data:", error);
        setError("Error saving data. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      console.log("No user is currently logged in");
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
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Formik
            initialValues={{ phoneType: "", imei: "" }}
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
                  <FormGroup controlId="phoneType" className="mb-3">
                    <FormLabel style={{ fontSize: "14px" }}>Phone Type</FormLabel>
                    <Field
                      as={FormControl}
                      name="phoneType"
                      placeholder="ENTER PHONE TYPE"
                      style={{ backgroundColor: 'white', color: 'black', fontSize: "12px", border: '1px solid #ccc' }}
                    />
                    <ErrorMessage
                      name="phoneType"
                      component="div"
                      className="text-danger"
                      style={{ fontSize: "12px", padding: "1px 4px" }}
                    />
                  </FormGroup>

                  <FormGroup controlId="imei" className="mb-3">
                    <FormLabel style={{ fontSize: "14px" }}>IMEI</FormLabel>
                    <Field
                      as={FormControl}
                      name="imei"
                      placeholder="ENTER IMEI"
                      style={{ backgroundColor: 'white', fontSize: "12px", color: 'black', border: '1px solid #ccc' }}
                    />
                    <ErrorMessage
                      name="imei"
                      component="div"
                      className="text-danger"
                      style={{ fontSize: "12px", padding: "1px 4px" }}
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
                      Add User
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer />  {/* Add ToastContainer for toast notifications */}
    </>
  );
};

export default AddUserModal;
