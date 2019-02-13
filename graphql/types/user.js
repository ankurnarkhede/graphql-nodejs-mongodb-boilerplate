
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import {
  GraphQLDateTime
} from 'graphql-iso-date'

import PostModel from '../../models/post'
import { postType } from './post'

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User API',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
      // type:GraphQLID
    },
    email: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLDateTime
    },
    posts: {
      type: new GraphQLList(postType),
      resolve (user) {
        const { _id } = user
        return PostModel.find({ uid: _id }).exec()
      }
    }
  })
})

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Insert User',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }

  })
})
