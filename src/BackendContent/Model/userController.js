const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const Users = mongoose.model('Users', {
    photo: String,
    adminVerification: Boolean,
    name: {
        type: String,
        default: '',
      },
      password: {
        type: String,
        required: true,
      },
      photo: {
        type: String, // You can store the image URL or path
        default: '',
    },
    adminVerification: {
        type: Boolean,
        default: false, // Default to an empty string; will be updated later
    },
    userId: {
        type: String,
        required: true, // Default to an empty string; will be updated later
      },
});





module.exports.signup = async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    try {
        // Check if user with the same userId already exists
        const existingUser = await Users.findOne({ userId });

        if (existingUser) {
            // User with the same userId already exists
            return res.status(409).send({ message: 'User with this ID already exists.' });
        }

        // Create a new user
        const user = new Users({ userId, password });

        // Save the new user
        await user.save();

        res.status(201).send({ message: 'User saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error.' });
    }
};


// module.exports.login = (req, res) => {
//     const userId = req.body.userId;
//     const password = req.body.password;

//     Users.findOne({ userId: userId })
//         .then((result) => {
//             if (!result) {
//                 res.send({ message: 'user not found.' })
//             } else {
//                 if (result.password == password) {
//                     const token = jwt.sign({
//                         data: result
//                     }, 'MYKEY', { expiresIn: '1h' });
//                     res.send({ message: 'find success.', token: token, userId: result._id })
//                 }
//                 if (result.password != password) {
//                     res.send({ message: 'password wrong.' })
//                 }

//             }

//         })
//         .catch(() => {
//             res.send({ message: 'server err' })
//         })

// }

module.exports.login = (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  Users.findOne({ userId: userId })
      .then((result) => {
          if (!result) {
              res.status(401).send({ error: 'User not found.' });
          } else {
              if (result.password == password) {
                  const token = jwt.sign({
                      data: result
                  }, 'MYKEY', { expiresIn: '1h' });
                  res.send({ message: 'Login successful.', token: token, userId: result._id });
              } else {
                  res.status(401).send({ error: 'Incorrect password.' });
              }
          }
      })
      .catch(() => {
          res.status(500).send({ error: 'Server error.' });
      });
};

module.exports.uploader = async (req, res) => {
    try {
        console.log(req.files);
        console.log(req.body);


        const userId = req.params.userId;
        const { name } = req.body;
        // Find the user by userId
        const user = await Users.findOne({ _id: userId });

        if (!user) {
            // User with the specified userId not found
            return res.status(404).send({ message: 'User not found.' });
        }

        // Update user data
        user.name = name ;
        user.photo = req.files.photo[0].path ;
        user.adminVerification = false;

        // Save the updated user
        await user.save();




      // Create a new user with the provided name and photo
    //   const newUser = new uploadSchema({
    //     name: req.body.name,
    //     photo: req.files.photo[0].path,
    //   });
  
      // Save the user to the database
    //   await newUser.save();
  
      res.status(201).json({ message: 'Data saved on Users successfully.' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };





  
  module.exports.getUploadedData = async (req, res) => {
    try {
      // const allData = await uploadSchema.find();
      // res.status(200).json({ data: allData });
      const userId = req.params.userId; // Extract userId from the request params
      const userUploadedData = await Users.find({ _id: userId });

      res.status(200).json({ data: userUploadedData });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };




  module.exports.adminVerified = async (req, res) => {
    try {
        console.log(req.files);
        console.log(req.body);


        const userId = req.params.userId;
        // Find the user by userId
        const user = await Users.findOne({ userId });

        if (!user) {
            // User with the specified userId not found
            return res.status(404).send({ message: 'User not found.' });
        }

        // Update user data
        user.adminVerification = true;

        // Save the updated user
        await user.save();
  
      res.status(201).json({ message: 'Data saved on Users successfully.' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };




 module.exports.deleteUser =  async (req, res) => {
  const userIdToDelete = req.params.userId;

  try {
      // Find the user by ID and remove it
      const deletedUser = await Users.findOneAndDelete({ _id: userIdToDelete });

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
  }
}


  module.exports.getUsers = async (req, res) => {
    try {
      const page = req.params.page || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
  
      const users = await Users.find().skip(skip).limit(limit);
      const totalUsers = await Users.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);
  
      res.status(200).json({
        users,
        currentPage: +page,
        totalPages,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };



