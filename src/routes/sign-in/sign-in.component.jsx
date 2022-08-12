import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const signIn = async () => {
        let response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div>
            <h2>Sign in</h2>
            <button onClick={signIn}>Sign in using Google account</button>
        </div>
    )
}

export default SignIn;