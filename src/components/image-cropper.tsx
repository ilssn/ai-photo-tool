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
    const [imageRatio, setImageRatio] = React.useState(0)
    const [ratio, setRatio] = React.useState<null | Number>(null)

    // :src
    React.useEffect(() => {
        if (cropperRef.current) {
            cropperRef.current.refresh();
        }
        const img = new Image()
        img.src = src
        img.onload = () => {
            setImage(img)
            setImageRatio(img.width / img.height)
        }
        img.onerror = () => {
            console.log('Load image error')
        }
    }, [src]);

    // ratio
    React.useEffect(() => {
        if (cropperRef.current) {
            if (payload.ratio) {
                setRatio(payload.ratio)
            } else {
                setRatio(imageRatio)
                setTimeout(() => {
                    setRatio(0)
                }, 20)

            }
            setTimeout(() => {
                cropperRef.current.zoomImage(0.1); // zoom-in 
            }, 30)
        }
    }, [payload.ratio])

    const onChange = (cropper: CropperRef) => {
        // console.log(cropper.getCoordinates(), cropper.getCanvas());
        // const result = cropper.getCanvas()?.toDataURL()
        setPayload((preData: any) => { return { ...preData, canvas: cropper.getCanvas() } });
    };



    return (
        <Cropper
            ref={cropperRef}
            className='cropper !text-primary rounded-xl w-full h-full'
            src={src}
            onChange={onChange}
            stencilProps={{
                aspectRatio: ratio || {
                    minimum: 1 / 16,
                    maximum: 16 / 1,
                },

                movable: false,
                // resizable: false
            }}
        />
    )
};

export default ImageCropper;