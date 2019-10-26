import { Container } from "unstated";
import firebase from "../firebase";

interface GlobalState {
	user: firebase.User | null,
	hasErrors: boolean,
	errorMessage: string,
	userName: string,
	tweetText: string,
	ogpUrl: string,
}

export class GlobalStateContainer extends Container<GlobalState> {
	constructor() {
		super();

		this.state = {
			user: null,
			hasErrors: false,
			errorMessage: "",
			userName: "",
			tweetText: "",
			ogpUrl: "",
		}

		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user,
				userName: user && user.displayName ? user.displayName : "",
				tweetText: "",
			});
		});
	}

	public get PhotoUrlbigger() {
		if (!this.state.user) return "";

		if (!this.state.user.photoURL) return "";

		return this.state.user.photoURL.replace("normal", "bigger");
	}

	public get photoUrl200x200() {
		if (!this.state.user) return "";

		if (!this.state.user.photoURL) return "";

		return this.state.user.photoURL.replace("normal", "200x200");
	}

	login = async () => {
		try {
			const provider = new firebase.auth.TwitterAuthProvider();
			const redirectRes = await firebase.auth().signInWithPopup(provider);
			if (redirectRes.user) this.setState({ user: redirectRes.user });
		} catch (error) {
			this.setState({
				hasErrors: true,
				errorMessage: JSON.stringify(error),
			});
		}
	}

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({
			user: null,
			hasErrors: false,
			errorMessage: "",
		});
	}

	setUserName = async (userName: string) => {
		await this.setState({
			userName: userName,
		});
	}

	setTweetText = async (tweetText: string) => {
		await this.setState({
			tweetText: tweetText,
		});
	}

	setOgpUrl = async (url: string) => {
		await this.setState({
			ogpUrl: url,
		})
	}
}
