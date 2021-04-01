import { useSignedInUser } from "./user";

export const useOgpURL = () => {
  const user = useSignedInUser();

  return `${window.location.origin}/share/${user.uid}`;
};
