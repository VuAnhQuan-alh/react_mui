import { VideoContext, type VideoContextValue } from '@/contexts/Videos';
import { useContext } from 'react';

const useVideo = (): VideoContextValue => {
  const videoContext = useContext(VideoContext);

  if (!videoContext) {
    throw new Error('Forgot to warp component in VideoContext');
  }

  return videoContext;
};

export default useVideo;
