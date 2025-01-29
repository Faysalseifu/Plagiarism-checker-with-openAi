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

