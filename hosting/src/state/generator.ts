import { useCallback, useEffect, useReducer, useRef } from "react";
import unreduxed from "unreduxed";
import { firebaseStorage } from "../common/firebase";
import { usePhotoURL200x200, useSignedInUser } from "./user";
import { useSnapshot } from "../utils/useSnapshot";
import { useOgpURL } from "./ogpURL";
import baseImage from "../common/thinkingBaseImage.jpeg";
import { fillTextAutoLine } from "../utils/canvas";

type InputData = {
  name: string;
  tweet: string;
};

type Action =
  | { type: "setName"; name: string }
  | { type: "setTweet"; tweet: string };

const reducer: React.Reducer<InputData, Action> = (state, action) => {
  switch (action.type) {
    case "setName": {
      return { ...state, name: action.name };
    }
    case "setTweet": {
      return { ...state, tweet: action.tweet };
    }
  }
};

const useGenerator = () => {
  const user = useSignedInUser();
  const ogpURL = useOgpURL();
  const photoURL = usePhotoURL200x200();

  const [inputData, dispatch] = useReducer(reducer, {
    name: user.name,
    tweet: "",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const inputDataSnapshot = useSnapshot(inputData);

  // テキストの入力を canvas に反映する
  useEffect(() => {
    if (canvasRef.current === null) return;

    const context = canvasRef.current.getContext("2d");

    if (context === null) return;

    const image = new Image();
    image.src = baseImage;

    image.onload = () => {
      context.drawImage(image, 0, 0);

      const iconImage = new Image();
      iconImage.crossOrigin = "Anonymous";
      iconImage.src = photoURL;
      iconImage.onload = () => {
        context.drawImage(iconImage, 135, 210);
      };

      context.font = "40px sans-serif";
      fillTextAutoLine(
        context,
        `と思う${inputData.name}であった`,
        375,
        240,
        460,
        50,
      );
    };
  }, [photoURL, inputData.name]);

  const submitTweet = useCallback(async () => {
    const inputData = inputDataSnapshot.current;

    const imageData = canvasRef.current?.toDataURL("image/jpeg").split(",")[1] ?? "";

    const storageRef = firebaseStorage.ref();
    const imagesRef = storageRef.child(`ogp-images/${user.uid}.jpg`);

    await imagesRef.putString(imageData, "base64");

    const tweeturl =
      `http://twitter.com/share` +
      `?url=${ogpURL}` +
      `&text=${inputData.tweet.replace(/\r?\n/g, "%0a")}%0a%0a`;

    if (window.open(tweeturl, "_blank")) {
    } else {
      window.location.href = tweeturl;
    }
  }, [inputDataSnapshot, ogpURL, user.uid]);

  return {
    inputData,
    dispatch,
    submitTweet,
    canvasRef,
  };
};

export const [GeneratorContainerProvider, useGeneratorContainer] = unreduxed(
  useGenerator,
);
