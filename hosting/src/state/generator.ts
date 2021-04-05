import { useCallback, useEffect, useReducer, useRef } from "react";
import unreduxed from "unreduxed";
import { v4 as uuid } from "uuid";
import { firebaseStorage } from "../common/firebaseClient";
import { usePhotoURL200x200, useSignedInUser } from "./user";
import { useSnapshot } from "../utils/useSnapshot";
import { fillTextAutoLine } from "../utils/canvas";
import { toHashValue } from "../utils/toHashValue";
import {
  createExistingImage,
  getExistingImage,
} from "../repositories/existingImage";

const BASE_IMAGE = "/images/thinkingBaseImage.jpeg";

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
    image.src = BASE_IMAGE;

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

    const nameHashValue = await toHashValue(inputData.name);
    const photoURLHashValue = await toHashValue(photoURL);

    const existingImage = await getExistingImage(
      user.uid,
      nameHashValue,
      photoURLHashValue,
    );

    let ogpURL: string;

    if (existingImage !== undefined) {
      ogpURL = `${window.location.origin}/share/${existingImage.fileName}`;
    } else {
      const imageData =
        canvasRef.current?.toDataURL("image/jpeg").split(",")[1] ?? "";

      const fileName = uuid();

      const storageRef = firebaseStorage.ref();
      const imagesRef = storageRef.child(`ogp-images/${fileName}.jpg`);
      await imagesRef.putString(imageData, "base64", { contentType: "image/jpeg" });

      await createExistingImage(
        user.uid,
        nameHashValue,
        photoURLHashValue,
        fileName,
      );

      ogpURL = `${window.location.origin}/share/${fileName}`;
    }

    const tweeturl =
      `http://twitter.com/share` +
      `?url=${ogpURL}` +
      `&text=${inputData.tweet.replace(/\r?\n/g, "%0a")}%0a%0a`;

    if (window.open(tweeturl, "_blank")) {
    } else {
      window.location.href = tweeturl;
    }
  }, [inputDataSnapshot, user.uid]);

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
