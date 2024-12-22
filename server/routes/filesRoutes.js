const express = require("express");
const multer = require("multer");
const router = express.Router();
const filesController = require("../controllers/filesController");
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), filesController.uploadFile);
router.delete("/delete/:fileId", filesController.deleteFile);
router.get("/get-pdf/:fileId", filesController.getPdf);
router.get("/process-pdf", filesController.processPdf);
router.get("/get-processed-pdf/:fileId", filesController.getProcessedPdf);

module.exports = router;
