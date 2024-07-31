import ImageManager from "./Image";

export default class SystemManager {
	// 合并数据
	static mergeData = (target: any, source: any) => {
		Object.keys(source).forEach(function (key) {
			if (source[key] && typeof source[key] === "object") {
				SystemManager.mergeData((target[key] = target[key] || {}), source[key]);
				return;
			}
			target[key] = source[key];
		});
	}

	// 检测中文
	static containsChinese(str: string) {
		const reg = /[\u4E00-\u9FA5]/g // 匹配中文的正则表达式
		return reg.test(str)
	}

	// 格式化当前时间
	static getNowformatTime = () => {
		var date = new Date();
		var year = date.getFullYear();
		var month = String(date.getMonth() + 1).padStart(2, '0');
		var day = String(date.getDate()).padStart(2, '0');
		var hours = String(date.getHours()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');
		var seconds = String(date.getSeconds()).padStart(2, '0');
		return year + month + day + hours + minutes + seconds;
	}

	// 格式化时间戳
	static formatTimestamp = (timestamp: number) => {
		var date = new Date(timestamp);
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		var hours = ("0" + date.getHours()).slice(-2);
		var minutes = ("0" + date.getMinutes()).slice(-2);
		var formattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
		return formattedDate;
	}

	// 复制数据到剪切板
	static copyToClipboard = (text: string) => {
		console.log('text:::', text)
		if (!text) {
			// return messageApi.info("暂无文本可复制!");
			return;
		}
		if (navigator.clipboard) {
			// clipboard api 复制
			navigator.clipboard.writeText(text);
		} else {
			var textarea = document.createElement('textarea');
			document.body.appendChild(textarea);
			// 隐藏此输入框
			textarea.style.position = 'fixed';
			textarea.style.clip = 'rect(0 0 0 0)';
			textarea.style.top = '10px';
			// 赋值
			textarea.value = text;
			// 选中
			textarea.select();
			// 复制
			document.execCommand('copy', true);
			// 移除输入框
			document.body.removeChild(textarea);
		}
	};


	// 下载图片
	static downloadImage = async (url: string, name?: string) => {
		const file = await ImageManager.imageToFile(url)
		const currentTime = SystemManager.getNowformatTime()
		const metaType = file?.type.split('/')[1] || url.split('.')[1]
		const resultName = name || `result-${currentTime}.${metaType.split('+')[0]}`
		const localUrl = URL.createObjectURL(file as File);
		const link = document.createElement('a')
		link.href = localUrl
		link.download = resultName

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
		}, 300)
	}


	// 下载视频
	static downloadVideo = (url: string, name?: string) => {
		fetch(url)
			.then(response => response.blob())
			.then(blob => {
				// 创建下载链接
				const currentTime = SystemManager.getNowformatTime()
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = name || `result-${currentTime}.mp4`
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

}
