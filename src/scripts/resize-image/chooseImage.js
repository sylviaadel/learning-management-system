import { downloadFile, uploadFile } from "../cloudStorage";
import readFile from "./readFile";
import resizeImage from "./resizeImage";

export async function onChooseImage(
  event,
  setButtonEnabled,
  setImage,
  manualId
) {
  const file = event.target.files[0];
  const filePath = `courses/${manualId}_${file.name}`;
  const imageFromfile = await readFile(file);
  setButtonEnabled(false);
  const resizedImage = await resizeImage(imageFromfile, 325, 170);
  await uploadFile(resizedImage, filePath);
  setImage(await downloadFile(filePath));
  setButtonEnabled(true);
}
