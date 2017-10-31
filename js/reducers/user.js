const defaultState = {
  user: null,
  messages: [
    {
      _id: Math.round(Math.random() * 1000000),
      text: "someone applied for the job",
      link: 'http://google.com',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      system: true,
    },
  ]
}

const chat = (state = defaultState, action) => {
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
      return {...state, messages: [...state.messages, action.payload]}
    default:
      return state;
  }
};

export default chat;