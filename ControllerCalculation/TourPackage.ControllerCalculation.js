const TourPackage = require("../Models/tourPackageInfo");

exports.createTourePackageCalculation = async (data) => {
  const result = await TourPackage.create(data);
  return result;
};

exports.getTourePackageCalculation = async (queryObjectFilter, queries) => {
  const result = await TourPackage.find({ queryObjectFilter })
    .select(queries.fields)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy);

  const totalPackage = await TourPackage.countDocuments();
  const pageCount = Math.ceil(totalPackage / queries.limit);
  return { totalPackage, pageCount, result };
};

exports.getTourePackageCalculationById = async (packageId) => {
  const result = await TourPackage.findById(packageId);
  const result2 = await TourPackage.updateOne(
    { _id: packageId },
    { $inc: { ViewCount: 1 } }
  );
  return { result, result2 };
};

exports.getCheapestPackageCalculation = async () => {
  const result = await TourPackage.find().limit(3).sort({ price: 1 });

  return result;
};

exports.getTrendingPackageCalculation = async () => {
  const result = await TourPackage.find().limit(3).sort({ ViewCount: -1 });

  return result;
};

exports.updateTourePackageCalculation = async (packageId, updateData) => {
  const result = await TourPackage.updateOne(
    { _id: packageId },
    { $set: updateData },
    { runValidators: true }
  );

  return result;
};
