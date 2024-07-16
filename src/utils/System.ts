export default class SystemManager {
	// 复制数据到剪切板
	static copyToClipboard = (text: string) => {
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

	// 获取当前时间戳
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

	// formate
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

	// merge
	static mergeData = (target: any, source: any) => {
		Object.keys(source).forEach(function (key) {
			if (source[key] && typeof source[key] === "object") {
				SystemManager.mergeData((target[key] = target[key] || {}), source[key]);
				return;
			}
			target[key] = source[key];
		});
	}
	
}
