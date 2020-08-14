const connection = require('../config/database');

module.exports = {
    onSubscription: (req,res) => {
        const {id} = req.params;
        const myQuery = `UPDATE subscription SET status=1 WHERE id=${id}`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                res.send ({
                    message: 'Subscription Failed!',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Subscription Successful!',
                    status: 200,
                    result
                })
            }
        })
    },
    offSubscription: (req,res) => {
        const {id} = req.params;
        const myQuery = `UPDATE subscription SET status=0 WHERE id=${id}`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                res.send ({
                    message: 'Process Failed',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Unsubscribed Succesfully!',
                    status: 200,
                    result
                })
            }
        })
    },
    getSubscription: (req,res) => {
        const myQuery = `SELECT subscriptions.id_subscription, users.id_user, users.fullname, users.username, subscriptions.status 
        FROM subscriptions 
        INNER JOIN users ON subscriptions.id_user = users.id_user`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                res.send ({
                    message: 'Error Detected',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Your Subscriptions:',
                    status: 200,
                    result
                })
            }
        })
    },
    makeSubscription: (req,res) => {
        const {id_user, status} = req.body
        const myQuery = `INSERT INTO subscriptions (id_user, status) VALUES (${id_user}, ${status})`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                console.log(error);
                res.send ({
                    message: 'Error Detected',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Your Subscriptions:',
                    status: 200,
                    result
                })
            }
        })
    },
    deleteSubscription: (req,res) => {
        const {id_user, status} = req.body
        const myQuery = `UPDATE subscriptions SET id_user=${id_user}, status=${status}`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                console.log(error);
                res.send ({
                    message: 'Error Detected',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Unsubscribed',
                    status: 200,
                    result
                })
            }
        })
    }
}