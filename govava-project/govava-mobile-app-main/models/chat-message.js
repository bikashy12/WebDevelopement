import moment from 'moment';

class ChatMessage {
  constructor(
    id,
    chat_id,
    created_at,
    customer_id,
    message,
    chat_user
  ) {
    this.id = id;
    this.chat_id = chat_id;
    this.created_at = created_at;
    this.customer_id = customer_id;
    this.message = message;
    this.chat_user=chat_user;
  }
  get readableDate() {
    return moment(this.created_at).format('MMMM Do YYYY, hh:mm');
  }
  get readableTime() {
    // return moment(this.date).format('LT');
    return moment(this.created_at).format('hh:mm a');
  }
}

export default ChatMessage;
