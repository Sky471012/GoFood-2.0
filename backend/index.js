const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
const mongoDB = require("./db")

dotenv.config();

mongoDB();

app.use(cors());

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