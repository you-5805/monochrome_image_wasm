'use client';

import { ChangeEventHandler, useEffect, useId, useState } from 'react';
import dynamic from 'next/dynamic';

const loadImageData = async (inputImageFile) => {
  const fileReader = new FileReader();
  return new Promise<Uint8Array>((resolve, reject) => {
    fileReader.onload = ({ target: { result } }) => {
      if (typeof result === 'string') {
        reject(new Error('FileReader result is not an ArrayBuffer'));
        return;
      }

      resolve(new Uint8Array(result));
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsArrayBuffer(inputImageFile);
  });
};

const Form = dynamic(
  {
    loader: async () => {
      console.log('============');
      const initWasm = await import('monochrome-image/monochrome_image_bg.wasm');

      const { monochrome_image } = initWasm;

      const [imageUrl, setImageUrl] = useState('');

      const fieldId = useId();

      const onChange = (async ({ target: { files } }) => {
        const file = files[0];
        if (!(file instanceof File)) {
          alert('File not found');
          return;
        }

        const inputImageData = await loadImageData(file);
        const monochromeImageData = monochrome_image(inputImageData);

        const blob = new Blob([monochromeImageData], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }) satisfies ChangeEventHandler<HTMLInputElement>;

      useEffect(() => {
        initWasm.default();
      }, []);

      return () => {
        return (
          <>
            <label htmlFor={fieldId}></label>
            <input id={fieldId} type='file' onChange={onChange} />

            <hr />

            {imageUrl && <img src={imageUrl} alt='uploaded url' />}
          </>
        );
      };
    },
  },
  { ssr: false },
);

export default function Page() {
  return <Form />;
}
