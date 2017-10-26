import React, {Component} from 'react'
import {
  View,
  Text
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';



export default class Messenger extends Component {


  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    this.props.screenProps.xmpp.xmppObject.on('message',this.onReceiveMessage.bind(this))
  }

  onReceiveMessage(text) {
    console.log('>>>> ', text)
    if(!text.body)
      return
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [{
        _id: text.id,
        text: text.body,
        createdAt: new Date(),
        user:{
          _id: 2, //@todo userId should extracted from the `text.from` property
          name: 'something',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }
      }]),
    }));
  }

  componentWillMount() {
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },
    //   ],
    // });
  }

  onSend(messages = []) {
    console.log('>> ', this.props)
    let {xmpp} = this.props.screenProps
    let {params} = this.props.navigation.state
    xmpp.sendMessage(messages[0].text,`${params.user.username}@sendjob`)
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
      />
    )
  }
}