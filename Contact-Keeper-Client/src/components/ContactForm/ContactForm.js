import React, { useContext, useState } from "react";
import { TAXI, BIKE } from "../../configs/constants";
import contactContext from "../../contexts/ContactContext/ContactContext";
import { initialValues } from "../../pages/HomePage/HomePage";

const ContactForm = (props) => {
  // Props
  const { onAddContact, contactForm, setContactForm } = props;
  const ctxContact = useContext(contactContext);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onAddContact(ctxContact.validate(contactForm));
    setContactForm(initialValues);
    // setTimeout(()=> {
    //   props.setShowForm((pre) => !pre);
    // }, 1000)
  };
  const handleShowContactForm = () => {
    props.setShowForm((pre) => !pre);
  };

  const {
    _id,
    driverName,
    licensePlate,
    phoneNumber,
    vehicleBrand,
    travelMode,
    password,
    passwordAgain
  } = contactForm;
  // let password = "";
  // let passwordAgain = "";
  const isDisabledSubmitButton =
    !driverName &&
    !licensePlate &&
    !phoneNumber &&
    !vehicleBrand &&
    !travelMode &&
    !password &&
    !passwordAgain;
  return (
    <div className="contact-form-container">
      <h4 className="flex justify-center font-bold text-lg">Contact Form</h4>
      <form className="mt-4" onSubmit={onSubmitHandler} action="POST">
        <div className="mb-2">
          <label htmlFor="driverName" className="form-label">
            Fullname:
          </label>
          <input
            className="form-control"
            id="driverName"
            name="driverName"
            value={driverName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="licensePlate" className="form-label">
            License Plate:
          </label>
          <input
            type="text"
            className="form-control"
            id="licensePlate"
            name="licensePlate"
            value={licensePlate}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleBrand" className="form-label">
            Vehicle Brand:
          </label>
          <input
            className="form-control"
            id="vehicleBrand"
            name="vehicleBrand"
            value={vehicleBrand}
            onChange={onChangeHandler}
          />
        </div>

        <div className="mb-2 ">
          <div className="flex">
            <p className="mr-6">Travel Mode:</p>
            <div className="d-flex">
              <div className="form-check me-3">
                <input
                  className="form-check-input "
                  type="radio"
                  name="travelMode"
                  id="bikeType"
                  checked={travelMode === BIKE}
                  onChange={onChangeHandler}
                  value={BIKE}
                />
                <label className="form-check-label" htmlFor="bikeType">
                  Bike
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="travelMode"
                  id="taxiType"
                  checked={travelMode === TAXI}
                  onChange={onChangeHandler}
                  value={TAXI}
                />
                <label className="form-check-label" htmlFor="taxiType">
                  Taxi
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full h-[65px]">
          <div className="mb-3 flex items-center justify-center gap-2 w-1/2">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChangeHandler}
            />
          </div>

          {password && (
            <div className="mb-3 flex items-center justify-center gap-2 w-1/2">
            <label htmlFor="passwordAgain" className="form-label">
              Password Again:
            </label>
            <input
              className="form-control"
              id="passwordAgain"
              type="password"
              name="passwordAgain"
              value={passwordAgain}
              onChange={onChangeHandler}
            />
          </div>
          )}
        </div>
        <div className="flex">
          <button
            type="submit"
            className="btn hover:bg-slate-300 w-100 text-dark border-1 border-solid border-emerald-600 cursor-pointer mr-5"
            disabled={isDisabledSubmitButton}
          >
            Submit
          </button>
          <button
            className="showContactForm bg-slate-300 hover:bg-slate-400 w-20 rounded-lg border-solid border-1 border-red-400"
            onClick={handleShowContactForm}
          >
            Exit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
