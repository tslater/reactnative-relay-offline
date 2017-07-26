import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
// Shim those nodejs packages for join-monster
import './global'
import { graphql } from 'graphql'
import schema from './graphql/schema/index.js'

export default class App extends React.Component {

  state = {
    rows: null,
  };

  componentDidMount() {

    const query = `{
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

    graphql(schema, query)
    	.then((response) => {
        const rows = response.data.users ? response.data.users : response.data
        console.log('rows')
        this.setState({ rows })
      })
    	.catch(error => console.log('graphql error', error))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Data from local join monster:</Text>
        {
          this.state.rows ?
            this.state.rows.map( row =>
              <Text key={row.id}>{ JSON.stringify(row, null, 4) }</Text>
            )
          : null
        }
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
