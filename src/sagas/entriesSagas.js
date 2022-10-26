import axios from "axios";
import { take, call, put, fork } from "redux-saga/effects"
import entriesTypes, { populateEntries, populateEntryDetails } from '../actions/entries.actions';


export function* getAllEntries(){
    yield take(entriesTypes.GET_ENTRIES);
    console.log('I need entries');
    const result = yield call(axios,'http://localhost:3005/entries');
    yield put(populateEntries(result.data));
}

export function* getEntriesDetails(id){
    const {data} = yield call(axios, `http://localhost:3005/values/${id}`);
    //yield put ({type: entriesTypes.POPULATE_ENTRY_DETAILS, payload: {id,entry:data}});
    yield put (populateEntryDetails(id,data));

}

export function* getAllEntriesDetails(){
    const {payload}= yield take(entriesTypes.POPULATE_ENTRIES)
    for (let index = 0; index < payload.length; index++) {
        const entry = payload[index];
        yield fork(getEntriesDetails,entry.id);
    }
}