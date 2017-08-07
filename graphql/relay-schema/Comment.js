import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql'

import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'

import { Post } from './Post'
import User from './User'
import { nodeInterface } from './Node'

export const Comment = new GraphQLObjectType({
  description: 'Comments on posts',
  name: 'Comment',
  sqlTable: 'comments',
  uniqueKey: 'id',
  // also implements the node interface
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      ...globalIdField(),
      sqlDeps: [ 'id' ]
    },
    body: {
      description: 'The content of the comment',
      type: GraphQLString
    },
    likers: {
      description: 'Users who liked this comment',
      type: new GraphQLList(User),
      junction: {
        sqlTable: 'likes',
        sqlJoins: [
          (commentTable, likeTable) => `${commentTable}.id = ${likeTable}.comment_id`,
          (likeTable, accountTable) => `${likeTable}.account_id = ${accountTable}.id`
        ]
      }
    },
    post: {
      description: 'The post that the comment belongs to',
      type: Post,
      sqlJoin: (commentTable, postTable) => `${commentTable}.post_id = ${postTable}.id`
    },
    author: {
      description: 'The user who wrote the comment',
      type: User,
      sqlJoin: (commentTable, userTable) => `${commentTable}.author_id = ${userTable}.id`
    },
    archived: {
      type: GraphQLBoolean
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'created_at'
    }
  })
})

export const SimpleComment = new GraphQLObjectType({
  description: 'comments on the post without join capabilities',
  name: 'SimpleComment',
  fields: () => ({
    id: {
      ...globalIdField(),
      sqlDeps: [ 'id' ]
    },
    body: {
      type: GraphQLString
    },
    authorId: {
      type: GraphQLInt,
      resolve: comment => comment.author_id
    },
    postId: {
      type: GraphQLInt,
      resolve: comment => comment.post_id
    },
    archived: {
      type: GraphQLBoolean
    },
    createdAt: {
      type: GraphQLString,
      resolve: comment => comment.created_at
    }
  })
})

// create a connection type from the Comment type
// this connection will also include a "total" so we know how many total comments there are
// this could be used to calculate page numbers
const { connectionType: CommentConnection } = connectionDefinitions({
  nodeType: Comment,
  connectionFields: {
    total: { type: GraphQLInt }
  }
})

export { CommentConnection }
