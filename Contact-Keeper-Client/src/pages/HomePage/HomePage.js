import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../contexts/ContactContext/ContactContext";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { PERSONAL } from "../../configs/constants";
import Header from "../../layouts/Header/Header";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
import ContactService from "../../services/contactServices";
import authContext from "../../contexts/AuthContext/authContext";
import Modal from "../../components/Modal/Modal";
import Footer from "../../layouts/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const initialValues = {
  driverName: "",
  licensePlate: "",
  phoneNumber: "",
  vehicleBrand: "",
  travelMode: "",
  password: "",
  passwordAgain: "",
};
const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(true);
  const [numberPg, setNumberPg] = useState("");
  const [query, setQuery] = useState({
    keyword: "",
    pageNumber: "",
  });

  const [infCard, setInfCard] = useState("");
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [showForm, setShowForm] = useState(false);
  const [contactForm, setContactForm] = useState(initialValues);

  const { tokenize, state } = useContext(authContext);

  const fetchContact = async () => {
    // const tokenLocalStorage = localStorage.getItem("token");
    try {
      // axiosInstance.defaults.headers.common["x-auth-token"] = tokenLocalStorage;
      // const contactResponse = await axiosInstance.get("/contact")

      const contactResponse = await ContactService.getAll(
        query.keyword,
        query.pageNumber
      );
      setNumberPg(contactResponse.data.numberPage);
      const contactsData = contactResponse.data.contacts;
      setContacts(contactsData);
    } catch (err) {}
  };

  useEffect(() => {
    if (!state.user) {
      tokenize();
    }
    fetchContact();
  }, [show]);

  const removeContact = async (id) => {
    const conf = window.confirm("Ban co chan chan muon xoa");
    if (conf) {
      // await axiosInstance.delete(`/contact/${id}`)
      await ContactService.delete(id)
        .then((res) => {
          toast.success("Delete contact successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setShow((pre) => !pre);
        })
        .catch((err) =>
          toast.error("contact delete failed!", {
            position: toast.POSITION.TOP_CENTER,
          })
        );
    }
    // setContacts(contacts.filter((item) => item.id !== id));
  };
  const onAddContact = async (contact) => {
    const index = contacts.find((item) => item._id === contact._id);
    if (index) {
      // const newContact = [...contacts];
      // newContact.splice(index, 1, contact);
      // setContacts(newContact);
      // await axiosInstance.put(`/contact/${index._id}`, contact)
      if (
        contact.driverName &&
        contact.phoneNumber &&
        contact.licensePlate &&
        contact.vehicleBrand &&
        contact.travelMode
      ) {
        if (!contact.passwordAgain && !contact.password) {
          await ContactService.update(index._id, contact)
            .then((res) => {
              toast.success("Update successful!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setShowForm((pre) => !pre);
            })
            .catch((err) => {
              setContactForm({ ...infCard, password: "" });
              toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
        } else if (
          (!contact.password && contact.passwordAgain) ||
          (!contact.passwordAgain && contact.password) ||
          contact.passwordAgain !== contact.password
        ) {
          // setContactForm({ ...infCard, password: "" });
          return;
        } else {
          await ContactService.update(index._id, contact)
            .then((res) => {
              toast.success("Update successful!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setShow((pre) => !pre);
            })
            .catch((err) => {
              setContactForm({ ...infCard, password: "" });
              toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
        }
      }
    } else {
      // setContacts((prev) => [
      //   ...prev,
      //   { ...contact, id: new Date().toDateString() },
      // ]);
      // await axiosInstance.post("/contact", contact)
      if (
        contact.driverName &&
        contact.phoneNumber &&
        contact.licensePlate &&
        contact.vehicleBrand &&
        contact.travelMode &&
        contact.password &&
        contact.passwordAgain
      ) {
        if (contact.password === contact.passwordAgain) {
          await ContactService.create(contact)
            .then((res) => {
              toast.success("More success information!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setContactForm(initialValues);
              setShow((pre) => !pre);
            })
            .catch((err) =>
              toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
              })
            );
        }
      }
    }
  };
  const validate = (values) => {
    if (!values.driverName) {
      toast.error("Name is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values.licensePlate) {
      toast.error("License plate is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values.phoneNumber) {
      toast.error("Phone is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values.vehicleBrand) {
      toast.error("Vehicle brand is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values.travelMode) {
      toast.error("Travel mode is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values._id && !values.password) {
      toast.error("Password is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values._id && !values.passwordAgain) {
      toast.error("Password again is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (
      values.passwordAgain &&
      values.password &&
      values.passwordAgain !== values.password
    ) {
      toast.error("Password again and password do not overlap!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (values._id && !values.password && values.passwordAgain) {
      toast.error("Password is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (values._id && !values.passwordAgain && values.password) {
      toast.error("Password again is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    return values;
  };
  return (
    <div className="h-[100vh] bg-neutral-50 ">
      <div className="row-span-2 h-[10vh]">
        <Header />
      </div>
      <div className="container p-2  h-[75vh] ">
        <ContactContext.Provider
          value={{
            contacts,
            setContactForm,
            removeContact,
            validate,
            toggleModal,
            modal,
            setInfCard,
            infCard,
          }}
        >
          <div className="pt-4">
            <div className="row flex justify-center">
              {showForm && (
                <div className="col-12 col-md-6">
                  <ContactForm
                    onAddContact={onAddContact}
                    contactForm={contactForm}
                    setContactForm={setContactForm}
                    setShowForm={setShowForm}
                  />
                </div>
              )}
              {!showForm && (
                <div className="col-12 col-md-12">
                  <ContactList
                    setShow={setShow}
                    setQuery={setQuery}
                    query={query}
                    setShowForm={setShowForm}
                    numberPage={numberPg}
                  ></ContactList>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <Modal setShowForm={setShowForm}></Modal>
          </div>
        </ContactContext.Provider>
      </div>
      <div className="h-[15vh]">
        <Footer></Footer>
      </div>
      <ToastContainer autoClose={1200}></ToastContainer>
    </div>
  );
};

export default HomePage;
