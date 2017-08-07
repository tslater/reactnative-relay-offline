import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import joinMonster from 'join-monster'

import database from '../data/database'
import User from './User'
import { nodeField } from './Node'
import dbCall from '../data/fetch'

const options = { dialect: 'sqlite3' }

export default new GraphQLObjectType({
  description: 'global query object',
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => joinMonster.version
    },
    // implement the Node type from Relay spec
    node: nodeField,
    user: {
      type: User,
      args: {
        id: {
          description: 'The users ID number',
          type: GraphQLInt
        }
      },
      where: (usersTable, args, context) => { // eslint-disable-line no-unused-vars
        if (args.id) return `${usersTable}.id = ${args.id}`
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql => dbCall(sql, database, context), options)
      }
    }
  })
})
