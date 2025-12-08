import { IMAGE_UPLOAD_URL } from "../global";

// laster opp bilde til backend og returnerer filnavnet som lagres i databasen
export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    // legger filen inn i formData med nøkkelen "file" ( samme som backend forventer )
    formData.append("file", file);

    const response = await fetch(IMAGE_UPLOAD_URL, {
        method:"POST",
        body: formData, // sender formData direkte som body
    });
    
    if(!response.ok){
        throw new Error("Image upload failed");
    }

    // leser JSON responsen og returnerer filnavnet fra backend
    const data = await response.json();
    return data.fileName;
}