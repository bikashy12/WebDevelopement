import apis from '../../constants/api';
import ChatMessage from "../../models/chat-message";

export const SET_CURRENT_SUB_CAHANNEL = "SET_CURRENT_SUB_CAHANNEL";
export const RESET_ALL_SUBSCRIPTION_CAHANNEL = "RESET_ALL_SUBSCRIPTION_CAHANNEL";
export const SET_PREVIOUS_CHATS = "SET_PREVIOUS_CHATS";
export const SET_CHAT_MESSAGES = "SET_CHAT_MESSAGES";
export const UPDATE_CHAT_MESSAGES = "UPDATE_CHAT_MESSAGES";
export const RELOAD_CHAT_MESSAGES = 'RELOAD_CHAT_MESSAGES';
export const UPDATE_CURRENT_MESSAGE = "UPDATE_CURRENT_MESSAGE";
export const UPDATE_CHAT_COUNT = "UPDATE_CHAT_COUNT";

// export const SET_CURRENT_MESSAGE_INDEX = 'SET_CURRENT_MESSAGE_INDEX';
// export const UPDATE_CHAT_MESSAGES_WITH_INDEX = 'UPDATE_CHAT_MESSAGES_WITH_INDEX';
import moment from 'moment';
import * as loadingActions from "./loader";

export const updateCurrentMessages = (
  currentId,
  newMessages
) => {
  console.log("BEFORE updateCurrentMessages");

  return (dispatch, getState) => {
    // return async (dispatch, getState, () => {
    // dispatch(myAction())
    // .then(() => dispatch(callbackAction()));
    dispatch(
      {
        // return {
        type: UPDATE_CURRENT_MESSAGE,
        currentId: currentId,
        newMessages: newMessages,
        // cbUpdateCount: cbUpdateCount,
      }
      // () => {
      //   console.log("AFTER updatePendingEnquiyCountAndStatus");
      // }
    );
    cbUpdateCount();

    // dispatch(cbUpdateCount()));
  };
};

export const resetAllSubscriptions = () => {
  return {
    type: RESET_ALL_SUBSCRIPTION_CAHANNEL,
  };
};
export const setReloadChatMessages = () => {
  return { type: RELOAD_CHAT_MESSAGES };
};
export const createOrderMessage = (orderMessage) => {
  return { type: CREATE_ORDER, orderMessage: orderMessage };
};
export const setCurrentSubscriptionChannel = (channelName) => {
  return {
    type: SET_CURRENT_SUB_CAHANNEL,
    // channel: channel,
    channelName: channelName,
  };
};
// export const setCurrentMesssageIndex = (messageIndex) => {
//   return { type: SET_CURRENT_MESSAGE_INDEX, messageIndex: messageIndex };
// };
export const resetOrderMessages = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: SET_CHAT_MESSAGES,
      previouschatMessages: [],
    });
  };
};
export const update_total_count = (count) => {
  console.log('uuuuuuuuuuuuu',count);
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_CHAT_COUNT,
      total_chat_count: count
    });
  };
};
export const updateChatMessage = (msg) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CHAT_MESSAGES,
      newMessages: {
        id: msg.id,
        chat_id: msg.chat_id,
        created_at: msg.created_at,
        customer_id: msg.customer_id,
        message: msg.message,
        chat_user: msg.chat_user
      },
    });
  };
};

export const createChat = (product, title, selectedcontacts) => {
  let state = false;
  let message = '';
  let chatmessage = null;
  let chats = null;
  let chatUser = null;
  // console.log(typeof product);
  // return;
  // console.log(JSON.stringify(selectedcontacts));
  // return;
  // console.log("Selected contacts json data ="+JSON.stringify({
  //   product_details: product_details,
  //   chatReceiver_mobile_no: selectedcontacts,
  //   title: title,
  // }));
  // return;
  let product_details = JSON.stringify(product);
  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/store';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        product_details: product_details,
        chatReceiver_mobile_no: selectedcontacts,
        title: title,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('created chat result is');
        console.log(resData);
        //console.log(resData.chats[0].chatUser);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        if(state){
        chatmessage = resData.chats[0].chatUser[1];
        chats = resData.chats[0];
        chatUser = resData.chats[0].chatUser;
        }else{
          alert(message);
        }
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      chatmessage: chatmessage,
      chats: chats,
      chatUser: chatUser
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getAllChats = () => {
  let state = false;
  let message = '';
  let chats = null;

  return async (dispatch, getState) => {
   // await dispatch(loadingActions.setprofileloader(true));

    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/getAllChats';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then(async (resData) => {
        console.log('All chats results are');
        console.log(resData);
        if (resData.status) {
          let chats = resData.chats;
          let t_count = 0;
          if (chats.length > 0) {
            chats.forEach(function (item) {
              t_count = t_count + item.customer_unread_message_count;
            });
          }
          dispatch({
            type: UPDATE_CHAT_COUNT,
            total_chat_count: t_count,
          });
          dispatch({
            type: SET_PREVIOUS_CHATS,
            previousChats: chats,
          });
        }
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        // state = resData.status;
        // message = resData.message;
        // chatmessage = resData.chatmessage
        // }
      //  await dispatch(loadingActions.setprofileloader(false));

      })
      .catch(async function (error) {
        // alert(error);
        console.log('Error', error);
       // await dispatch(loadingActions.setprofileloader(false));

        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getChatMessages = (chatId) => {
  let state = false;
  let message = '';
  let chatmessage = [];

  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';
    await dispatch(loadingActions.setprofileloader(true));

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/getAllChatMessage';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chat_id: chatId,
      }),
    })
      .then((res) => res.json())
      .then(async (resData) => {
        console.log('Chat Messages are');
        console.log(resData.chatmessage);
        chatmessageresult = resData.chatmessage;
        console.log("Message Length is =" + chatmessageresult.length)
        // setCurrentMesssageIndex((chatmessageresult.length)-1);
        const previousMessages = [];
        for (const key in chatmessageresult) {
          previousMessages.push(

            new ChatMessage(
              chatmessageresult[key].id,
              chatmessageresult[key].chat_id,
              chatmessageresult[key].created_at,
              chatmessageresult[key].customer_id,
              chatmessageresult[key].message,
              chatmessageresult[key].chat_user,
            )
          );
        }
        dispatch({
          type: SET_CHAT_MESSAGES,
          previouschatMessages: previousMessages,
        });

        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        // state = resData.status;
        // message = resData.message;
        // chatmessage = resData.chatmessage
        // }
        await dispatch(loadingActions.setprofileloader(false));

      })
      .catch(async function (error) {
        await dispatch(loadingActions.setprofileloader(false));

        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const sendMessages = (chatId, chatMessage, currentId) => {
  let state = false;
  let message = '';
  let chatmessage = [];

  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/sendMessage';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chat_id: chatId,
        message: chatMessage,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('send message result is');
        console.log(resData);
        let msg = resData.chatMessage;
        dispatch({
          type: UPDATE_CURRENT_MESSAGE,
          currentId: currentId,
          newMessages: {
            id: msg.id,
            chat_id: msg.chat_id,
            created_at: msg.created_at,
            customer_id: msg.customer_id,
            message: msg.message,
            chat_user: msg.chat_user
          },
        });
        // dispatch({
        //   type: UPDATE_CHAT_MESSAGES,
        //   newMessages: {
        //     id : msg.id,
        //    chat_id : msg.chat_id,
        //    created_at : msg.created_at,
        //    customer_id : msg.customer_id,           
        //    message : msg.message,
        //    chat_user:msg.chat_user
        //   },
        // });


      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getChatUserList = (chatId) => {
  let state = false;
  let message = '';
  let chatUsers = [];
  console.log("fn entered")
  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/getChatUserList';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chat_id: chatId,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('send message result is');
        console.log(resData);
        state = resData.status;
        message = resData.message;
        chatUsers = resData.chatUsers;

      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      chatUsers: chatUsers
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const addUserToChat = (chatId, selectedcontacts) => {
  let state = false;
  let message = '';
  let chatUsers = '';
  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';
    console.log(JSON.stringify({
      chatReceiver_mobile_no: selectedcontacts,
      chat_id: chatId,
    }));
    // return;
    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/addUserToChat';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chatReceiver_mobile_no: selectedcontacts,
        chat_id: chatId,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('addUserToChat is');
        console.log(resData);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        chatUsers = resData.chatUsers;
        // chatmessage = resData.chatmessage
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      chatUsers: chatUsers
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const deleteUser = (chatId, chat_user_id) => {
  let state = false;
  let message = '';

  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';
    console.log(JSON.stringify({
      chat_id: chatId,
      chat_user_id: chat_user_id
    }));
    // return;
    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/deleteUserFromChat';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chat_id: chatId,
        chat_user_id: chat_user_id
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('delete User contact is');
        console.log(resData);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        // chatmessage = resData.chatmessage
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const deleteChat = (chat_id) => {
  let state = false;
  let message = '';

  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    // return;
    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/delete';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chat_id: chat_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('deleted chat is');
        console.log(resData);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        // chatmessage = resData.chatmessage
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const deleteChatMessages = (chat_id, chat_message_ids) => {
  let state = false;
  let message = '';

  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    // return;
    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/deleteChatMessages';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        chat_id: chat_id,
        chat_message_ids: chat_message_ids,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('deleted chat is');
        console.log(resData);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        // chatmessage = resData.chatmessage
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      // chatmessage:chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getUnOpenedChatscount = () => {
  let state = false;
  let message = '';
  let result = null;

  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.api + 'customer/chat/getUnOpenedChatscount';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('getUnOpenedChatscount is');
        console.log(resData);
        result = resData;
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      result: result
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};