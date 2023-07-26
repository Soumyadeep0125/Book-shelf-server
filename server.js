const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name (use a timestamp to avoid name conflicts)
  },
});

const upload = multer({ storage: storage });
const app = express();
const mongoString = 'mongodb+srv://bwubts20069:bwubts20069@cluster0.y4iiqhe.mongodb.net/projectTestServer';
const Model1 = require('./signin.js');
const Model2 = require('./categories.js');
const Model3 = require('./product.js');
const Model4 = require('./offers.js');
const Model5 = require('./log.js');
const Model6 = require('./topproducts.js');
const Model7 = require('./userdata.js');
const Model8 = require('./admin.js')

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
});
app.use(express.json());
app.use('/', express.static('uploads'));
app.use(cors({
  origin: '*'
}));
//Post Method


//Check Account Exist or not

app.post('/CheckUser', async (req, res)=>{
    const query = {email: req.body.email}
    
    try{
        const userLogInData = await Model1.find(query);
        res.send(userLogInData);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//SignUp

app.post('/SignUp', async (req, res)=>{
    
    const logInData = new Model1({
        email: req.body.email,
        password: req.body.password,
    })
    try{
        const dataToSave = await logInData.save();
        res.status(200).json(dataToSave) 
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


//SignIn

app.post('/SignIn', async (req, res)=>{
    const query = {email: req.body.email, password: req.body.password}
    
    try{
        const userLogInData = await Model1.find(query);
        res.send(userLogInData);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//get all signin data





//AdminLogin

app.post('/AdminLogin', async (req, res)=>{
    const query = {email: req.body.email, password: req.body.password}
    
    try{
        const userLogInData = await Model8.find(query);
        res.send(userLogInData);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Add admin 

app.post('/AddAdmin', async (req, res)=>{
    const newAdmin = new Model8({
        email: req.body.email,
        password: req.body.password,
    })
    try{
        const dataToSave = await newAdmin.save();
        res.status(200).json(dataToSave) 
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Delete Account

app.delete('/deleteAccount', async (req, res)=>{
    const id = req.body._id
    try{
        const log = await Model1.findByIdAndDelete(id);
        res.send(log);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Add Categories
app.post('/AddCategories', upload.single('image') ,async (req, res)=>{
    console.log(req.body, req.file)
    const imageUrl = req.file.filename; 
    const newCategory = new Model2({
        category: req.body.category,
        imageUrl: imageUrl,
    })
    try{
        const dataToSave = await newCategory.save();
        res.status(200).json(dataToSave);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

// Register Product
app.post('/AddProducts', upload.array('images', 3), async (req, res) => {
    console.log(req.body, req.files);
    const imageUrl1 = req.files[0].filename;
    const imageUrl2 = req.files[1].filename;
    const imageUrl3 = req.files[2].filename;
    const newProduct = new Model3({
      userId: req.body.userId,
      category: req.body.category,
      productName: req.body.name,
      productPrice: req.body.price,
      productDescription: req.body.desc,
      productInformation: req.body.info,
      sellerAddress: req.body.address,
      contactNumber: req.body.number,
      pincode: req.body.pincode,
      imageUrl1: imageUrl1,
      imageUrl2: imageUrl2,
      imageUrl3: imageUrl3
    });
    try {
      const dataToSave = await newProduct.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
//Delete product

app.delete('/deleteProduct', async (req, res)=>{
    const id = req.body._id
    try{
        const Data = await Model3.findByIdAndDelete(id);
        res.send(Data);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})



// Add Top Product
app.post('/AddProducts', upload.array('images', 3), async (req, res) => {
    console.log(req.body, req.files);
    const imageUrl1 = req.files[0]?.filename;
    const imageUrl2 = req.files[1]?.filename;
    const imageUrl3 = req.files[2]?.filename;
  
    const newProduct = new Model6({
        userId: req.body.userId,
        category: req.body.category,
        productName: req.body.name,
        productPrice: req.body.price,
        productDescription: req.body.desc,
        productInformation: req.body.info,
        sellerAddress: req.body.address,
        contactNumber: req.body.number,
        pincode: req.body.pincode,
        imageUrl1: imageUrl1,
        imageUrl2: imageUrl2,
        imageUrl3: imageUrl3

    })
    try{
        const dataToSave = await newProduct.save();
        res.status(200).json(dataToSave);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Add offers
app.post('/AddOffers',async (req, res)=>{


    const newOffer = new Model4({
        offerName: req.body.name,
        offerDetail: req.body.detail,
    })
    try{
        const dataToSave = await newOffer.save();
        res.status(200).json(dataToSave);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})



//Add userDAta
app.post('/UserData', async (req, res)=>{
    
    const userData = new Model7({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
        
    })
    try{
        const dataToSave = await userData.save();
        res.status(200).json(dataToSave) 
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Get all UserData
app.post('/getAllUserData', async (req, res)=>{
   
    try{
        const Data = await Model7.find();
        res.send(Data);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})



//get userdata

app.post('/getUserData', async (req, res)=>{
    const query = {userId: req.body.userId}
    try{
        const Data = await Model7.find(query);
        res.send(Data);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Delete UserData

app.delete('/deleteUserData', async (req, res)=>{
    const id = req.body._id
    try{
        const Data = await Model7.findByIdAndDelete(id);
        res.send(Data);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//getProducts
app.post('/getCategoryProducts', async (req, res)=>{
    const query = {category: req.body.category}
    try{
        const Products = await Model3.find(query);
        res.send(Products);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//search Products
app.post('/SearchProducts', async (req, res)=>{
    const query = {productName: req.body.productName}
    try{
        const Products = await Model3.find(query);
        res.send(Products);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Purchase Log (For Admin)
app.post('/PurchaseLog',async (req, res)=>{


    const newLog = new Model5({
        bId: req.body.bId,
        sId: req.body.sId,
        pName: req.body.pName,
        pCategory: req.body.pCategory,
        
        
    })
    try{
        const dataToSave = await newLog.save();
        res.status(200).json(dataToSave);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Get Purchase Log
app.post('/getPurchaseLog', async (req, res)=>{
    
    try{
        const log = await Model5.find();
        res.send(log);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Get Purchase Log by ID
app.post('/getPurchaseLogById', async (req, res)=>{
    const query = {bId: req.body.bId}
    try{
        const log = await Model5.find(query);
        res.send(log);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Delete From Cart

app.delete('/deleteFromCart', async (req, res)=>{
    const id = req.body._id
    try{
        const log = await Model5.findByIdAndDelete(id);
        res.send(log);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//Delete Top Products
app.delete('/deleteTopProducts', async (req, res)=>{
    const id = req.body._id
    try{
        const log = await Model6.findByIdAndDelete(id);
        res.send(log);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Delete Categories
app.delete('/deleteCategories', async (req, res)=>{
    const id = req.body._id
    try{
        const log = await Model2.findByIdAndDelete(id);
        res.send(log);
   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


//Get method
app.get('/getAllAccounts', async (req, res)=>{
    const donorData = await Model1.find();
    res.send(donorData);
})
//Get All Categories
app.get('/getAllCategories', async (req, res)=>{
    const categories = await Model2.find();
    res.send(categories);
})
//Add Top Products
app.post('/AddTopProducts', async (req, res)=>{
    
    const topProduct = new Model6({
        productId: req.body._id,
        userId: req.body.userId,
        category: req.body.category,
        productName: req.body.name,
        productPrice: req.body.price,
        productDescription: req.body.desc,
        productInformation: req.body.info,
        sellerAddress: req.body.address,
        contactNumber: req.body.number,
        pincode: req.body.pincode,
        imageUrl1: req.body.imageUrl1,
        imageUrl2: req.body.imageUrl2,
        imageUrl3: req.body.imageUrl3
        
    })
    try{
        const dataToSave = await topProduct.save();
        res.status(200).json(dataToSave) 
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})



//Get Top Products
app.get('/getTopProducts', async (req, res)=>{
    const t_products = await Model6.find();
    res.send(t_products);
})



app.listen(8000, ()=>{
    console.log("server Started at 8000 port");
})