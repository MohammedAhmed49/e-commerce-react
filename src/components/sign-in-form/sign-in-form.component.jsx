import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailSigInStart, googleSigInStart } from "../../store/user/user.actions";
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

    const dispatch = useDispatch();

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const googleSignIn = async (event) => {
        event.preventDefault();
        dispatch(googleSigInStart());
    }

    const signInWithEmail = async (event) => {
        event.preventDefault();
        dispatch(emailSigInStart(email, password))
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