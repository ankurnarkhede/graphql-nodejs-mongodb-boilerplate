/**
 * Created by ankur at 13/2/19 2:15 PM.
 */

import { GraphQLList } from 'graphql'
import { userType } from '../types/user'

const socket = require('../socket')

module.exports = {
  type: new GraphQLList(userType),
  subscribe: () => socket.asyncIterator('EVENT_CREATED')
}
