const connection = require('../config/database');

module.exports = {
    getAllMovies: (req,res) => {
        const myQuery = `SELECT * FROM movies`;
        connection.query(myQuery, (error,result, field) => {
            if(error) {
                console.log(error)
                res.send ({
                    message: 'Error Retrieving All Movies',
                    status: 500
                })
            } else {
                res.send ({
                    message: 'All Movies',
                    status: 200,
                    result
                })
            }
        })
    },

    getOneMovie: (req,res) => {
        const myQuery = `SELECT * FROM movies WHERE id_movie=${id}`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                console.log(error)
                res.send ({
                    message: `Error Retrieving Movie`,
                    status: 500
                })
            } else {
                res.send ({
                    message: "Here's the movie you requested!",
                    status: 200,
                    result
                })
            }
        })
    },

    addMovie: (req,res) => {
        const {title, year, genre, description, url_trailer} = req.body;
        const myQuery = `INSERT INTO movies(title, year, genre, description, url_trailer) VALUES("${title}", "${year}", "${genre}", "${description}", "${url_trailer}")`;
        connection.query(myQuery, (error, result) => {
            if(error) {
                res.send ({
                    message: 'Movie Upload Failed',
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Movie Upload Successful!',
                    status: 200,
                    result
                })
            }
        })
    },

    deleteMovie: (req, res) => {
        const {id} = req.params;
        const myQuery = `DELETE FROM movies WHERE id_movie=${id}`
        connection.query(myQuery, (error,result) => {
            if(error) {
                console.log(error)
                res.send ({
                    message: "Error Detected",
                    status: 500,
                })
            } else {
                res.send ({
                    message: 'Movie Deleted',
                    status: 200,
                    result
                })
            }
        })
    },

    updateMovie: (req, res) => {
        const {id} = req.params;
                const myQuery = `UPDATE movies SET title=${title}, year=${year}, genre=${genre}, description=${description}, url_trailer=${url_trailer} WHERE id_movie=${id}`;
                connection.query(myQuery, (error,result) => {
                    if(error) {
                        res.send ({
                            message: 'Error Detected',
                            status: 500
                        })
                    } else {
                        res.send ({
                            message: 'Update Successful!',
                            status: 201, 
                            result
                        })
                    }
                })
    }
}