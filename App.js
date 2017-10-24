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

import {Provider} from 'react-redux'
import store from './js/store'
import XmppStore from './js/chatHandler'
let xmpp = new XmppStore()
//var XMPP = require('react-native-xmpp');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  componentDidMount() {
    console.log(xmpp)
    /*XMPP.connect('faysal@sendjob','qweqwe',0,'localhost',5222)

    XMPP.on('login', function () {
      console.log('jdjfslkad')
    });

    XMPP.on('message',function (obj) {
      console.log('mssage paisi', obj)
    })*/

    xmpp.login('faysal','qweqwe')

  }

  componentWillUnmount() {
    //XMPP.removeListeners();
    //XMPP.removeListener('message');
  }

  onClick() {
    xmpp.sendMessage('from app', 'zibon@sendjob')
    console.log('.**..')
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container} xmpp={xmpp}>
          <Button
            onPress={() => this.onClick()}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
