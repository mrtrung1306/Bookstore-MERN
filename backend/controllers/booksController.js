var express = require('express');
var router = express.Router();
var responseReturn = require('../helper/ResponseHandle');
var bookModel = require('../schemas/book');
var authorModel = require('../schemas/author');
var categoryModel = require('../schemas/category');
// const fs = require("fs");




const getBooks = (async function (req, res, next) {
  var queries = {};
  var arrayExclude=["limit","sort","page"];
  for (const [key,value] of Object.entries(req.query)) {
    if(!arrayExclude.includes(key)){
      queries[key] = new RegExp(value,'i');
    }
  }
  queries.isDelete = false;
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 5;
  var sort = req.query.sort?req.query.sort:{}
  var books = await bookModel.find(queries)
    .populate({
        path: 'author',select: 'name'
    })
    .populate({
    path:'category',select:'name',
    })
    .lean()
    .skip(limit * (page - 1)).sort(sort).limit(limit).exec();
    responseReturn.ResponseSend(res, true, 200, books)
});

const getIdBooks = (async function (req, res, next) {
  try {
    let book = await bookModel.find({ _id: req.params.id }).populate({
        path: 'author',select: 'name'
    })
    .populate({
    path:'category',select:'name',
    });
    responseReturn.ResponseSend(res, true, 200, book)
  } catch (error) {
    responseReturn.ResponseSend(res, false, 404, error)
  }
});

const postBooks = (async function (req, res, next) {
  try {
    var newbook = new bookModel({
      name: req.body.name,
      old_price: req.body.old_price,
      new_price: req.body.new_price,
      image: req.file.filename,
      description : req.body.description,
      author: req.body.author,
      category: req.body.category
    })
    await newbook.save();
    var author = await authorModel.findById(req.body.author).exec();
    var category = await categoryModel.findById(req.body.category).exec();
    if (!author.published && !category.published) {
      author.published = [];
      category.published = [];
    }
    author.published.push(newbook);
    category.published.push(newbook);
    await author.save();
    await category.save();
    responseReturn.ResponseSend(res, true, 200, newbook)
  } catch (error) {
    console.log(error);
    responseReturn.ResponseSend(res, true, 404, error)
  }
})

const putBooks = (async function (req, res, next) {
  try {
    let updateData = { ...req.body };
    if (req.file) {
        updateData.image = req.file.filename;
    }
    let book = await bookModel.findByIdAndUpdate(req.params.id, updateData,
      {
        new: true
      });
    responseReturn.ResponseSend(res, true, 200, book)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})
const deleteBooks = (async function (req, res, next) {
  try {
    let book = await bookModel.findByIdAndUpdate(req.params.id, {
      isDelete: true
    }, {
      new: true
    });
    responseReturn.ResponseSend(res, true, 200, book)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})

module.exports = router;
module.exports = {
    getBooks,
    getIdBooks,
    postBooks,
    putBooks,
    deleteBooks
};