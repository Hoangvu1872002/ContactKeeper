import React, { useContext } from "react";
import contactContext from "../../contexts/ContactContext/ContactContext";
import "./Modal.css";
const Modal = (props) => {
  const ctxContact = useContext(contactContext);

  const infCard = ctxContact.infCard;

  const handleShowContactForm = () => {
    props.setShowForm((pre) => !pre);
  };

  return (
    <div>
      {ctxContact.modal && (
        <div className="modall">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="flex justify-center font-bold text-lg">
              <p>Information Contact</p>
            </div>
            <div className="inf flex justify-around  mt-4 mb-3">
              <div className="lable">
                <p>License plate: </p> <br></br>
                <p>Name driver: </p> <br></br>
                <p>Phone number: </p> <br></br>
                <p>Total rating: </p> <br></br>
                <p>Vehicle brand: </p> <br></br>
                <p>Travel mode: </p> <br></br>
                <p>Role: </p> <br></br>
                <p>Added by admin: </p> <br></br>
                <p>Id: </p>
              </div>

              <div className="contentModel">
                <p> {infCard.licensePlate}</p> <br></br>
                <p> {infCard.driverName}</p> <br></br>
                <p> {infCard.phoneNumber}</p> <br></br>
                <p> {infCard.totalRating}</p> <br></br>
                <p> {infCard.vehicleBrand}</p> <br></br>
                <p> {infCard.travelMode}</p> <br></br>
                <p> {infCard.role}</p> <br></br>
                <p> {infCard.user}</p> <br></br>
                <p> {infCard._id}</p>
              </div>
            </div>
            <div className="close-modal flex">
              <button
                className="bg-emerald-500 hover:bg-emerald-700 w-9 h-9 rounded-full border-1 border-solid border-stone-300 text-gray-50"
                onClick={() => {
                  ctxContact.setContactForm({ ...infCard, password: "" });
                  handleShowContactForm();
                  ctxContact.toggleModal();
                }}
              >
                Edit
              </button>
              <button
                className=" bg-red-500 hover:bg-red-700 w-9 h-9 ml-1 rounded-full border-1 border-solid border-gray-950 text-gray-50"
                onClick={ctxContact.toggleModal}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
