import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql'

import {
  globalIdField,
  connectionArgs,
  forwardConnectionArgs,
  connectionDefinitions,
  connectionFromArray
} from 'graphql-relay'

import database from '../data/database'
import { PostConnection } from './Post'
import { CommentConnection } from './Comment'
import { nodeInterface } from './Node'


const User = new GraphQLObjectType({
  description: 'a stem contract account',
  name: 'User',
  sqlTable: 'accounts',
  uniqueKey: 'id',
  // This implements the node interface
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      // all the resolver for the globalId needs is the id property
      ...globalIdField(),
      sqlDeps: [ 'id' ]
    },
    email: {
      type: GraphQLString,
      sqlColumn: 'email_address'
    },
    fullName: {
      description: 'A user\'s first and last name',
      type: GraphQLString,
      sqlDeps: [ 'first_name', 'last_name' ],
      resolve: user => `${user.first_name} ${user.last_name}`
    },
    fullNameAnotherWay: {
      type: GraphQLString,
      sqlExpr: table => `${table}.first_name || ' ' || ${table}.last_name`
    },
    posts: {
      description: 'A list of Posts the user has written',
      // this is now a connection type
      type: PostConnection, 
      // these args navigate through the pages
      args: connectionArgs,
      // use "keyset" pagination, an implementation based on a unique sorting key
      sortKey: {
        order: 'desc',
        key: 'id'
      },
      sqlBatch: {
        // which column to match up to the users
        thisKey: 'author_id',
        // the other column to compare to
        parentKey: 'id'
      },
      resolve: (user, args) => {
        return connectionFromArray(user.posts, args)
      }
    },
    comments: {
      description: 'Comments the user has written on people\'s posts',
      type: CommentConnection,
      // this implementation only allows "forward pagination"
      args: forwardConnectionArgs,
      // this time use "offset pagination", an implementation based on LIMIT/OFFSET
      orderBy: {
        id: 'desc'
      },
      sqlBatch: {
        // which column to match up to the users
        thisKey: 'author_id',
        // the other column to compare to
        parentKey: 'id'
      },
      resolve: (user, args) => {
        return connectionFromArray(user.comments, args)
      }
    },
    following: {
      description: 'Users that this user is following',
      type: UserConnection,
      args: connectionArgs,
      sqlPaginate: false,
      // pagination also works with many-to-many
      junction: {
        sqlTable: 'relationships',
        // the unique sort key can be composite
        sortKey: {
          order: 'desc',
          key: [ 'created_at', 'followee_id' ]
        },
        uniqueKey: [ 'follower_id', 'followee_id' ],
        sqlBatch: {
          // the matching column in the junction table
          thisKey: 'follower_id',
          // the column to match in the user table
          parentKey: 'id',
          // how to join the related table to the junction table
          sqlJoin: (junctionTable, followeeTable) => `${junctionTable}.followee_id = ${followeeTable}.id`
        },
      },
      resolve: (user, args) => {
        return connectionFromArray(user.following, args)
      },
    },
    favNums: {
      type: new GraphQLList(GraphQLInt),
      // you can still have resolvers that get data from other sources. simply omit the `sqlColumn` and define a resolver
      resolve: () => [1, 2, 3]
    },
  })
})

const { connectionType: UserConnection } = connectionDefinitions({ nodeType: User })

export default User 

