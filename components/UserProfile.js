import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class UserProfile extends React.Component{
  render(){
    const {user} = this.props
    return(
      <View>
        <Text>Id: {user.id}</Text>
        <Text>User: {user.fullName}</Text>
        <Text>Email: {user.email}</Text>
      </View>
    )
  }
}

export default UserProfile
