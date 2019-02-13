import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import schema from './graphql'

const expressPlayground = require(
  'graphql-playground-middleware-express').default

const app = express()

// mongoose connection
mongoose.connect(
  'mongodb://ankur:ankur1@ds239309.mlab.com:39309/nodejs-graphql-mongodb-boilerplate')
// mongoose.connect('mongodb://localhost:27017/nodejs-graphql-mongodb-boilerplate');

const db = mongoose.connection
db.on('error', () => console.log('Failed to connect to MongoDB'))
  .once('open', () => console.log('Connected to MongoDB'))

// registering GET / route
app.get('/', (req, res) => {
  res.send('Hello World! This is GraphQL API')
})

// grapgql api endpoint
app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  pretty: true
})))

// Playground route
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// server start
app.listen(3000, () => {
  var d = new Date().toLocaleString()
  console.log(
    'graphQL API running at port 3000\nLink: http://localhost:3000/graphql\nTimeStamp: ',
    d)
})
