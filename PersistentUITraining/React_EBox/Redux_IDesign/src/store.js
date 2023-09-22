import { configureStore } from "@reduxjs/toolkit";
import { handleItem } from "./reducers";

export default configureStore({
  reducer: {
    handleItem,
  },
});
