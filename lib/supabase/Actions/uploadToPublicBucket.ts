import { createClient } from "../server";

export const uploadToPublicBucket = async (
  fileName: string,
  file: File,
): Promise<boolean> => {
  if (!file.type.startsWith("image/")) return false;
  const Bucket = "assets";
  const supabase = await createClient();
  const { data, error: fileUploadError } = await supabase.storage
    .from(Bucket)
    .upload(fileName, file, {
      upsert: false,
      contentType: file.type,
    });
  if (fileUploadError) {
    console.error(fileUploadError);
    return false;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(Bucket).getPublicUrl(data.path);

  const { error: tableUpdateError } = await supabase
    .from("public_assets")
    .insert({
      path: data.path,
      url: publicUrl,
    });

  if (tableUpdateError) {
    console.log(`Failed to update table, ${tableUpdateError}`);
    return false;
  }
  
  return true;
};
