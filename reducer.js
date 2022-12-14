export const initialState = {
  basket: [],
  user: null,
  amazonItems: [],
  activeCategory: "All",
  searchExpertText: "",
  mobileViewShowDashboard: false,
  isSomeOneCallingForMeeting: false,
  callIsAnsweredOutsideVideoPage: false,
};

//Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id :${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SOMEONE_CALLING_FOR_MEETING":
      return {
        ...state,
        isSomeOneCallingForMeeting: action.isSomeOneCallingForMeeting,
      };
    case "SET_CALL_ANSWERED_OUTSIDE_VIDEO_PAGE":
      return {
        ...state,
        callIsAnsweredOutsideVideoPage: action.callIsAnsweredOutsideVideoPage,
      };
    case "SET_ACTIVE_CATEGORY":
      return {
        ...state,
        activeCategory: action.activeCategory,
      };
    case "SET_MOBILE_VIEW_SHOW_DASH":
      return {
        ...state,
        mobileViewShowDashboard: action.mobileViewShowDashboard,
      };

    case "SET_SEARCH_EXPERT_TEXT":
      return {
        ...state,
        searchExpertText: action.searchExpertText,
      };
    case "EDIT_AMAZON_ITEMS":
      return {
        ...state,
        amazonItems: action.amazonItems,
      };
    case "RESET_AMAZON_ITEMS":
      return {
        ...state,
        amazonItems: amazonItemsData,
      };

    default:
      return state;
  }
};
export default reducer;
