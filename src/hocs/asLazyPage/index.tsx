import React, { ComponentType, lazy, memo, ReactNode, Suspense } from 'react';

export default function asLazyPage(
  lazyFactory: () => Promise<{ default: ComponentType }>,
  fallback: ReactNode = <>Loading...</>
) {
  // region *******************************DATA*********************************
  const LazyComponent = lazy(lazyFactory);
  // endregion

  // region ********************************JSX*********************************
  return memo(({ ...props }) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  ));
  // endregion
}
