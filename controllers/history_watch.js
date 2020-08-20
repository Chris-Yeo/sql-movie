const connection = require('../config/database');

module.exports = {
    getHistory: (req, res) => {
        const myQuery = `SELECT history_watch.id_history, users.id_user, movies.id_movie, subscriptions.id_subscription, users.fullname, movies.title 
        FROM history_watch 
        INNER JOIN users ON history_watch.id_user = users.id_user 
        INNER JOIN movies ON history_watch.id_movie = movies.id_movie 
        INNER JOIN subscriptions ON history_watch.id_subscription=subscriptions.id_subscription`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                res.send ({
                    message: 'Error Detected',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Your History:',
                    status: 200,
                    result
                })
            }
        })
    },
    postHistory: (req,res) => {
        const {id_movie, id_user, id_subscription} = req.body
        const myQuery = `INSERT INTO history_watch(id_movie, id_user, id_subscription) VALUES (${id_movie}, ${id_user}, ${id_subscription})`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                console.log(error)
                res.send ({
                    message: 'Error Detected',
                    status: 500
                })
            } else {
                res.send ({
                    message: 'History:',
                    status: 200,
                    result
                })
            }
        })
    },

    deleteHistory: (req, res) => {
        const {id} = req.params;
        const myQuery = `DELETE FROM history_watch WHERE id=${id}`
        connection.query(myQuery, (error,result) => {
            if(error) {
                res.send ({
                    message: "Error Detected",
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'History Deleted',
                    status: 200,
                    result
                })
            }
        })
    }
}