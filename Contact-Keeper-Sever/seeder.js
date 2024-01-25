// const productModel = require('./models/productModel');
 const contactsFake = require('./data/contactData')
 const connectDb = require('./config/database');
// const userModel = require('./models/userModel');

const contactModel = require("./model/contactModel");

connectDb();

const ImportData = async ()=> {
    try{
        await contactModel.insertMany(contactsFake);
        
        console.log('du lieu da duoc them');

    } catch (e) {
        console.log(e);        
        console.log('khong them duoc du lieu');
    }
}

ImportData();
