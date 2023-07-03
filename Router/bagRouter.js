const express = require('express');
const {newCollection,veiwAll,SingleBag, updateBag,deleteCollection}= require("../Controller/Bag")
const upload = require('../utils/multer')

const Router = express.Router()
Router.post('/new', upload,  newCollection)
Router.route("/view").get(veiwAll)
Router.route("/view/:bagId").get(SingleBag)
Router.route("/update/:bagId").patch(upload,updateBag)
Router.route("/delete/:bagId").delete(deleteCollection)
module.exports = Router;