/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import * as test from '@faysal/gifted-xmpp'
import {StackNavigator, TabNavigator} from 'react-navigation'

import {Provider} from 'react-redux'
import Login from './js/components/login'
import JobListView from './js/components/jobListView'
import Messenger from './js/components/messenger'
import store from './js/store'
import xmpp from './js/chatHandler'


const Main = StackNavigator({
  Login: {
    screen: Login
  },
  JobList: {
    screen: JobListView
  },
  Messenger: {
    screen: Messenger
  },
  // AddQuestion: {
  //   screen: AddQuestionView
  // },
  // Quiz: {
  //   screen: Quiz
  // }
})

export default class App extends Component<{}> {
  /*state = {
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
    ],
  }
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  componentDidMount() {
    console.log(xmpp)
    /!*XMPP.connect('faysal@sendjob','qweqwe',0,'localhost',5222)

    XMPP.on('login', function () {
      console.log('jdjfslkad')
    });

    XMPP.on('message',function (obj) {
      console.log('mssage paisi', obj)
    })*!/

    xmpp.login('faysal','qweqwe')

  }*/

  componentWillUnmount() {
    //XMPP.removeListeners();
    //XMPP.removeListener('message');
  }

  /*onClick() {
    //xmpp.sendMessage('from app', 'zibon@sendjob')
    xmpp.fetchRoster()
    console.log('.**..')
  }*/
  render() {
    console.log('GIFTED ', test.name)
    return (
      <Provider store={store}>
        <View style={styles.container} >
          <Main screenProps={{xmpp:new xmpp()}}/>
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
