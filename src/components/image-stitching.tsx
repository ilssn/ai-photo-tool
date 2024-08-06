'use client'
import ImageManager from "@/utils/Image";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Image as Img, Transformer, KonvaNodeComponent } from "react-konva";
// import { imageToFile } from "@/app/ecom1/handler";

interface ImageEditorProps {
  src: string
  setSrc: (src: string) => void
  payload: any,
  setPayload: (data: any) => void
}

const ImageStitching: React.FC<ImageEditorProps> = ({ src, setSrc, payload, setPayload }) => {
  const containerRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const imageRef1 = useRef<any>(null);
  const trRef = useRef<any>(null);
  const trRef1 = useRef<any>(null);

  const [scale, setScale] = useState(0.2);
  const [rotation, setRotation] = useState(0);
  const [imageDrag, setImageDrag] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null)


  const handleTransform = () => {
    if (trRef.current && imageRef.current) {
      trRef.current.setNode(imageRef.current);
      trRef.current.getLayer()?.batchDraw();
    }
  };

  const handleTransform1 = () => {
    if (trRef1.current && imageRef1.current) {
      trRef1.current.setNode(imageRef1.current);
      trRef1.current.getLayer()?.batchDraw();
    }
  };

  // resize
  useEffect(() => {
    setContainerWidth(10)
    const handleResize = () => {
      if (containerRef.current && payload.ratio) {
        setTimeout(() => {
          const newWidth = containerRef.current.offsetWidth
          setContainerWidth(newWidth);
          if (image?.width) {
            const conWidth = Number(newWidth)
            const imgWidth = Number(image.width)
            const imgScale = (conWidth - 200) / imgWidth
            setScale(imgScale)
            handleTransform()
            handleActionDone()
          }
        }, 30)
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化时获取容器宽度

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [image, payload.ratio]);



  useEffect(() => {
    // hook
    const img = new Image()
    img.onload = () => {
      setImage(img)
      if (img) {
        const ratio = img.width / img.height
        setPayload((preData: any) => { return { ...preData, ratio } });
      }
    }
    img.src = src
  }, [src])


  const handleActionDone = async () => {
    if (!stageRef.current) return
    setImageDrag(false)
    setTimeout(async () => {
      const local = stageRef.current.toDataURL({ pixelRatio: 2 });
      setPayload((preData: any) => { return { ...preData, mask: local } });
      setImageDrag(true)
      await ImageManager.loadImage(local)
    }, 30)
  }


  if (!image) return null

  return (
    <div ref={containerRef}
      id="image-stitching"
      className="w-full h-full overflow-hidden"
      // onMouseEnter={() => setImageDrag(true)}
      onMouseUp={() => handleActionDone()}
      onTouchEnd={() => handleActionDone()}
    >
      <div className=" w-full relative overflow-hidden bg-white border-[1px] border-solid border-[rgba(222,222,222,1)] rounded-2xl shadow-sm">
        {payload.ratio &&
          <Stage
            ref={stageRef}
            width={Math.floor(containerWidth)}
            height={Math.floor(containerWidth / payload.ratio)}
            className="w-full"
          >

            <Layer>
              <Rect
                width={Math.floor(containerWidth)}
                height={Math.floor(containerWidth / payload.ratio)}
                fill="#ffffff"
              />
            </Layer>

            <Layer>
              <Img
                image={image}
                ref={imageRef}
                draggable
                rotation={rotation}
                scaleX={scale}
                scaleY={scale}
                onDragEnd={handleTransform}
                onTransformEnd={handleTransform}
                x={100}
                y={50}
                align="center"
              />
              <Transformer ref={trRef} visible={imageDrag} />
            </Layer>

            <Layer>
              <Img
                image={image}
                ref={imageRef1}
                draggable
                rotation={rotation}
                scaleX={scale / 2}
                scaleY={scale / 2}
                onDragEnd={handleTransform1}
                onTransformEnd={handleTransform1}
                x={50}
                y={25}
                align="center"
              />
              <Transformer ref={trRef1} visible={imageDrag} />
            </Layer>

          </Stage>

        }

      </div>
    </div>
  );
};

export default ImageStitching;