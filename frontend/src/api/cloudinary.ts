export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_preset');

  const res = await fetch('https://api.cloudinary.com/v1_1/dhtrstpu0/image/upload', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    throw new Error('Image upload failed');
  }

  const data = await res.json();
  return data.secure_url;
}
