"use client";
export function resizeImage(
  base64Str: string,
  maxWidth = 1000,
  maxHeight = 1000
) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;
      let shouldResize = true;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          shouldResize = true;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          shouldResize = true;
        }
      }
      if (shouldResize) {
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 1));
      } else {
        resolve(base64Str);
      }
    };
  });
}

export const fileToBase64 = (file: File) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    //   console.log(reader.result);
    return reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};
