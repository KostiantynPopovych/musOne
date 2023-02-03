import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import sounds, { SoundsState } from 'store/sounds/reducer';

export interface RootState {
  form: FormStateMap;
  router: RouterState;

  sounds: SoundsState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form,

    sounds
  });
}
