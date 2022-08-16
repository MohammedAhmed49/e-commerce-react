import { useState } from "react";
import { createUserDocumentFromAuth, customSignIn, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultValues = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const {email, password} = formValues;

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const googleSignIn = async (event) => {
        event.preventDefault();
        const res = await signInWithGooglePopup();
        const userData = await createUserDocumentFromAuth(res.user);
        console.log(userData);
    }

    const signInWithEmail = async (event) => {
        event.preventDefault();
        const user = await customSignIn(email, password);
        console.log(user);
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={(e) => signInWithEmail(e)}>
                <FormInput label="email" name="email" type="email" value={email} onChange={changeHandler}/>

                <FormInput label="password" name="password" type="password" value={password} onChange={(e) => changeHandler(e)}/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={(e) => googleSignIn(e)}>Google sign in</Button>
                </div>
            </form>
        </div>
    )

}

export default SignInForm;