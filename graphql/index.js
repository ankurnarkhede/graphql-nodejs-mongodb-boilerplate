
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import mutations from './mutations'
import queries from './queries'
import subscriptions from './subscriptions'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields: mutations
  }),
  subscription: new GraphQLObjectType({
    name: 'subscription',
    fields: subscriptions
  })
})
