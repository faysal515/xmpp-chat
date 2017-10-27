import React, {Component} from 'react'
import {
  View,
  Text
} from 'react-native'
import {GiftedChat, SystemMessage} from 'react-native-gifted-chat';


export default class Messenger extends Component {


  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    };

    this.renderSystemMessage = this.renderSystemMessage.bind(this);
  }

  componentDidMount() {
    this.props.screenProps.xmpp.xmppObject.on('message', this.onReceiveMessage.bind(this))
  }

  onReceiveMessage(text) {
    if (!text.body)
      return

    if (text.body === 'qqq') {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [{
          _id: text.id,
          text: text.body,
          system: true,
          createdAt: new Date(),
        }]),
      }));
    } else {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [{
          _id: text.id,
          text: text.body,
          createdAt: new Date(),
          user: {
            _id: 2, //@todo userId should extracted from the `text.from` property
            name: 'something'
          }
        }]),
      }));
    }


  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 15,
          color: 'white',
          backgroundColor: 'orange'
        }}
      />
    );
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: Math.round(Math.random() * 1000000),
          text: "I'm a special message :-D",
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          system: true,
        },
      ],
    });


  }

  onSend(messages = []) {
    console.log('>> ', this.props)
    let {xmpp} = this.props.screenProps
    let {params} = this.props.navigation.state
    xmpp.sendMessage(messages[0].text, `${params.user.username}@sendjob`)
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderSystemMessage={this.renderSystemMessage}
      />
    )
  }
}