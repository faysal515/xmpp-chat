const chat = (state = {}, action) => {
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
    default:
      return state;
  }
};

export default chat;