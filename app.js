import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'
import schema from './graphql'

const { SubscriptionServer } = require('subscriptions-transport-ws')
const { subscribe, execute } = require('graphql')
const expressPlayground = require(
  'graphql-playground-middleware-express').default

const app = express()

// mongoose connection
mongoose.connect(
  'mongodb://ankur:ankur1@ds239309.mlab.com:39309/nodejs-graphql-mongodb-boilerplate',
  { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

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
app.get(
  '/playground',
  expressPlayground({
    endpoint: '/graphql',
    subscriptionsEndpoint: `ws://localhost:3001/subscriptions`
  })
)

SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  onConnect: () => console.log('Subscription Client Connected')
}, {
  app,
  path: '/subscriptions',
  port: 3001
})

module.exports = app
