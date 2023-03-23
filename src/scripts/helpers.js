import checkmark from "../assets/images/checkmark.png";
import { downloadFile, uploadFile } from "./cloudStorage";
import readFile from "./resize-image/readFile";
import resizeImage from "./resize-image/resizeImage";

export const courseText =
  "Please check below all materials needed to be professional in this course:";

export const imgCoursesAlt =
  "Clothes hanged on dressing along with shoes on ground and plants.";

export const recoverMessage =
  "Email with a reset link sent. Please check your SPAM/Junk folder as well.";

export const adminText =
  "Please choose from below tabs which item to manage, you can update, delete or add new Courses and delete or add new Students.";

export const logoAlt = "A mannequin with red dress and a pen beside it";

export const imgStartAlt =
  "A girl holding graduation report and wearing graduation cap infront of laptop and books";

export const checkmarkIcon = <img src={checkmark} alt="pink Checkmark" />;

export const imgSpecialAlt =
  "A pink notebook, papers, a pencil and eyeglasses over them";

export const heroText =
  "Be your own personal styler, Master your image boost your confidence! You Can Be Stylish, Have Confidence, and Feel Radiant everyday, all you need is to know how.";

export const acceptImg = "image/png, image/jpeg, image/jpg, image/webp";

export const acceptFile =
  "image/png, image/jpeg, application/pdf, application/vnd.sealed.ppt";

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

export function changeFiles(files, setFiles) {
  setFiles(files);
}
export function changeLinks(links, setLinks) {
  setLinks(links);
}
