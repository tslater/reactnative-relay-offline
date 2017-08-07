import React from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
// Shim those nodejs packages for join-monster
import './global'
import { graphql } from 'graphql'
import nonRelaySchema from './graphql/schema/index.js'
import relaySchema from './graphql/relay-schema/index.js'

export default class App extends React.Component {

  state = {
    graphqlResponseData: null,
    error: null
  };

  _query = (isRelayQuery) => {

    const schema = isRelayQuery ? relaySchema : nonRelaySchema
    const query = isRelayQuery ? relayQuery : nonRelayQuery
    graphql(schema, query)
    	.then((response) => {
        const graphqlResponseData = response.data.users || response.data
        this.setState({ graphqlResponseData })
      })
    	.catch(error => this.setState({ error }))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Press a button to run a query</Text>
        <View style={{flexDirection: 'row'}}>
          <Button 
            onPress={() => this._query(false)} 
            title='Non-Relay Query'
          />
          <Button 
            onPress={() => this._query(true)}
            title='Relay Query'
          />
        </View>
        <Text>Data from local join monster:</Text>
        {
          Array.isArray(this.state.graphqlResponseData) ?
            this.state.graphqlResponseData.map( row =>
              <Text key={row.id}>{ JSON.stringify(row, null, 4) }</Text>
            ) 
            : <Text>{ JSON.stringify(this.state.graphqlResponseData, null, 4) }</Text>
        }
        <Text>Errors:</Text>
        { <Text>{ JSON.stringify(this.state.error, null, 4) }</Text>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
});

const nonRelayQuery = `{
  users {
    ...UserInfo
    posts {
      id
      body
      comments {
        body
        author {
          ... UserInfo
          following {
            id
          }
        }
      }
    }
  }
}

fragment UserInfo on User {
  id, fullName, email
}
`

const relayQuery = `
  {
    version
    user {
      email
      fullName
      following {
        edges {
          node {
            fullName
          }
        }
      }
      comments {
        edges {
          node {
            body
            id
          }
        }
      }
      posts {
        edges {
          node {
            body
            id
            comments {
              edges {
                node {
                  body
                }
              }
            }
          }
        }
      }
    }
  }
`