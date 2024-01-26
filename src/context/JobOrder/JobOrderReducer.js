export const GET_OPENITEMS = "GET_OPENITEMS";
export const ADD_JO = "ADD_JO";
export const GET_JO = "GET_JO";
export const EDIT_JO = "EDIT_JO";
export const DELETE_JO = "DELETE_JO";
export const GET_JOPRODUCEDQTY = "GET_JOPRODUCEDQTY";
export const ADD_JOPRODUCEDQTY = "ADD_JOPRODUCEDQTY";
export const DELETE_JOPRODUCEDQTY = "DELETE_JOPRODUCEDQTY";
export const CLOSE_JOBORDER = "CLOSE_JOBORDER";

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case GET_OPENITEMS:
      return {
        ...state,
        openItems:
          payload.page > 1
            ? state.openItems.concat(payload.openItems)
            : payload.openItems,
        openItemsLength: payload.openItemsLength,
        customers: payload.customers,
      };
    case ADD_JO:
      return {
        ...state,
        joSeries: payload.joSeries,
        openItems: payload.newOpenItems,
        openItemsLength:
          payload.remainingQty < 1 ? state.openItems - 1 : state.openItems,
      };
    case EDIT_JO:
      return {
        ...state,
        joList: state.joList.map((data) => {
          const itemIndex = payload.updatedJos.findIndex(
            (val) => val.id === data.id
          );

          if (itemIndex !== -1) return payload.updatedJos[itemIndex];
          else return data;
        }),
      };
    case DELETE_JO:
      return {
        ...state,
        joList: state.joList
          .filter((data) => data.id !== payload.id)
          .map((data) => {
            //remove deleted item then map through the remaining to update remaining values of jo for updates
            const itemIndex = payload.updatedJos.findIndex(
              (val) => val.id === data.id
            );

            if (itemIndex !== -1) return payload.updatedJos[itemIndex];
            else return data;
          }),
        joListLength: state.joListLength - 1,
      };
    case GET_JO:
      return {
        ...state,
        joList:
          payload.page > 1
            ? state.joList.concat(payload.joList)
            : payload.joList,
        joListLength: payload.joListLength,
        customers: payload.customers,
      };
    case GET_JOPRODUCEDQTY:
      return {
        ...state,
        joProduced: payload.joProduced,
      };
    case ADD_JOPRODUCEDQTY:
      return {
        ...state,
        joProduced: [payload.newProduced, ...state.joProduced],
        joList: [
          ...state.joList.slice(
            0,
            state.joList.findIndex((data) => data.id === payload.updatedJo.id)
          ),
          { ...payload.updatedJo },
          ...state.joList.slice(
            state.joList.findIndex((data) => data.id === payload.updatedJo.id) +
              1
          ),
        ],
      };
    case DELETE_JOPRODUCEDQTY:
      return {
        ...state,
        joProduced: state.joProduced.filter((data) => data.id !== payload.id),
        joList: [
          ...state.joList.slice(
            0,
            state.joList.findIndex((data) => data.id === payload.updatedJo.id)
          ),
          { ...payload.updatedJo },
          ...state.joList.slice(
            state.joList.findIndex((data) => data.id === payload.updatedJo.id) +
              1
          ),
        ],
      };
    case CLOSE_JOBORDER:
      return {
        ...state,
        joList: [
          ...state.joList.slice(
            0,
            state.joList.findIndex((data) => data.id === payload.updatedJo.id)
          ),
          { ...payload.updatedJo },
          ...state.joList.slice(
            state.joList.findIndex((data) => data.id === payload.updatedJo.id) +
              1
          ),
        ],
      };
    default:
      return state;
  }
};
