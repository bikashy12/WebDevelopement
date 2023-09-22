import {
  SET_CURRENT_SUB_CAHANNEL,
  SET_PREVIOUS_CHATS,
  RESET_ALL_SUBSCRIPTION_CAHANNEL,
  SET_CHAT_MESSAGES,
  UPDATE_CHAT_MESSAGES,
  RELOAD_CHAT_MESSAGES,
  UPDATE_CURRENT_MESSAGE,
  UPDATE_CHAT_COUNT,

  // SET_CURRENT_MESSAGE_INDEX
} from "../actions/chat";
import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";
import ChatMessage from "../../models/chat-message";



const initialState = {
  currentSubscriptionChannel: "",
  subscribedChannels: [],
  previousChats: [],
  previouschatMessages: [],
  reloadChatMessages: false,
  currentMessageIndex: 0,
  total_chat_count:0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_SUBSCRIPTION_CAHANNEL:
      // console.log("Subcsriptions Reset");
      return {
        ...state,
        currentSubscriptionChannel: "",
        subscribedChannels: [],
        // currentOrderId: 0,
      };
    case SET_DID_TRY_AL:
    case AUTHENTICATE:
    case LOGOUT:
      console.log("Order Reset");
      return {
        ...initialState,
        subscribedChannels: [],
        previousChats: [],
      };
    case RELOAD_CHAT_MESSAGES: {
      console.log('RELOAD_CHAT_MESSAGES,' + state.reloadChatMessages);
      return {
        ...state,
        reloadChatMessages: !state.reloadChatMessages,
      };
    }
    case UPDATE_CHAT_COUNT: {
      console.log('UPDATE_CHAT_COUNT,' + action.total_chat_count);
      return {
        ...state,
        total_chat_count: action.total_chat_count,
      };
    }
    // case SET_CURRENT_MESSAGE_INDEX: {
    //   return {
    //     ...state,
    //     currentMessageIndex: action.messageIndex,
    //   };
    // }
    case SET_CURRENT_SUB_CAHANNEL: {
      let currentSubscribedChannels = state.subscribedChannels;
     
      let selectedIndex = -1;
      if (currentSubscribedChannels.length > 0) {
        selectedIndex = currentSubscribedChannels.findIndex(
          (subscriptionChannel) => subscriptionChannel === action.channelName
        );
      }
      if (selectedIndex === -1) {
        currentSubscribedChannels.push(action.channelName);
        // console.log("Channel Added", currentSubscribedChannels);
      }

      return {
        ...state,
        subscribedChannels: currentSubscribedChannels,
        currentSubscriptionChannel: action.channelName,
      };
    }
    case UPDATE_CHAT_MESSAGES:
     
       console.log("newMessages "+JSON.stringify(action.newMessages))
     // let newOrderMessages = [];

      const newOrderMessage = new ChatMessage(
        action.newMessages.id,
        action.newMessages.chat_id,
        action.newMessages.created_at,
        action.newMessages.customer_id,
        action.newMessages.message,
        action.newMessages.chat_user,
      );
      console.log("New Text Message");
     // newOrderMessages.push(newOrderMessage);
     // newOrderMessages = newOrderMessages.reverse();
      return {
        ...state,
        // chatMessages: newMessages.push(state.chatMessages),
      //  chatMessages: newOrderMessages.concat(state.chatMessages)
      previouschatMessages:[...state.previouschatMessages,newOrderMessage]

      };
    case UPDATE_CURRENT_MESSAGE:
      console.log("current Id is"+action.currentId);
      console.log("--------------------------------------");
      const enquiryItemIndex = state.previouschatMessages.findIndex(
        (enquiryItem) => enquiryItem.id === action.currentId
      );
        console.log("enquiryItemIndex "+enquiryItemIndex+"newMessages"+JSON.stringify(action.newMessages))
      // let newOrderMessages = [];
 
       const currentMsg = new ChatMessage(
        action.newMessages.id,
        action.newMessages.chat_id,
        action.newMessages.created_at,
        action.newMessages.customer_id,
        action.newMessages.message,
        action.newMessages.chat_user,
        
      );
       console.log("New Text Message");
      // currentMsgs.push(newOrderMessage);
      // newOrderMessages = newOrderMessages.reverse();
      const updatedPreviouschats = [...state.previouschatMessages];
      updatedPreviouschats[enquiryItemIndex] = currentMsg;
       return {
         ...state,
         // chatMessages: newMessages.push(state.chatMessages),
       //  chatMessages: newOrderMessages.concat(state.chatMessages)
      //  previouschatMessages:[...state.previouschatMessages,newOrderMessage]
      previouschatMessages:updatedPreviouschats
 
       };
       
    
      case SET_PREVIOUS_CHATS:
        return {
          ...state,
          previousChats: action.previousChats,
        };
    case SET_CHAT_MESSAGES:
      // console.log(chatMessages);
        return {
          ...state,
          previouschatMessages: action.previouschatMessages,
        };
    
    }
    
    
    
  return state;
};
