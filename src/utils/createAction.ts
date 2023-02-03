export default function createAction<P = undefined, M = {}>(type: string) {
  return function actionCreator(payload?: P, meta?: M) {
    return {
      type,
      payload,
      meta
    };
  };
}
