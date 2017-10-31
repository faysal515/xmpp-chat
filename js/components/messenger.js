import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {GiftedChat, SystemMessage} from 'react-native-gifted-chat';


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
  }

  onReceiveMessage(text) {
    if (!text.body)
      return

    this.props.sendMessage({
      _id: text.id,
      text: text.body,
      createdAt: new Date(),
      user: {
        _id: text.from
      }
    })

    // if (text.body === 'qqq') {
    //   this.setState((previousState) => ({
    //     messages: GiftedChat.append(previousState.messages, [{
    //       _id: text.id,
    //       text: text.body,
    //       system: true,
    //       createdAt: new Date(),
    //     }]),
    //   }));
    // } else {
    //   this.setState((previousState) => ({
    //     messages: GiftedChat.append(previousState.messages, [{
    //       _id: text.id,
    //       text: text.body,
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2, //@todo userId should extracted from the `text.from` property
    //         name: 'something'
    //       }
    //     }]),
    //   }));
    // }


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
    // this.setState({
    //   messages: [
    //     {
    //       _id: Math.round(Math.random() * 1000000),
    //       text: "http://google.com",
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       system: true,
    //     },
    //   ],
    // });


  }

  onSend(messages = []) {
    console.log('>> ', this.props)
    let {xmpp} = this.props.screenProps
    let {params} = this.props.navigation.state
    xmpp.sendMessage(messages[0].text, `${params.user.username}@sendjob`)
    this.props.sendMessage(messages[0])
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onPressPhoneNumber() {
    console.log('click ulr')
  }

  render() {
    return (
      <GiftedChat
        messages={this.props.chat.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderSystemMessage={this.renderSystemMessage}
        parsePatterns={(linkStyle) => [
          { type: 'url', style: {...linkStyle}, onPress: this.onPressPhoneNumber },
          ]}
      />
    )
  }
}


const mapStateToProps = (store,ownProps) => {
  return {
    chat: store.chat
  }
}

const mapDisPatchToProps = (dispatch,ownProps) => {
  return {
    sendMessage : (msg) => dispatch({type: 'MESSAGE_SENT', payload: msg})
  }
}

export default connect(mapStateToProps,mapDisPatchToProps)(Messenger)



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

