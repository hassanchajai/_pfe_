const express = require("express")
const router = express.Router()
const client = require("../../controllers/client.controllers")

router.get("/", client.get_all)
router.get("/:id", client.get_one)
router.post("/", client.add)
router.put("/:id", client.update)
router.delete("/:id", client.delete)

module.exports = router