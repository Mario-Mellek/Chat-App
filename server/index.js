const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
const cors = require('cors');
mongoose.set('strictQuery', false);

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

app.get('/', (_req, res) => {
  res.send('Server Running');
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connected on ${process.env.MONGO_URL}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server connected on ${port}`);
});
