const router = require('express').Router()

const {
    getAllUsers,
    getOneUser,
    addOne,
    updateProfile,
    deleteProfile
} = require('../controllers/users')

const {
    getAllMovies,
    getOneMovie,
    addMovie,
    deleteMovie,
    updateMovie
} = require('../controllers/movies')

const {
    onSubscription,
    offSubscription,
    getSubscription,
    makeSubscription,
    deleteSubscription
} = require('../controllers/subscriptions')

const {
    getHistory,
    postHistory
} = require ('../controllers/history_watch')

router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.post('/users/register', addOne);
router.put('/users/:id', updateProfile);
router.delete('/users/:id', deleteProfile);

router.get('/movies', getAllMovies);
router.get('/movies/:id', getOneMovie);
router.post('/movies/uploadmovie', addMovie);
router.delete('/movies/:id', deleteMovie);
router.put('/movies/:id', updateMovie)

router.post('/subscription/register', makeSubscription)
// router.post('/subscription/:id', onSubscription);
// router.delete('/subscription/:id', offSubscription);
router.get('/subscription', getSubscription);
router.put('/subscription', deleteSubscription);

router.get('/history', getHistory)
router.post('/history', postHistory)

module.exports = router