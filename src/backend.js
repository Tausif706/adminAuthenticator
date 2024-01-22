// index.js
const express = require('express')
const cors = require('cors')
const multer = require('multer');
const path = require('path');

const userController = require('./BackendContent/Model/userController');
const adminController = require('./BackendContent/Model/adminController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })



const bodyParser = require('body-parser')
const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 4000
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stuffhack92:stuffhack92@campusmarket.guutbgq.mongodb.net/tip',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get('/', (req, res) => {
    res.send('hello...')
})

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js + Express server!');
});
app.post('/adminSignup', adminController.signup)
app.post('/adminLogin', adminController.login)

app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.get('/getuploadeddata/:userId',userController.getUploadedData)
app.post('/uploadUser/:userId',upload.fields([{ name: 'photo' }]),userController.uploader)
app.delete('/deleteUser/:userId',userController.deleteUser)
app.put('/adminVerified/:userId',userController.adminVerified)
app.get('/getusers/:page',userController.getUsers)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
