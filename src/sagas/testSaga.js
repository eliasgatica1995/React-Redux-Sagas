import {delay, take, put, call, fork, takeEvery, cancelled, cancel} from 'redux-saga/effects'

function double(number){
    return number * 2;
}
//prueba de call
export function* testSaga(){
    while (true){
    console.log("Starting saga");
    const state = yield take('TEST_MESSAGE');
    const a = yield call(double,2);
    const b = yield double(3);
    console.log(a);
    console.log(b);
    console.log("Finish saga ", state);
    }
}
//dispatch
export function* dispatchTest(){
    let index = 0;
    yield put ({type: 'TEST_MESSAGE_6', payload : index});

    /*
    while (true){
        yield delay(500);
        yield put ({type: 'TEST_MESSAGE_4', payload : index});
        index++;
    }*/
} 
//prueba de takeEvery

export function* testSagaTakeEvery(){
    const {payload} =yield takeEvery('TEST_MESSAGE_5',testSagaTakeEveryProcess)
    console.log(`Termina take every para indice ${payload}`)
}


export function* testSagaTakeEveryProcess({payload}){
    console.log(`Empieza proceso para indice ${payload}`);
    yield delay(3000);
    console.log(`Termina proceso para indice ${payload}`);

}
/*
//prueba de cancel y cancelled

export function* infinitySaga(){
    console.log('Empieza infinity Saga');
    while (true){
        try {
            console.log('Adentro del loop');
            yield delay(500);
        } catch (error) {
            console.log('Error ',error);
        }
        finally{
            console.log('Fork cancelado? ',yield cancelled());
        }
        
    }
    console.log('Termina infinity Saga');
}
export function* testSagaCancelled(){
    yield take ('TAKE_MESSAGE_44');
    const handleCancel = yield fork(infinitySaga);
    yield delay(3000);
    yield cancel(handleCancel);
}

*/

//prueba de delay
function* doNothing(){
    console.log('Called');
    yield delay(1000);
    console.log('Time');
}
//prueba fork
export function* testSagaFork(){
    while (true){
        yield take('TEST_MESSAGE_2')
        yield delay(5000);
        yield fork(doNothing);
        yield fork(doNothing);
        yield fork(doNothing);
    }
}
