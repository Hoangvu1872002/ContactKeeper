const express = require("express");
const {
  getContact,
  createContact,
  deleteContactByID,
  updateContact,
  updateManyContact,
  deleteManyContact,
} = require("../controller/contactController");
const { protect } = require("../middleware/authMiddleware");
const contactRouter = express.Router();

contactRouter.get("/", protect, getContact);

contactRouter.post("/", protect, createContact);

contactRouter.delete("/deleteContact/:id", protect, deleteContactByID);

contactRouter.put("/updateContact/:id", protect, updateContact);

contactRouter.put("/updateManyContact/:userKey", protect, updateManyContact);

contactRouter.delete("/deleteManyContact", protect, deleteManyContact);

module.exports = contactRouter;
