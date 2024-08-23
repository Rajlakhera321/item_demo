const { addItem, getItems } = require("../controller/item");
const { uploadStorage } = require("../helper/multer");
const router = require("express").Router();

router.post("/", uploadStorage.array('image'),addItem);

router.get("/list", getItems);

module.exports = router;