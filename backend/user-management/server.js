const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { port, uri } = require('./config')
const { logger } = require('./utils')

const app = express()
mongoose.connect(uri, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => logger.info("connected to MongoDB"))
  .catch(err => logger.error(err))

app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/user')
const staffRoutes = require('./routes/staff')

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/staff', staffRoutes)

app.listen(port, () => logger.info(`Server up at port ${port}`))
