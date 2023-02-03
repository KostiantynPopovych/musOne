const devConsole = new Proxy(console, {
  get(target: Console, prop: keyof Console) {
    if (process.env.NODE_ENV !== 'development') {
      return () => {};
    }

    return target[prop];
  }
});

export default devConsole;
