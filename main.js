console.log(window.Redux);

const { createStore } = window.Redux;

// SETUP REDUX STORE
// state
// reducer
// store

const initState = JSON.parse(localStorage.getItem("hobbyList")) || [];

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_HOBBY_ITEM": {
      const newList = [...state];
      newList.push(action.payload);
      return newList;
    }
    default:
      return state;
  }
};

const store = createStore(rootReducer);

// -------------

// RENDER HOBBY LIST

const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || !hobbyList.length) return;

  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return;
  // reset previos content of ul
  ulElement.innerHTML = "";

  for (const hobby of hobbyList) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
};

// RENDER INIT HOBBYLIST
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector("#hobbyFormId");
if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    //prevent borwer from reloading
    e.preventDefault();

    const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextId");
    if (!hobbyTextElement) return;
    const action = {
      type: "ADD_HOBBY_ITEM",
      payload: hobbyTextElement.value,
    };
    store.dispatch(action);

    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  console.log("STATE UPDATE", store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);
  localStorage.setItem("hobbyList", JSON.stringify(newHobbyList));
});
