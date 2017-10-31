import XMPP from 'react-native-xmpp';
import store from './store'
const config = {
  domain : 'sendjob',
  host: 'localhost',
  port: 5222,
  schema: 'mobile',
  authType: 0 // 0 -> plain auth, 1-> scram, 2-> md5digest
}
class XmppStore {
  logged = false;
  loginError = null;
  xmppObject = XMPP
  //error = null;

  constructor() {
    this.xmppObject.on('loginError', this.onLoginError);
    this.xmppObject.on('error', this.onError);
    this.xmppObject.on('disconnect', this.onDisconnect);
    this.xmppObject.on('login', this.onLogin);
    this.xmppObject.on('message', this.onReceiveMessage);
    this.settings = {...config}
  }

  _getUserName(name){
    return name + '@' + this.settings.domain + "/" + this.settings.schema;
  }
  fetchRoster() {
    return this.xmppObject.fetchRoster()
  }


  sendMessage(message,receiver){

    let x = this.xmppObject.message(message.trim(),receiver)
    console.log('... ', x)
  }

  onReceiveMessage(data){

    console.log("pre recv")
    let {from,body} = data
    // extract username from this.xmppObject UID
    if (!from || !body){
      return;
    }
    var name = from.match(/^([^@]*)@/)[1];
    console.log("onReceiveMessage ", data)
    //this.conversation.unshift({own:false, text:body});
  }

  onLoginError(text){
    //this.loading = false;
    //this.conversation.replace([]);
    store.dispatch({type:'LOGIN_FAILED',payload: text})
  }

  onError(message){
    console.log('LINE 58')
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
    this.xmppObject.connect(this._getUserName(user),password,settings.authType,settings.host,settings.port)

  }

  disconnect() {
    this.xmppObject.disconnect();
  }

}

export default XmppStore;