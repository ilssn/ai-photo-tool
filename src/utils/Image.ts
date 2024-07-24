export default class ImageManager {

  // 下载图片为文件
  static imageToFile = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Get origin image error: ${res.statusText}`);
      }
      const blob = await res.blob();
      // 创建一个File对象
      let fileName = 'file.jpg'
      if (url.includes('.svg')) {
        fileName = 'file.svg'
      }
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      // console.error('Error transferring image:', error);
      return null
    }
  }


  // 读取文件为图片
  static fielToImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        resolve(url)
      } catch (error) {
        reject('File to image error')
      }
    })
  }

  // 读取file为base64
  static fileToBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = function (event) {
          const result = event?.target?.result;
          resolve(result)
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject('file to base64 error')
      }
    })
  }

  // 下载图片为本地Base64
  static imageToBase64 = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Get origin image error: ${res.statusText}`);
      }
      const blob = await res.blob();
      // 创建一个File对象
      let fileName = 'file.jpg'
      if (url.includes('.svg')) {
        fileName = 'file.svg'
      }
      const file = new File([blob], fileName, { type: blob.type });
      const base64 = URL.createObjectURL(file);
      return base64;
    } catch (error) {
      // console.error('Error transferring image:', error);
      return null
    }
  }

  // 转换图片格式 
  static pngToJpg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0);
        const jpegData = canvas.toDataURL('image/jpeg');
        resolve(jpegData);
      };
      image.onerror = reject;
    });
  }

  // 转换文件格式
  static pngFileToJpgFile = async (file: File) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        const jpg = await ImageManager.pngToJpg(url) as string
        const result = await ImageManager.imageToFile(jpg)
        resolve(result)
      } catch (error) {
        reject('png file to jpg file error')
      }
    })
  }

  // 读取图片宽高
  static readImageSize = async (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.src = url
        img.onload = () => {
          if (img.width && img.height) {
            resolve({ width: img.width, height: img.height })
          }
        }
        img.onerror = () => {
          reject('Load image error')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  // 本地化图片地址
  static localizeImage = async (url: string) => {
    try {
      const file = await ImageManager.imageToFile(url)
      const src = URL.createObjectURL(file as File);
      return src
    } catch (error) {
      return null
    }
  }

}