import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseStorage } from "../../common/firebaseAdmin";

const SITEURL = `https://thinking-generator.web.app`;
const TITLE = `と思う〇〇であったジェネレーター`;
const DESCRIPTION =
  "「と思う〇〇であった」という画像をTwitterに投稿するサービスです。";

type Props = {
  fileName: string;
};

const Share: React.VFC<Props> = ({ fileName }) => {
  const router = useRouter();

  const ogImage = `https://firebasestorage.googleapis.com/v0/b/thinking-generator.appspot.com/o/ogp-images%2F${fileName}.jpg?alt=media`;

  useEffect(() => {
    router.push("/");
  }, [router]);
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{TITLE}</title>
      <meta property="og:title" content={TITLE} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={SITEURL} />
      <meta property="og:type" content={"article"} />
      <meta property="og:site_name" content={TITLE} />
      <meta name="twitter:site" content={SITEURL} />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Head>
  );
};

export default Share;

type Params = {
  fileName: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
  res,
}) => {
  if (params === undefined) return { notFound: true };

  res.setHeader("Cache-Control", "public, max-age=600, s-maxage=600");

  const bucket = firebaseStorage.bucket();
  const imageFile = bucket.file(`ogp-images/${params.fileName}.jpg`);

  if (!(await imageFile.exists())[0]) {
    return { notFound: true };
  }

  return {
    props: {
      fileName: params.fileName,
    },
  };
};
