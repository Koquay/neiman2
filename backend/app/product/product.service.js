require("./product.model");
const mongoose = require('mongoose');
const Product = require("mongoose").model("Product");

exports.searchProducts = async (req, res) => {
  console.log("ProductsServicer.searchProducts");
  
    const {searchField} = req.query;
    console.log("searchField", searchField);

    try {
      const searchedProducts = await Product.find({
        name: { $regex: searchField, $options: "i" },
      });
  
      console.log(searchedProducts);
      res.json(searchedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).send("Problem searching for products.");
    }
}

exports.getProduct = async (req, res) => {
  console.log('req.params.productId', req.params.productId)
  const productId = req.params.productId.trim();

  // const productId = new mongoose.Types.ObjectId(Number(req.params.productId));
  

  try {
    const product = await Product.findById({_id: productId})
    console.log('product', product);
    res.status(200).json(product);
  } catch(error) {
    console.log(error);
    res.status(500).send("Problem getting selected product.");
  }
}


exports.getProducts = async (req, res) => {
    console.log('req.query', req.query)

    const sidebarDataFiltersStr = req.query.sidebarDataFilters;

  let sidebarDataFilters;

  const productCountPipeline = [];

  if (sidebarDataFiltersStr) {
    sidebarDataFilters = JSON.parse(req.query.sidebarDataFilters);
  } else {
    sidebarDataFilters = [];
  }

  const aggregatePipeline = buildAggregatePipeline(
    sidebarDataFilters,
    productCountPipeline
  );
  console.log("aggregatePipeline", aggregatePipeline);
  console.log("aggregatePipeline", JSON.stringify(aggregatePipeline));

  try {
    const products = await Product.aggregate(aggregatePipeline);
    console.log("products", products);
    const productCount = await getProductCount(productCountPipeline);
    //console.log("productCount", productCount);
    res.status(200).json({ products, productCount });
  } catch (error) {
    console.log(error);
    res.status(500).send("Problem getting products.");
  }
}

const getProductCount = async (productCountPipeline) => {
    let productCount;
    productCountPipeline.push({ $count: "productCount" });
  
    productCount = await Product.aggregate(productCountPipeline);
  
    if (productCount.length) {
      return productCount[0].productCount;
    }
  
    return 0;
  };

const buildAggregatePipeline = (filters, productCountPipeline) => {
    let { category, priceRanges, ratings, pageNo, pageSize, sortFilter } =
      filters;
  
    //console.log("category", category);
  
    let aggregatePipeline = [];
  
    let categoriesMatch = buildCategoriesMatch(category);
    if (categoriesMatch) {
      aggregatePipeline.push(categoriesMatch);
      productCountPipeline.push(categoriesMatch);
    }
  
    let priceMatch = buildPriceRangeMatch(priceRanges);
    if (priceMatch) {
      aggregatePipeline.push(priceMatch);
      productCountPipeline.push(priceMatch);
    }
  
    // let ratingMatch = buildRatingMatch(ratings);
    // if (ratingMatch) {
    //   aggregatePipeline.push(ratingMatch);
    //   productCountPipeline.push(ratingMatch);
    // }
  
    // aggregatePipeline.push(buildSortMatch(sortFilter));
    // checkForEmptyAggregate(aggregatePipeline);
    // checkForEmptyAggregate(productCountPipeline);
    aggregatePipeline.push(buildPageNumberFilter(pageNo, pageSize));
    // aggregatePipeline.push(buildPageSizeFilter(pageSize));
  
    return aggregatePipeline;
  };

  const buildCategoriesMatch = (category) => {
    if (category === 'All Men') {
      return { $match: { category: { $ne: null } } };
    }
    return { $match: { category: { $eq: category } } };
  };

  const buildPriceRangeMatch = (priceRanges) => {
    if (priceRanges?.length) {
      let priceMatches = [];
  
      for (let priceRange of priceRanges) {
        priceMatches.push({
          $and: [
            { $gte: ["$price", +priceRange.low] },
            { $lte: ["$price", +priceRange.high] },
          ],
        });
      }
  
      return { $match: { $expr: { $or: priceMatches } } };
    }
  };

  const buildPageNumberFilter = (pageNo, pageSize) => {
    let skip = (pageNo - 1) * pageSize;
  
    return { $skip: skip };
  };
  