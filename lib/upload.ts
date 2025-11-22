import { toast } from "sonner";

export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await response.json();
    return {
      name: file.name,
      contentType: file.type,
      url: data.url,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
    return;
  }
}
