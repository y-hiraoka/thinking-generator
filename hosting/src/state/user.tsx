import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firebase } from "../common/firebaseClient";

const DEFAULT_USER_IMAGE = "/images/eye_shirome_woman.png";

type User = {
  uid: string;
  name: string;
  photoURL: string | undefined;
};

const userContext = createContext<User | null | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(
    () =>
      firebaseAuth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser === null) {
          setUser(null);
        } else {
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName ?? "",
            photoURL: firebaseUser.photoURL ?? undefined,
          });
        }
      }),
    [],
  );

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useIsAlreadySignedIn = () => {
  const user = useContext(userContext);

  return !!user;
};

export const useUser = () => {
  return useContext(userContext);
};

export const useSignedInUser = (): User => {
  const user = useContext(userContext);

  if (user === undefined) throw new Error("Do not use this hook while loading.");

  if (user === null) throw new Error("User must be signed in.");

  return user;
};

export const usePhotoURLBigger = () => {
  const user = useSignedInUser();

  return user.photoURL?.replace("normal", "bigger") ?? DEFAULT_USER_IMAGE;
};

export const usePhotoURL200x200 = () => {
  const user = useSignedInUser();

  return user.photoURL?.replace("normal", "200x200") ?? DEFAULT_USER_IMAGE;
};

function hasTwitterImageURL(
  value: any,
): value is { profile_image_url_https: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "profile_image_url_https" in value &&
    typeof value["profile_image_url_https"] === "string"
  );
}

export const signIn = async () => {
  try {
    const provider = new firebase.auth.TwitterAuthProvider();
    const result = await firebaseAuth.signInWithPopup(provider);
    if (hasTwitterImageURL(result.additionalUserInfo?.profile)) {
      if (
        result.user?.photoURL !==
        result.additionalUserInfo?.profile.profile_image_url_https
      ) {
        result.user?.updateProfile({
          photoURL: result.additionalUserInfo?.profile.profile_image_url_https,
        });

        window.location.reload();
      }
    }
  } catch {}
};

export const signOut = async () => {
  await firebaseAuth.signOut();
};
