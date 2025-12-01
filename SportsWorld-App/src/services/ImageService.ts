import { IMAGE_UPLOAD_URL } from "../global";

export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(IMAGE_UPLOAD_URL, {
        method:"POST",
        body: formData,
    });
    
    if(!response.ok){
        throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.fileName;
}