import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'


import {GiftedChat, SystemMessage} from 'react-native-gifted-chat'


class Messenger extends Component {


  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    };

    this.renderSystemMessage = this.renderSystemMessage.bind(this);
  }

  componentDidMount() {
    this.props.screenProps.xmpp.xmppObject.on('message', this.onReceiveMessage.bind(this))
    this.props.screenProps.xmpp.xmppObject.on('iq', iq => console.log('iq man ', iq))
    //this.props.screenProps.xmpp.xmppObject.addToRoster('')
  }

  onReceiveMessage(text) {
    if (!text.body)
      return

    this.props.receiveMessage({
      _id: uuidv4(),
      text: text.body,
      createdAt: new Date(),
      user: {
        _id: text.from.split('@')[0]
      }
    })

  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 25,
          // textDecorationLine: 'underline'
        }}
      />
    );
  }

  onSend(messages = []) {
    console.log('>> ', messages[0])
    let {xmpp} = this.props.screenProps
    let {params} = this.props.navigation.state
    xmpp.sendMessage(messages[0].text, `${params.user.username}@sendjob`)
    messages[0].recipient = params.user.username
    this.props.sendMessage(messages[0])
  }

  onPressPhoneNumber() {
    console.log('click ulr')
  }

  render() {
    //console.log('ping', this.props.navigation)
    let {chat} = this.props
    let chattingWith = this.props.navigation.state.params.user.username,
      key = `${chat.user}:${chattingWith}`
    return (
      <GiftedChat
        messages={this.props.chat.messages[key] || []}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: `faysal@sendjob`,
        }}
        renderSystemMessage={this.renderSystemMessage}
        parsePatterns={(linkStyle) => [
          {type: 'url', style: {...linkStyle}, onPress: this.onPressPhoneNumber},
        ]}
        systemMessageParsePatterns={
          (currentMessage) => [
            {
              pattern: /[a-zA-Z0-9]+ applied for the job/,
              style: {backgroundColor: 'black', color: 'yellow'},
              onPress: (x) => console.log('QQQ ', x, this.props,currentMessage) // url opener function here
            },
          ]
        }
      />
    )
  }
}


const mapStateToProps = (store, ownProps) => {
  return {
    chat: store.chat
  }
}

const mapDisPatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (msg) => dispatch({type: 'MESSAGE_SENT', payload: msg}),
    receiveMessage: (msg) => dispatch({type: 'MESSAGE_RECEIVED', payload: msg})
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Messenger)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold'
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },

});

