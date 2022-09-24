const {
  createTourePackageCalculation,
  getTourePackageCalculation,
  getTourePackageCalculationById,
  updateTourePackageCalculation,
  getCheapestPackageCalculation,
  getTrendingPackageCalculation,
} = require("../ControllerCalculation/TourPackage.ControllerCalculation");

// create a package

exports.createTourPackage = async (req, res, next) => {
  try {
    const result = await createTourePackageCalculation(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert",
      error: error.message,
    });
  }
};

// get all value

exports.getTourPackageInfo = async (req, res, next) => {
  try {
    let queryObjectFilter = { ...req.query };
    const excludeField = ["sort", "page", "limit"];
    excludeField.forEach((field) => delete queryObjectFilter[field]);

    let queries = {};
    //   which value you want to see

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    // for pagination
    if (req.query.page) {
      const { page = 1, limit = 3 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    // for sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    const result = await getTourePackageCalculation(queryObjectFilter, queries);

    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data don't get successfully",
      error: error.message,
    });
  }
};

// get a single value by id

exports.getTourPackageInfoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getTourePackageCalculationById(id);
    // console.log(id);
    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data don't get successfully",
      error: error.message,
    });
  }
};

// get Cheapest TourPackage Info
exports.getCheapestTourPackageInfo = async (req, res, next) => {
  try {
    const result = await getCheapestPackageCalculation();

    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data don't get successfully",
      error: error.message,
    });
  }
};

// update a single value

exports.updateTourPackageInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateTourePackageCalculation(id, req.body);
    // console.log(id);
    res.status(200).json({
      status: "success",
      message: "Data update successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't update",
      error: error.message,
    });
  }
};

// get Trending TourPackage Info
exports.getTrendingTourPackageInfo = async (req, res, next) => {
  try {
    const result = await getTrendingPackageCalculation();

    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data don't get successfully",
      error: error.message,
    });
  }
};
