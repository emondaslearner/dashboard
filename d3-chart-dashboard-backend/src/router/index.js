const router = require("express").Router();
const AnalyticsController = require("../controller/v1/analytics");
const multer = require("multer");

// multer upload
const upload = multer({ dest: "./src/uploads/" });

const analytics = new AnalyticsController();

router.get("/health", (_req, res) => {
  res.status(200).json({
    health: "ok",
    code: 200,
    status: "running",
  });
});

router
  .route("/api/v1/analytics")
  .post(upload.array("file", 1), analytics.insertAnalyticsData)
  .get(analytics.getRelevanceIntensityLikelihood);

module.exports = router;
