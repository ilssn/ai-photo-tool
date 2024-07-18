
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
  const token = GetToken();
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 30;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_302AI_FETCH}task/${id}/fetch
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
              const task = GetTaskService()
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

// 生成图片
export async function generateImage(action: any): Promise<Result> {
  return new Promise(async (resolve, reject) => {
    let res = null
    let result = { imageSrc: '' }
    try {
      if (action.type === 'remove-bg') {
        const file = await ImageManager.imageToFile(action.src) as File
        res = await removeBackground(file)
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

