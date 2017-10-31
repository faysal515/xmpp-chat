const defaultState = {
  user: null,
  messages: []
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
      return {...state,messages:[...state.messages,action.payload]}
    default:
      return state;
  }
};

export default chat;