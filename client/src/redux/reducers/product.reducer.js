const initialState = {
  items: [],
  selectedProduct: {},
  filteredProducts: {}
}

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_PRODUCT':
      return {
        ...state,
        selectedProduct: payload
      }

    case 'GET_PRODUCTS':
      return {
        ...state,
        items: payload.products,
        filteredProducts: payload.filteredProducts
      }

    case 'RATE_PRODUCT':
      const productIndex = state.items.findIndex(p => p._id === payload.productId)

      return {
        ...state,
        items: state.items.map((item, index) => {
          if (index !== productIndex) return item

          return {
            ...item,
            totalRating: payload.totalRating,

            ratings: [...payload.ratings]
          }
        })
      }

    case 'ADD_COMMENT':
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          comments: [...state.selectedProduct.comments, payload]
        }
      }

    case 'UPDATE_COMMENT':
      const { comment, commentIndex } = payload

      const updatedComment = {
        ...state.selectedProduct.comments[commentIndex],
        comment
      }

      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          comments: [
            ...state.selectedProduct.comments.slice(0, commentIndex),
            updatedComment,
            ...state.selectedProduct.comments.slice(commentIndex + 1)
          ]
        }
      }

    case 'DELETE_COMMENT':
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          comments: [...state.selectedProduct.comments.filter(c => c._id !== payload.comment_id)]
        }
      }

    default:
      return state
  }
}

export default productReducer
