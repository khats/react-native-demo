import React, { Component } from 'react';
import { Text, View } from 'react-native';
import FlexBasic from './Components/FlexBasic';
import TextInputDemo from './Components/TextInputDemo';
import UsersList from './Components/UsersList';

export default class App extends Component {
  render() {
    return (
      <View>
        {/*
        <FlexBasic/>*/}
        {/*<TextInputDemo/>*/}
        <UsersList />
      </View>
    );
  }
}
