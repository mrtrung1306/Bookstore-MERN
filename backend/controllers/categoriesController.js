var express = require('express');
var router = express.Router();
var responseReturn = require('../helper/ResponseHandle');
var categoryModel = require('../schemas/category');
var bookModel = require('../schemas/book');

const getCategories = (async function (req, res, next) {
    var queries = {};
    var arrayExclude = ["limit", "sort", "page"];
    for (const [key, value] of Object.entries(req.query)) {
        if (!arrayExclude.includes(key)) {
            queries[key] = new RegExp(value, 'i');
        }
    }
    queries.isDelete = false;
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 5;
    var sort = req.query.sort ? req.query.sort : {}
    var categories = await categoryModel
        .find(queries)
        .skip(limit * (page - 1))
        .sort(sort)
        .limit(limit)
        .populate({
            path: 'published',
            model: bookModel
        })
        .lean()
        .exec();
    responseReturn.ResponseSend(res, true, 200, categories)
});

const getIdCategories = (async function (req, res, next) {
  try {
    let category = await categoryModel.find({ _id: req.params.id });
    responseReturn.ResponseSend(res, true, 200, category)
  } catch (error) {
    responseReturn.ResponseSend(res, false, 404, error)
  }
});

const postCategories = ( async function (req, res, next) {
  try {
    var newCategory= new categoryModel({
      name: req.body.name,
    })
    await newCategory.save();
    responseReturn.ResponseSend(res, true, 200, newCategory)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})

const putCategories = (async function (req, res, next) {
  try {
    let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true
      });
    responseReturn.ResponseSend(res, true, 200, category)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})
const deleteCategories = (async function (req, res, next) {
  try {
    let category = await categoryModel.findByIdAndUpdate(req.params.id, {
      isDelete: true
    }, {
      new: true
    });
    responseReturn.ResponseSend(res, true, 200, category)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})
module.exports = {
    getCategories,
    getIdCategories,
    postCategories,
    putCategories,
    deleteCategories
};