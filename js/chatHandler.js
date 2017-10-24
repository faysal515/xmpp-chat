import XMPP from 'react-native-xmpp';
import store from './store'
const config = {
  domain : 'sendjob',
  host: 'localhost',
  port: 5222,
  schema: 'mobile',
  authType: 0 // plain auth 1-> scram 2-> md5digest
}
class XmppStore {
  logged = false;
  loading = false;
  loginError = null;
  error = null;
  conversation = [];

  constructor() {
    XMPP.on('loginError', this.onLoginError);
    XMPP.on('error', this.onError);
    XMPP.on('disconnect', this.onDisconnect);
    XMPP.on('login', this.onLogin);
    XMPP.on('message', this.onReceiveMessage);
    this.settings = {...config}
    // default values
    //this.local = 'rntestuser1';
    //this.remote = 'rntestuser2';
  }

  _getUserName(name){
    return name + '@' + this.settings.domain + "/" + this.settings.schema;
  }

  sendMessage(message,receiver){
    /*if (!this.remote || !this.remote.trim()){
      console.error("No remote username is defined");
    }
    if (!message || !message.trim()){
      return false;
    }
    // add to list of messages
    this.conversation.unshift({own:true, text:message.trim()});
    // empty sent message
    this.error = null;
    // send to XMPP server
    XMPP.message(message.trim(), this._userForName(this.remote))*/

    XMPP.message(message.trim(),receiver)
  }

  onReceiveMessage(data){
    console.log("pre recv")
    let {from,body} = data
    // extract username from XMPP UID
    if (!from || !body){
      return;
    }
    var name = from.match(/^([^@]*)@/)[1];
    console.log("onReceiveMessage ", data)
    //this.conversation.unshift({own:false, text:body});
  }

  onLoginError(){
    this.loading = false;
    this.conversation.replace([]);
    this.loginError = "Cannot authenticate, please use correct local username";
  }

  onError(message){
    this.error = message;
  }

  onDisconnect(message){
    this.logged = false;
    this.loginError = message;
  }

  onLogin(user){
    console.log("LOGGED!", );
    //this.conversation.replace([]);
    //this.loading = false;
    //this.loginError = null;
    //this.logged = true;
    store.dispatch({type:'LOGIN_SUCCESS',payload: user.username})
  }

  login(user, password){
    const {settings} = this


    /*
    * VALIDATION
    * */
    //console.log('TRY ', username,password,settings)
    XMPP.connect(this._getUserName(user),password,settings.authType,settings.host,settings.port)

  }

  disconnect() {
    XMPP.disconnect();
  }

}

export default XmppStore;