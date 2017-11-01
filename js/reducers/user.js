const defaultState = {
  user: null,
  messages: {}
  // {
  //   _id: Math.round(Math.random() * 1000000),
  //   text: 'someone applied for the job',
  //   link: 'http://google.com',
  //   createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  //   system: true,
  // },

}

const chat = (state = defaultState, action) => {
  let key, root, list
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        user: null
      }

    case 'MESSAGE_SENT':
      key = `${state.user}:${action.payload.recipient}`
      root = {...state.messages}
      list = Array.isArray(root[key]) ? [...root[key]] : []

      list.unshift(action.payload)
      root[key] = list
      return {...state, messages: root}


    case 'MESSAGE_RECEIVED':
      key = `${state.user}:${action.payload.user._id}`
      root = {...state.messages}
      list = Array.isArray(root[key]) ? [...root[key]] : []

      list.unshift(action.payload)
      root[key] = list
      return {...state, messages: root}
    default:
      return state;
  }
};

export default chat;

/*
* DATA STRUCTURE FOR MESSAGE CACHES
* <key>user1:user2
* <value>message array(m)
*
* m: [object array(o)]
* object shape,o
* {
      _id: random uuid,
      text: "someone applied for the job",
      link: 'http://google.com',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      system: true,
    },
*
*
* */


//getUserList