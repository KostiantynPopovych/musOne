import createAction from 'utils/createAction';

const SOUNDS = {
  SET_SOUNDS: 'SOUNDS.SET_SOUNDS',
  SET_SELECTED: 'SOUNDS.SET_SELECTED'
};

const SoundsActions = {
  setSounds: createAction<Sound[]>(SOUNDS.SET_SOUNDS),
  setSelected: createAction<Sound | Sound[]>(SOUNDS.SET_SELECTED)
};

export { SOUNDS as SOUNDS_ACTION_TYPES, SoundsActions };
