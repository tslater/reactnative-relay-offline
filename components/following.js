import React from 'react';
import { View, Text } from 'react-native';
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../relay/Environment'
import UserProfile from './UserProfile'
import PostList from './PostList'

export default class RelayExample extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={relayQuery}
        render={({error, props}) => {
          if (error) {
            return <Text>{ error.message }</Text>
          } else if (props) {
            console.log(`camels`, props)
            return (
              <View>
                <UserProfile user={props.user}/>
                <PostList posts={props.user.posts}/>
              </View>
            )
          }
          return <Text>Loading</Text>
        }}
      />
    );
  }
}

const relayQuery = graphql`
 query RelayExampleUserQuery {
    user {
      email
      fullName
      posts{
        ...PostList_posts
      }
    }
  }
`
