const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const Admin = mongoose.model('Admin', {
    userId: String,
    password: String,
});





module.exports.signup = async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;

    try {
        // Check if user with the same userId already exists
        const existingUser = await Admin.findOne({ userId });

        if (existingUser) {
            // User with the same userId already exists
            return res.status(409).send({ message: 'User with this ID already exists.' });
        }

        // Create a new user
        const user = new Admin({ userId, password });

        // Save the new user
        await user.save();

        res.status(201).send({ message: 'User saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error.' });
    }
};




module.exports.login = (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;

    Admin.findOne({ userId: userId })
        .then((result) => {
            if (!result) {
                res.send({ message: 'user not found.' })
            } else {
                if (result.password == password) {
                    const token = jwt.sign({
                        data: result
                    }, 'MYKEY', { expiresIn: '1h' });
                    res.send({ message: 'find success.', token: token, userId: result._id })
                }
                if (result.password != password) {
                    res.send({ message: 'password wrong.' })
                }

            }

        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}
