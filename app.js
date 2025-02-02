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

    const pretopics = [
        
      "Development of an automated inventory management system",
      "Implementation of a customer relationship management (CRM) system",
      "Design and development of a web-based project management tool",
      "Creation of an employee attendance tracking system",
      "Development of a document management system for efficient file organization",
      "Implementation of an e-commerce platform with secure payment integration",
      "Design and deployment of a centralized data analytics platform",
      "Development of a mobile app for field service management",
      "Creation of a knowledge management system for internal collaboration",
      "Implementation of a cloud-based data backup and recovery solution",
      "Design and development of a supply chain management system",
      "Integration of various enterprise systems (ERP, CRM, HRM) for seamless data flow",
      "Creation of a data visualization tool for business intelligence purposes",
      "Development of a customer support ticketing system",
      "Implementation of a real-time inventory tracking system using IoT devices",
      "Design and deployment of a learning management system for employee training",
      "Creation of a workflow automation system to streamline business processes",
      "Development of a secure document sharing and collaboration platform",
      "Implementation of a data warehouse for centralized data storage and analysis",
      "Design and development of a sales forecasting system",
      "Creation of an online employee performance evaluation system",
      "Development of a project portfolio management tool",
      "Implementation of a network monitoring and troubleshooting system",
      "Design and deployment of a social media analytics platform",
      "Creation of a mobile app for remote team communication and collaboration",
      "Development of a data-driven decision support system",
      "Implementation of a secure user authentication and access control system",
      "Design and development of a customer feedback management system",
      "Creation of a chatbot for customer support and assistance",
      "Development of a recommendation engine for personalized product suggestions",
      "Implementation of a data privacy and compliance management system",
      "Design and deployment of a virtual meeting and video conferencing platform",
      "Creation of a predictive maintenance system for industrial equipment",
      "Development of a data-driven marketing campaign management system",
      "Implementation of a logistics optimization system for efficient transportation",
      "Design and development of a remote monitoring system for environmental sensors",
      "Creation of a data integration platform for seamless data exchange between systems",
      "Development of a sentiment analysis tool for social media monitoring",
      "Implementation of a fraud detection and prevention system",
      "Design and deployment of a gamification platform for employee engagement",
      "Creation of a mobile app for online order tracking and delivery notifications",
      "Development of a recommendation system for personalized news and content",
      "Implementation of a data-driven pricing optimization system",
      "Design and development of a healthcare information management system",
      "Creation of a virtual reality-based training platform for specific industries",
      "Development of a smart home automation system",
      "Implementation of a sentiment analysis tool for customer feedback",
    "Design and deployment of a blockchain-based supply chain traceability system",
    "Creation of a data-driven energy management system",
    "Development of a content management system for a news publishing platform",
    "Implementation of a sentiment analysis system for social media marketing",
 "Design and development of a vehicle tracking and fleet management system",
 "Creation of a data-driven recommendation system for personalized shopping",
    "Development of a mobile app for online food ordering and delivery",
    "Implementation of a data-driven risk management system",
    "Design and deployment of a virtual reality training platform for safety procedures",
    "Creation of a data-driven predictive maintenance system for manufacturing",
    "Development of an automated customer onboarding system",
    "Implementation of a data-driven quality control system",
    "Design and development of an augmented reality-based product visualization tool"
];

app.get("/", function (req, res) {
  res.render("check", { answer: "" });
  });
  app.get('/about', function (req, res) {
  // Assuming 'about.ejs' is in the 'views' directory
  res.render('about');
  });
  
  app.post("/getRequest", async function (req, res) {
  try {
  const { topic } = req.body;
  
  const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { "role": "user", "content": `Check if the topic "${topic}" is present in the list of ${pretopics}. Create a completion request only if the title is already in use and compare it to existing topics. If the topic is not present or bears less than 60% similarity, share the similarity percentage and the related topic, and state that the title is approved. In case of over 60% similarity, suggest trying a different topic and provide a reason. Ensure the response is concise, limited to a maximum of 5 lines. Mention that the previous topics constitute a list of topics existing in a database and worked on in previous papers.` }
  ];
  
  const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages,
  max_tokens: 100
  });
  
  const answer = response.choices[0].message['content'];
  console.log("Searching Result:", answer);
  
  // Store the question and answer in the MongoDB collection
  await qaCollection.insertOne({ topic, question: messages[1].content, answer });
  
  res.render("check", { answer });
  } catch (error) {
  console.error("Error:", error);
  res.status(500).send("An error occurred while processing the request.");
  }
  });
  
  const port = 3000;
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });
  })
  .catch((error) => {
  console.error("MongoDB connection error:", error);
  });
  