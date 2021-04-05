import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  to: string;
};

export const Redirect: React.VFC<Props> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return null;
};
