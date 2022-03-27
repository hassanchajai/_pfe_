const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes');
const clients  = require('./clientRoutes');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))


router.get("/", (req, res) => {
    return res.json({
        message: "welcome in cj api !"
    })
});


router.use("/users", userRoutes);
router.use("/clients", clients);


module.exports = router