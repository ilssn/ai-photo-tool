export function downloadImage(uri: string, name: string) {
  const link = document.createElement('a')
  link.href = uri
  link.download = name

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    // window.URL.revokeObjectURL(base64)
    link.remove()
  }, 100)
}


export function downloadVideo(url:string, filename:string) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      // 创建下载链接
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // 触发点击事件进行下载
      link.click();
      
      // 清理链接对象和URL对象
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
    .catch(error => {
      console.error('下载视频出错:', error);
    });
}