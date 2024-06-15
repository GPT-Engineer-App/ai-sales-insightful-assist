const express = require('express');
const bodyParser = require('body-parser');
const feedbackRouter = require('./feedback');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', feedbackRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});