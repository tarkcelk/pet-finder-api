const { categories, sub_categories } = require("../constants");
const apiResponse = require("../utils/apiResponse");

exports.list = function (req, res) {
  res.json(categories);
};

exports.subsCategoriesByCategoryId = function (req, res) {
  const { categoryId } = req.params;
  const subCategories = sub_categories.filter(
    (subCategory) => subCategory.parent_category_id === parseInt(categoryId)
  );
  if (subCategories?.length > 0) return res.json(subCategories);

  return res
    .status(404)
    .send(apiResponse.onError("Böyle bir kategori sistemde kayıtlı değil"));
};
