import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay'

import joinMonster from 'join-monster'

import database from '../data/database'
import dbCall from '../data/fetch'
import sqlite3Module from 'join-monster/dist/stringifiers/dialects/sqlite3'

const options = { dialectModule: sqlite3Module }
// create the node type and interface
const { nodeInterface, nodeField } = nodeDefinitions(
  // this function resolves an ID to an object
  (globalId, context, resolveInfo) => {
    // parse the globalID
    const { type, id } = fromGlobalId(globalId)
    // helper method for getting Nodes from the DB, similar to the parent function.
    // also need to pass it the type name and a where function
    return joinMonster.getNode(type, resolveInfo, context, parseInt(id), sql => dbCall(sql, database, context), options)
  },
  // this function determines the type. `joinMonster` figures it out for you and attaches the type to the result in the "__type__" property
  obj => obj.__type__
)

export { nodeInterface, nodeField }
