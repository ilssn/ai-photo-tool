import 'whatwg-fetch'

class FetchWithAbort {
	private controller: AbortController;

	constructor() {
		this.controller = new AbortController();
	}

	fetch = async (
		url: string,
		callback?: (chunk: string) => void,
		options?: RequestInit
	) => {
		try {
			const fetchOptions = { ...options, signal: this.controller.signal };
			const response = await fetch(url, fetchOptions);

			if (!response.ok) {
				const data = await response.json()
				if (data.error) {
					throw new Error(data.error.err_code);
				}
				throw new Error(`Network Error! status: ${response.status}`);
			}
			// fix: qq browser fetch
			if (!response.body) {
				const data = await response.json()
				const content = data.choices[0].message?.content || ""
				if (callback) {
					callback(content)
				}
				return content

			} else {
				const reader = response.body!.getReader();
				const decoder = new TextDecoder();
				let done = false;

				let lastMessage = "";
				while (!done) {
					let chunkValue = ''
					const { value, done: doneReading } = await reader.read();
					done = doneReading;

					try {
						chunkValue = decoder.decode(value, { stream: true });
					} catch (error) {
						// todo
					}
					const lines = chunkValue.split('\n')
					lines.forEach(line => {
						const jsonString = line.substring(line.indexOf('{'))
						if (jsonString && jsonString !== 'data: [DONE]') {
							const jsonData = JSON.parse(jsonString)
							const content = jsonData.choices[0].delta?.content || ""
							lastMessage = lastMessage + content;
							if (callback) {
								callback(content)
							}
						}
					})
				}
				return lastMessage;
			}
		} catch (e: any) {
			if (e.name === "AbortError") {
				throw "aborted";
			} else {
				throw e.message;
			}
		}
	};

	cancel = () => {
		try {
			this.controller.abort();
		} catch (error) {
			console.log("Cancel Error: ", error);
		}
	};
}

export default FetchWithAbort;
