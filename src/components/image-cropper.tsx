import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css'

interface PropsData {
    src: string
    setSrc: (src: string) => void
    payload: any,
    setPayload: (data: any) => void
}

const ImageCropper = ({ src, setSrc, payload, setPayload }: PropsData) => {
    const cropperRef = React.useRef<any>(null);
    const [image, setImage] = React.useState<any>(null)
    const [ratio, setRatio] = React.useState<null | Number>(null)

    React.useEffect(() => {
        if (cropperRef.current) {
            cropperRef.current?.cropper.reset().clear().replace(src);
            //
            cropperRef.current.refresh();
        }
        const img = new Image()
        img.src = src
        img.onload = () => {
            setImage(img)
        }
        img.onerror = () => {
            console.log('Load image error')
        }
    }, [src]);

    React.useEffect(() => {
        console.log('ratfio:::', payload.ratio)
        if (cropperRef.current) {
            cropperRef.current.refresh();
        }
        if (payload.ratio) {
            setRatio(payload.ratio)
        } else {
            if (image) {
                setRatio(image.width / image.height)
                setTimeout(() => {
                    setRatio(null)
                }, 100)
            }

        }
    }, [payload.ratio])

    const onChange = (cropper: CropperRef) => {
        // console.log(cropper.getCoordinates(), cropper.getCanvas());
        // const result = cropper.getCanvas()?.toDataURL()
        setPayload((preData: any) => { return { ...preData, canvas: cropper.getCanvas() } });
    };



    return (
        <Cropper
            className='cropper !text-primary rounded-xl w-full h-full'
            src={src}
            onChange={onChange}
            stencilProps={{
                aspectRatio: ratio || {
                    minimum: 1 / 16,
                    maximum: 16 / 1,
                },

                // aspectRatio: null,
                // movable: false,
                // resizable: false
            }}
        // defaultSize={defaultSize}
        />
    )
};

export default ImageCropper;