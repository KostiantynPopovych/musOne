import { RootState } from 'app/redux/createRootReducer';
import { createSelector, Selector } from 'reselect';

export default function subSelectorCreator<SubState>(
  storeSelector: (state: RootState) => SubState
) {
  return function createSubSelector<R>(subSelector: Selector<SubState, R>) {
    return createSelector(storeSelector, subSelector);
  };
}
