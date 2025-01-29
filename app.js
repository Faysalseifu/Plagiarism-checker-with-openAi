const express = require("express");
const { MongoClient } = require("mongodb");
const { OpenAI } = require('openai');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'views')));


let db;

MongoClient.connect("mongodb+srv://fayselseifu:faysel1234@cluster0.79szisr.mongodb.net/Projectdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("Projectdb");

    const qaCollection = db.collection("qa");

