const initialState = {
  interesting: [],
  featured: [],
  hot: [],
  week: [],
  month: [],
  tfeatured: []
};

// --- Action Types --- //
const UPDATE = "UPDATE";

// --- Reducer --- //

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

// --- Action Creators --- //
export function update_home(data) {
  return {
    type: UPDATE,
    payload: data
  };
}
