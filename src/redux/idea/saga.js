import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../helpers/Utils";

import { IDEA_GET_LIST, IDEA_ADD_ITEM, IDEA_EDIT_ITEM, VOTE_UP, VOTE_DOWN,IDEA_DELETE } from "../actions";

import {
  getIdeaListSuccess,
  getIdeaListError,
  addIdeaItemSuccess,
  addIdeaItemError,
  editIdeaItemSuccess,
  editIdeaItemError,
  voteUpError,
  voteUpSuccess,
  voteDownSuccess,
  voteDownError,
  deleteIdeaSuccess,
  deleteIdeaError
} from "./actions";
import { store } from "../../helpers/Firebase";

const getIdeaListRequest = async (boardId) => {
  let res = await store
    .collection("ideas")
    .get()
    .then(querySnapshot => {
      let result = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      if (result.length === 0) return [];
      else return result;
    });

  let ideas = res.filter(item=>item.boardId === boardId)
  return ideas;
};

function* getIdeaListItems(action) {
   try {
    const response = yield call(getIdeaListRequest, action.payload);
    yield put(getIdeaListSuccess(response));
  } catch (error) {
    yield put(getIdeaListError(error));
  }
}

const addIdeaItemRequest = async item => {
    item.createDate = getDateWithFormat();
  item.updateDate = getDateWithFormat();
   await store.collection("ideas").add(item);
   return item;
};

function* addIdeaItem({ payload }) {
  try {
    const response = yield call(addIdeaItemRequest, payload);
     yield put(addIdeaItemSuccess(response));
  } catch (error) {
    yield put(addIdeaItemError(error));
  }
}
const editIdeaItemRequest = async item => {
 
  item.updateDate = getDateWithFormat();
   let idea_collection = store.collection('ideas').doc(item.id);
  var data = Object.assign({}, item);
  delete data.id; 
  
  idea_collection.get().then(function(thisdoc){
     if(thisdoc.exists){
      idea_collection.update(data);
      }
   })
  return item;
};

function* editIdeaItem({ payload }) {
   try {
    const response = yield call(editIdeaItemRequest, payload);
    yield put(editIdeaItemSuccess(response));
  } catch (error) {
    yield put(editIdeaItemError(error));
  }
}

function* voteUpSaga({ payload }) {
  console.log("sata", payload)
  try {
    const response = yield call(voteUpRequest, payload);
     yield put(voteUpSuccess(response));
  } catch (error) {
    yield put(voteUpError(error));
  }
}
const voteUpRequest = async payload => {
  let idea_collection = store.collection('ideas').doc(payload.ideaid);
  
  idea_collection.get().then(function(thisdoc){
     if(thisdoc.exists){
      let temp = thisdoc.data();
      temp.likeUsers.push(payload.userid)
      idea_collection.update(temp);
      }
   })
  return payload;
};
function* voteDownSaga({ payload }) {
  try {
    const response = yield call(voteDownRequest, payload);
     yield put(voteDownSuccess(response));
  } catch (error) {
    yield put(voteDownError(error));
  }
}
const voteDownRequest = async payload => {
  let idea_collection = store.collection('ideas').doc(payload.ideaid);
  
  idea_collection.get().then(function(thisdoc){
     if(thisdoc.exists){
      let temp = thisdoc.data();
      temp.likeUsers = temp.likeUsers.filter(item => item !== payload.userid)
      idea_collection.update(temp);
      }
   })
  return payload;
};
function* deleteIdea({ payload }) {
  try {
    const response = yield call(deleteIdeaRequest, payload);
     yield put(deleteIdeaSuccess(response));
  } catch (error) {
    yield put(deleteIdeaError(error));
  }
}
const deleteIdeaRequest = async payload => {
  await store.collection('ideas').doc(payload).delete();
  return payload;
};
 
export function* watchGetList() {
  yield takeEvery(IDEA_GET_LIST, getIdeaListItems);
}

export function* watchAddItem() {
  yield takeEvery(IDEA_ADD_ITEM, addIdeaItem);
}

export function* watchEditItem() {
  yield takeEvery(IDEA_EDIT_ITEM, editIdeaItem);
}
export function* wathcVoteUp() {
   yield takeEvery(VOTE_UP, voteUpSaga);
}

export function* watchVoteDown() {
  yield takeEvery(VOTE_DOWN, voteDownSaga);
}
export function* watchDeleteIdea() {
  yield takeEvery(IDEA_DELETE, deleteIdea);
}
export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem),fork(watchEditItem),fork(wathcVoteUp),fork(watchVoteDown),fork(watchDeleteIdea)]);
}
