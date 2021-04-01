import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firebase } from "../common/firebase";
import defaultUserImage from "../common/eye_shirome_woman.png";

type User = {
  uid: string;
  name: string;
  photoURL: string | undefined;
};

const testUser: User = {
  name: "localhost test user",
  uid: "localhost-test-user",
  photoURL:
    "https://pbs.twimg.com/profile_images/1202181746285899776/4fS3r33J_normal.jpg",
};

const userContext = createContext<User | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>();

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

  if (user === undefined) return <div>loading...</div>;

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useIsAlreadySignedIn = () => {
  const user = useContext(userContext);

  return !!user;
};

export const useSignedInUser = (): User => {
  const user = useContext(userContext);

  if (user === null && window.location.hostname === "localhost") {
    return testUser;
  }

  if (user === undefined || user === null) {
    throw new Error("User must be signed in.");
  }

  return user;
};

export const usePhotoURLBigger = () => {
  const user = useSignedInUser();

  return user.photoURL?.replace("normal", "bigger") ?? defaultUserImage;
};

export const usePhotoURL200x200 = () => {
  const user = useSignedInUser();

  return user.photoURL?.replace("normal", "200x200") ?? defaultUserImage;
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
