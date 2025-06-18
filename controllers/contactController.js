const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const contactValidationSchema = require('../models/contactValidation');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { error } = contactValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, email, phone } = req.body;
  const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
  res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  await contact.deleteOne();
  res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
