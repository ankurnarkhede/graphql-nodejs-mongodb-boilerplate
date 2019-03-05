
import {
  GraphQLList
} from 'graphql'

import { userType } from '../../types/user'
import UserModel from '../../../models/user'

const socket = require('../../socket')

export default {
  type: new GraphQLList(userType),
  resolve () {
    const users = UserModel.find().exec()
    if (!users) {
      throw new Error('Error while fetching users...')
    } else {

      // GraphQL publish
      socket.publish('EVENT_CREATED', {
        userQueried: users
      })

      return users
    }
  }
}
