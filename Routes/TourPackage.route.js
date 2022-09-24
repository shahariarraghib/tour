const express = require("express");
const router = express.Router();
const TourPackageController = require("../Controllers/TourPackage.controller");

router.route("/cheapest").get(TourPackageController.getCheapestTourPackageInfo);
router.route("/trending").get(TourPackageController.getTrendingTourPackageInfo);

router
  .route("/")
  .get(TourPackageController.getTourPackageInfo)
  .post(TourPackageController.createTourPackage);

router
  .route("/:id")
  .get(TourPackageController.getTourPackageInfoById)
  .patch(TourPackageController.updateTourPackageInfo);

module.exports = router;
