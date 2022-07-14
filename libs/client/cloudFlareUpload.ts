export const cloudFlareUpload = async (url: string, fileData: any) => {
	const form = new FormData();
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
