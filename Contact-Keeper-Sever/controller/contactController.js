const asyncHandler = require("express-async-handler");
const contactModel = require("../model/contactModel");


const getContact = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword;
    const searchQuery = keyword
      ? { driverName: { $regex: keyword }, user: req.user.name }
      : { user: req.user.name };

    // console.log("a");
    // console.log(searchQuery);

    const totalcontact = await contactModel.countDocuments(searchQuery);
    // console.log("b");
    const numberPage = Math.ceil(totalcontact / pageSize);
    // console.log("c");
    console.log(totalcontact);
    const contacts = await contactModel
      .find(searchQuery)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      contacts,
      totalcontact,
      numberPage,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Khong lay duoc danh sach san pham!");
  }
});

const createContact = asyncHandler(async (req, res) => {
  const ContactFind = await contactModel.findOne({
    licensePlate: req.body.licensePlate,
  });
  const nameFind = await contactModel.findOne({
    driverName: req.body.driverName,
  });
  const phoneFind = await contactModel.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (nameFind) {
    res.status(400);
    throw new Error("name da ton tai!");
  } else if (phoneFind) {
    res.status(400);
    throw new Error("phone da ton tai!");
  } else if (ContactFind) {
    res.status(400);
    throw new Error("license plate da ton tai!");
  } else {
    try {
      const newContact = new contactModel({
        password: req.body.password,
        user: req.user.name,
        driverName: req.body.driverName,
        licensePlate: req.body.licensePlate,
        phoneNumber: req.body.phoneNumber,
        vehicleBrand: req.body.vehicleBrand,
        travelMode: req.body.travelMode,
      });
      // console.log(newContact);
      // const userInsert = await userModel.create(newUser);
      const ContactInsert = await contactModel.create(newContact);
      if (ContactInsert) res.status(200).json(newContact);
    } catch (error) {
      res.status(401);
      throw new Error("them khong thanh cong!");
    }
  }
});

const deleteContactByID = asyncHandler(async (req, res) => {
  const check = req.params.id.match(/^[0-9a-fA-F]{24}$/);
  console.log(check);
  if (check) {
    const contactDelete = await contactModel.findOne({ _id: req.params.id });
    if (contactDelete) {
      try {
        await contactModel.deleteOne({
          _id: req.params.id,
        });
        res.status(200).send("Xoa thanh cong!");
      } catch (error) {
        res.send("loi!");
      }
    } else {
      res.status(401);
      throw new Error("Khong tim thay id!");
    }
  } else {
    res.status(401);
    throw new Error("Khong tim thay id!");
  }
});

const updateContact = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const contactUpdate = await contactModel.findOne({
      _id: req.params.id,
    });
    const nameUpdate = await contactModel.findOne({
      driverName: req.body.driverName,
    });
    const licensePlateUpdate = await contactModel.findOne({
      licensePlate: req.body.licensePlate,
    });
    const phoneUpdate = await contactModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (!req.password) {
      if (!!nameUpdate && contactUpdate.driverName !== nameUpdate.driverName) {
        res.status(401);
        throw new Error("name da ton tai!");
      } else if (
        !!licensePlateUpdate &&
        contactUpdate.licensePlate !== licensePlateUpdate.licensePlate
      ) {
        res.status(401);
        throw new Error("license plate da ton tai!");
      } else if (
        !!phoneUpdate &&
        contactUpdate.phoneNumber !== phoneUpdate.phoneNumber
      ) {
        res.status(401);
        throw new Error("phone da ton tai!");
      } else if (contactUpdate) {
        try {
          // console.log(req.body);
          (contactUpdate.user = req.user.name),
            (contactUpdate.driverName = req.body.driverName),
            (contactUpdate.licensePlate = req.body.licensePlate),
            (contactUpdate.phoneNumber = req.body.phoneNumber),
            (contactUpdate.vehicleBrand = req.body.vehicleBrand),
            (contactUpdate.travelMode = req.body.travelMode),
            await contactUpdate.save();
          const contact = await contactModel.findById({ _id: req.params.id });
          res.json(contact);
        } catch (error) {
          res.status(401);
          throw new Error("cap nhat khong thanh cong!");
        }
      } else {
        res.status(401);
        throw new Error("Khong tim thay id abc!");
      }
    } else {
      if (!!nameUpdate && contactUpdate.driverName !== nameUpdate.driverName) {
        res.status(401);
        throw new Error("name da ton tai!");
      } else if (
        !!licensePlateUpdate &&
        contactUpdate.licensePlate !== licensePlateUpdate.licensePlate
      ) {
        res.status(401);
        throw new Error("license plate da ton tai!");
      } else if (
        !!phoneUpdate &&
        contactUpdate.phoneNumber !== phoneUpdate.phoneNumber
      ) {
        res.status(401);
        throw new Error("phone da ton tai!");
      } else if (contactUpdate) {
        try {
          // console.log(req.body);
          (contactUpdate.user = req.user.name),
            (contactUpdate.driverName = req.body.driverName),
            (contactUpdate.licensePlate = req.body.licensePlate),
            (contactUpdate.phoneNumber = req.body.phoneNumber),
            (contactUpdate.vehicleBrand = req.body.vehicleBrand),
            (contactUpdate.travelMode = req.body.travelMode),
            (contactUpdate.password = req.body.password),
            await contactUpdate.save();
          const contact = await contactModel.findById({ _id: req.params.id });
          res.json(contact);
        } catch (error) {
          res.status(401);
          throw new Error("cap nhat khong thanh cong!");
        }
      } else {
        res.status(401);
        throw new Error("Khong tim thay id abc!");
      }
    }
  } else {
    res.status(401);
    throw new Error("id khong chuan!");
  }
});

const updateManyContact = asyncHandler(async (req, res) => {
  console.log(req.params.userKey);

  try {
    console.log("ab");
    // console.log(req.user.name);
    // console.log(req.body.name);

    // console.log("a");

    await contactModel.updateMany(
      { user: req.params.userKey },
      { $set: { user: req.body.name } }
    );

    const contactsUpdate = await contactModel.find({
      user: req.body.name,
    });

    res.json(contactsUpdate);
  } catch (error) {
    res.status(400);
    throw new Error("loi lyyfffffffffffon!");
  }
});

const deleteManyContact = asyncHandler(async (req, res) => {
  try {
    console.log("a");
    await contactModel.deleteMany({ user: req.user.name });
    console.log("b");
    const contactsUpdate = await contactModel.find({
      user: req.user.name,
    });

    res.json(contactsUpdate);
  } catch (error) {
    res.status(400);
    throw new Error("loi lyyfffffffffffon!");
  }
});

module.exports = {
  getContact,
  createContact,
  deleteContactByID,
  updateContact,
  updateManyContact,
  deleteManyContact,
};
