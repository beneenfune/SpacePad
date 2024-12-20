const express = require("express");
const multer = require("multer");
const router = express.Router();
const fileController = require("../controllers/fileController");
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), fileController.uploadFile);
router.delete("/delete/:fileId", fileController.deleteFile);
router.get("/get-pdf/:fileId", fileController.getPdf);

module.exports = router;
