const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
const mongoDB = require("./db")

dotenv.config();

mongoDB();

app.use(cors({
  origin: 'https://go-food-2-0.vercel.app/', // allow your frontend origin
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://go-food-2-0.vercel.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})