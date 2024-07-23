import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css'

interface PropsData {
    src: string
    setSrc: (src: string) => void
    setPayload: (data: any) => void
}

const ImageCropper = ({ src, setSrc, setPayload }: PropsData) => {
    const cropperRef = React.useRef<any>(null);

    React.useEffect(() => {
      if (cropperRef.current) {
        cropperRef.current?.cropper.reset().clear().replace(src);
      }
    }, [src]);

    const onChange = (cropper: CropperRef) => {
        // console.log(cropper.getCoordinates(), cropper.getCanvas());
        // const result = cropper.getCanvas()?.toDataURL()
        setPayload((preData: any) => { return { ...preData, canvas: cropper.getCanvas() } });
    };

    return (
        <Cropper
            src={src}
            onChange={onChange}
            className={'cropper'}
        />
    )
};

export default ImageCropper;