import React, { useContext, useState } from 'react'
import contactContext from '../../contexts/ContactContext/ContactContext'
import './ContactCard.css'
import Modal from '../Modal/Modal';
const ContactCard = ({ card, handleShowContactForm }) => {
  const ctxContact = useContext(contactContext);
//
  // const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // }
  
  const handleCard = () => {
    ctxContact.setInfCard(card)
    ctxContact.toggleModal()
  }

  return (
    <>
    {/* <Modal modal ={modal} toggleModal = {toggleModal}></Modal> */}
    <div className="content w-96 rounded-lg grid grid-flow-row-dense grid-cols-12">
    
      <div className="info col-span-7">
        <span className="card bg-gray-400 ">{card.driverName}</span>
        {/* <p className='type'>{card.type}</p> */}
      </div>
      {/* <p className="email">Email: {card.email}</p> 
      <p className="phone">Phone: {card.phone}</p>
      <p className='user'>Added by user: {card.user}</p> */}
      <div className="gr-button flex items-center col-span-5">
        <button
          className="edit-button rounded-lg bg-slate-300 hover:bg-gray-400 border-neutral-300 border-solid border-2"
          onClick={handleCard}
        >
          View
        </button>
        <button
          className="delete-button rounded-lg ml-1 bg-red-600 hover:bg-red-900 text-slate-200 border-orange-100 border-solid border-2 "
          onClick={() => ctxContact.removeContact(card._id)}
        >
          Delete
        </button>
      </div>
    </div>
    </>
  )
}

export default ContactCard
