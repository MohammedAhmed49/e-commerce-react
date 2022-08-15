import { useState } from "react";
import { createUser, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';

const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const {displayName, email, password, confirmPassword} = formValues;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    const submitHandle = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords are not identical!');
        } else {
            try {
                const res = await createUser({email, password});
        
                const userDocRef = await createUserDocumentFromAuth({email: email, displayName: displayName, uid: res.user.uid});
        
                setFormValues(defaultValues);
            } catch(error) {
                if (error.code === 'auth/email-already-in-use') alert('User already exists!');
                else alert('Something went wrong!');
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={(e) => submitHandle(e)}>
                <FormInput label="Display Name" type="text" required name="displayName" value={displayName} onChange={(e) => handleChange(e)}/>
                
                <FormInput label="Email Adress" type="email" required name="email" value={email} onChange={(e) => handleChange(e)} />
                
                <FormInput label="Password" type="password" required name="password" value={password} onChange={(e) => handleChange(e)} />

                <FormInput label="Confirm Password"required name="confirmPassword" value={confirmPassword} onChange={(e) => handleChange(e)} />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;