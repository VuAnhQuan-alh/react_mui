import { baseURL } from '@/config';
import useStorage from './useStorage';
// import { useState } from 'react';

const useUpload = () => {
  // const [message, setMessage] = useState<string | null>(null);
  const [jwt] = useStorage('jwt');

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('files', file, file.name);

      const response = await fetch(baseURL + '/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const info = await response.json();
        return info[0];
      }
    } catch (error) {
      console.log('upload: ', error);
    }
  };

  return [handleUpload] as const;
};

export default useUpload;
