import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
// Shim those nodejs packages for join-monster
import './global'
import { graphql } from 'graphql'
import schema from './graphql/schema/index.js'

// const query = `{
//   users {
//     ...UserInfo
//     posts {
//       id
//       body
//       comments {
//         body
//         author {
//           ... UserInfo
//           following {
//             id
//           }
//         }
//       }
//     }
//   }
// }
//
// fragment UserInfo on User {
//   id, fullName, email
// }
// `

const query = `{
  users {
    ...UserInfo
  }
}

fragment UserInfo on User {
  id, fullName, email
}
`


export default class App extends React.Component {

  state = {
    rows: null,
  };

  componentDidMount() {
    graphql(schema, query)
    	.then((rows) => this.setState({rows}))
    	.catch(error => console.log('query error', error))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Data from local join monster:</Text>
        <Text>
        { JSON.stringify(this.state.rows, null, 4) }
        </Text>
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
