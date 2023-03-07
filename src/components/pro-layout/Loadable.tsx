import nProgress from 'nprogress';
import { Suspense, lazy, useEffect } from 'react';

interface Props {
  [key: string]: any;
}
type LazyComponent = ReturnType<typeof lazy>;

const LazyLoad = () => {
  nProgress.configure({ showSpinner: false });

  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
    };
  }, []);

  return null;
};

const Loadable = (Component: LazyComponent) => (props: Props) => {
  return (
    <Suspense fallback={<LazyLoad />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
