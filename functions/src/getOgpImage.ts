import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

const storage = admin.storage();

const getOgpImage = async (request: functions.https.Request, response: functions.Response) => {
	const [, , uid] = request.path.split("/");

	const ogpImage = storage.bucket().file(`ogp-images/${uid}.jpg`);

	if (!await ogpImage.exists()) {
		response.status(404).end("404 Not Found.");
		return;
	}

	response.set("Cache-Control", "public, max-age=600, s-maxage=600");
	response.writeHead(200, { "Content-Type": "image/jpeg" });

	ogpImage.createReadStream().pipe(response);
}

export default getOgpImage;