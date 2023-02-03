import subSelectorCreator from 'utils/subSelectorCreator';

import { SoundsState } from './reducer';

const createSoundsSelector = subSelectorCreator<SoundsState>(
  state => state.sounds
);

const SoundsSelectors = {
  getSounds: createSoundsSelector(({ sounds }) => sounds),
  getSelectedSounds: createSoundsSelector(({ selected }) => selected)
};

export default SoundsSelectors;
