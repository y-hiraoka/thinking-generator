import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

const appDomain = `thinking-generator.web.app`;

const share = async (request: functions.https.Request, response: functions.Response) => {
	const [, , uid] = request.path.split("/");

	try {
		await admin.auth().getUser(uid); // Check if a user with the specified uid exists. If user doesn't, throw error.
		response.set("Cache-Control", "public, max-age=600, s-maxage=600");
		const html = createHtml(uid);
		response.status(200).end(html);
	}
	catch (error) {
		response.status(404).end("404 Not Found");
	}
}

const createHtml = (uid: string) => {
	const SITEURL = `https://${appDomain}`
	const TITLE = `と思う〇〇であったジェネレーター`
	const DESCRIPTION = '「と思う〇〇であった」という画像をTwitterに投稿するサービスです。'

	return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>と思う〇〇であったジェネレーター</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${SITEURL}/ogp/${uid}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${SITEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="と思う〇〇であったジェネレーター">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${SITEURL}/ogp/${uid}">
    <meta name="twitter:description" content="${DESCRIPTION}">
  </head>
  <body>
    <script type="text/javascript">window.location="/";</script>
  </body>
</html>
`
}

export default share;