import { Container } from "unstated";
import firebase from "../firebase";

export interface UserState {
	user: firebase.User | null,
	hasErrors: boolean,
	errorMessage: string,
}

export class UserContainer extends Container<UserState> {
	constructor() {
		super();

		this.state = {
			user: null,
			hasErrors: false,
			errorMessage: "",
		}

		firebase.auth().onAuthStateChanged(user => {
			this.setState({ user: user });
		});
	}

	get isLogedin() { return this.state.user !== null }

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
}
