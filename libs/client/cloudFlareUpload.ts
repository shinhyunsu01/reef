export const cloudFlareUpload = async (url: string, fileData: string) => {
	const form = new FormData();
	console.log("fileData", fileData);
	form.append("file", fileData);
	const {
		result: { id },
	} = await (
		await fetch(url, {
			method: "POST",
			body: form,
		})
	).json();
	return id;
};
