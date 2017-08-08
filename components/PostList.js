import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class PostList extends React.Component{
  render(){
    const {posts} = this.props
    return(
      <ScrollView>
        {posts.edges.map(({node})=>
          <View key={node.id} style={styles.listItem} >
            <Text>{node.body}</Text>
          </View>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    margin: 4,
    padding: 20,
    borderWidth: 1,
  }
});

export default createFragmentContainer(PostList, graphql`
  fragment PostList_posts on PostConnection {
      edges {
        node {
          body,
          id
        }
      }
  }
`)
