require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

/** Middleware **/
app.use(express.json());
app.use(cors());

/** Routes **/
// Register + Login Routes
app.use('/auth', require('./routes/jwt_auth'));

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});