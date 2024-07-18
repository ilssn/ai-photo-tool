
import StorageManager from "@/utils/Storage"
import ImageManager from "@/utils/Image";
import { AUTH_TOKEN, TASK_KEY } from "@/constants"

interface Result {
  imageSrc: string
}

// Token: get
export const getToken = () => {
  // const token = StorageManager.getItem(AUTH_TOKEN) || '';
  const token = window.localStorage.getItem(AUTH_TOKEN) || '';
  return token;
};

// Task: get
export const getTask = () => {
  const data = StorageManager.getItem(TASK_KEY) || {};
  return data;
};

// Task: upd
export const updateTask = (value: any) => {
  StorageManager.setItem(TASK_KEY, value);
};

// Task: fetch
export const fetchTask = async (id: string) => {
  const token = getToken();
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 30;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/task/${id}/fetch
      `, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            reject(data.error)
            return
          }
          if (data.status === 'succeeded') {
            resolve(data);
          } else if (data.status === 'failed') {
            reject('Task failed')
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 5000); // 每隔5秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
}

// 上传图片
async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prefix', 'photoshow');

    const response = await fetch(`${process.env.NEXT_PUBLIC_302AI_UPLOAD}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { body } = response;
    if (!body) {
      return;
    }
    const data = await response.json();
    return data.data.url;
  } catch (error) {
    // console.error('Error transferring image:', error);
  }
}

// 生成图片
export async function generateImage(action: any): Promise<Result> {
  return new Promise(async (resolve, reject) => {
    let res = null
    let result = { imageSrc: '' }
    try {
      if (action.name === 'remove-bg') {
        const file = await ImageManager.imageToFile(action.src) as File
        res = await removeBackground(file)
        result.imageSrc = res.output
      }
      if (action.name === 'colorize') {
        const file = await ImageManager.imageToFile(action.src) as File
        const url = await uploadImage(file)
        res = await colorizeImage(url)
        result.imageSrc = res.output
      }
      if (action.name === 'vectorize') {
        const file = await ImageManager.imageToFile(action.src) as File
        res = await vectorizeImage(file)
        result.imageSrc = res.output
      }
      if (action.name === 'upscale') {
        const scale = Number(action.scale)
        const file = await ImageManager.imageToFile(action.src) as File
        const res = await upscaleImage(file, scale)
        result.imageSrc = res.output
      }
      if (action.name === 'swap-face') {
        const targetFile = await ImageManager.imageToFile(action.src) as File
        const maskFile = action.mask
        res = await swapFace(targetFile, maskFile)
        result.imageSrc = res.output
      }
      if (action.name === 'recreate-img') {
        const file = await ImageManager.imageToFile(action.src) as File
        const prompt = action.prompt
        res = await recreatImage(file, prompt)
        result.imageSrc = res.output
      }
      

      // 返回结果
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}


// 去除背景
export async function removeBackground(file: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null
      const token = getToken()
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/302/submit/removebg`, {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          "Accept": "image/*",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw await res.json()
      }

      // 直接返回结果
      result = await res.json()
      if (result.output) {
        resolve(result)
        return
      }

      // 等待任务结果
      updateTask(result)
      result = await fetchTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })
}

// 黑白上色
export async function colorizeImage(url: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null
      const token = getToken()
      const formData = new FormData();
      formData.append('image', url);

      const res = await fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/302/submit/colorize`, {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw await res.json()
      }

      result = await res.json()
      updateTask(result)
      if (result.output) {
        resolve(result)
        return
      }
      result = await fetchTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })

}

// 矢量化
export async function vectorizeImage(file: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null
      const token = getToken()
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/vectorizer/v1/vectorize`, {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          "Accept": "image/*",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw await res.json()
      }

      // 直接返回结果
      result = await res.json()
      if (result.output) {
        resolve(result)
        return
      }

      // 等待任务结果
      updateTask(result)
      result = await fetchTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })
}

// 放大图片
export async function upscaleImage(file: File, scale: Number): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      // no scale
      const token = getToken()
      let result = null
      const url = await uploadImage(file)
      if (scale === 0) {
        resolve({ output: url })
        return
      }

      const data = {
        "image": url,
        "scale": scale,
        "face_enhance": true,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/302/submit/upscale`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw await res.json()
      }

      result = await res.json()
      // save task
      updateTask(result)
      if (result.output) {
        resolve(result)
        return
      }
      result = await fetchTask(result.id)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

// 人物换脸
export async function swapFace(target: File, mask: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null
      const token = getToken()
      const formData = new FormData();
      formData.append('target_image', target);
      formData.append('swap_image', mask);

      const res = await fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/302/submit/face-swap`, {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw await res.json()
      }

      result = await res.json()
      updateTask(result)
      if (result.output) {
        resolve(result)
        return
      }
      result = await fetchTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })

}

// 以图生图
export async function recreatImage(file: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null
      const token = getToken()
      const formData = new FormData();
      formData.append('image', file);
      formData.append('prompt', prompt);

      const res = await fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}/sd/v2beta/stable-image/control/structure`, {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw await res.json()
      }

      result = await res.json()
      updateTask(result)
      if (result.output) {
        resolve(result)
        return
      }
      result = await fetchTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })

}