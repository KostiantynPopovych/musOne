import { combineReducers } from 'redux';

import { SOUNDS_ACTION_TYPES } from './actions';

export interface SoundsState {
  sounds: Nullable<Sound[]>;
  selected: Nullable<Sound | Sound[]>;
}

const sounds = combineReducers<SoundsState>({
  sounds(state = null, { type, payload }) {
    switch (type) {
      case SOUNDS_ACTION_TYPES.SET_SOUNDS:
        return payload ?? null;
      default:
        return state;
    }
  },
  selected(state = null, { type, payload }) {
    switch (type) {
      case SOUNDS_ACTION_TYPES.SET_SELECTED:
        return payload ?? null;
      default:
        return state;
    }
  }
});

export default sounds;
