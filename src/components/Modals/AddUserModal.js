import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import 'bootstrap/dist/css/bootstrap.min.css';

const validationSchema = Yup.object({
  phoneType: Yup.string().required("Phone Type is required"),
  imei: Yup.string()
    .required("IMEI is required")
    .length(15, "IMEI must be exactly 15 characters"),
});

const AddUserModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ phoneType: "", imei: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission
            console.log(values);
            setSubmitting(false);
            handleClose();
          }}
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
                    style={{ backgroundColor: 'white', color: 'black', fontSize:"12px", border: '1px solid #ccc' }}
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
                    style={{ backgroundColor: 'white',fontSize:"12px", color: 'black', border: '1px solid #ccc' }}
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
                    onClick={handleClose}
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
  );
};

export default AddUserModal;
