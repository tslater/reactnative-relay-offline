const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')
import '../global'

import { graphql } from 'graphql'
import schema from '../graphql/relay-schema/index.js'

const store = new Store(new RecordSource())
const network = Network.create((operation, variables) =>
  graphql(schema, operation.text, null, {}, variables)
)

const environment = new Environment({
  network,
  store,
})

export default environment
