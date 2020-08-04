  // src/js/actions/index.js
  import { ADD_ARTICLE, ADD_TODO } from "../Redux/constants/action-types";

  export function addArticle(payload) {
    return { type: "ADD_ARTICLE", payload }
  };