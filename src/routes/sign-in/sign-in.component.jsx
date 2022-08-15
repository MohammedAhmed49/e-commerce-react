import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const signIn = async () => {
        let response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h2>Sign in</h2>
            <button onClick={signIn}>Sign in using Google account</button>

            <SignUpForm />
        </div>
    )
}

export default SignIn;