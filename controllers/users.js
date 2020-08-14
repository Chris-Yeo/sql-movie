const connection = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: (req,res) => {
        const myQuery = `SELECT * FROM users`;
        connection.query(myQuery, (error, result, field) => {
            if(error) {
                res.send({
                    message:'Error Detected',
                    status: 500
                })
            } else {
                res.send ({
                    message: 'All User Data',
                    status: 200,
                    result
                })
            }
        })
    },

    getOneUser: (req,res) => {
        const {id} = req.params;
        const myQuery = `SELECT * FROM users WHERE id=${id}`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                res.send ({
                    message:'Error Detected',
                    status: 500
                })
            } else {
                res.send ({
                    message: 'User Data',
                    status: 200,
                    result
                })
            }
        })
    },

    addOne: (req,res) => {
        const {fullname, username, email, password, address} = req.body
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if(error) {
                res.send ({
                    message: "Password Invalid"
                })
            } else {
                const myQuery = `INSERT INTO users(fullname, username, email, password, address) VALUES("${fullname}", "${username}", "${email}", "${hashedPassword}", "${address}")`;
                connection.query(myQuery, (error, result) => {
                    if(error) {
                        console.log(error)
                        res.send ({
                            message: 'Error Detected',
                            status: 500
                        })
                    } else {
                        res.send ({
                            message: 'User Added',
                            status: 200,
                            result
                        })
                    }
                })
            }
        })
    },

    updateProfile: (req,res) => {
        const {fullname, username, email, password, address} = req.body
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if(error) {
                res.send ({
                    message: 'Password Error Detected'
                })
            } else {
                const {id} = req.params
                const myQuery = `UPDATE users SET fullname=${fullname}, username=${username}, email=${email}, password=${hashedPassword}, address=${address} WHERE id=${id}`;
                connection.query(myQuery, (error, result) => {
                    if(error) {
                        console.log(error)
                        res.send ({
                            message: 'Update Failed',
                            status: 500
                        })
                    } else {
                        res.send ({
                            message: 'Profile Updated!',
                            status:200,
                            result
                        })
                    }
                })
            }
        })
    },

    deleteProfile: (req,res) => {
        const {id} = req.params;
        const myQuery = `DELETE FROM users WHERE id=${id}`
        connection.query(myQuery, (error,result) => {
            if(error) {
                res.send ({
                    message: "Profile Still Exists",
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Profile Deleted',
                    status: 200
                })
            }
        })
    }
}

    