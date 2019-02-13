import userMutations from './user'
import postMutations from './post'

export default {
  ...userMutations,
  ...postMutations
}
