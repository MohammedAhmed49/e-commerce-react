import { all, call, put, takeLatest } from "redux-saga/effects";
import { createUser, createUserDocumentFromAuth, customSignIn, customSignOut, getCurrentUser, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.actions";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromAuth(userAuth, addetionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, addetionalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuth () {
    try {
        const user = yield call(getCurrentUser);
        if (!user) return;
        yield call(getSnapshotFromAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle () {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail ({payload: {email, password}}) {
    try {
        const user = yield call(customSignIn, email, password);
        yield call(getSnapshotFromAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp ({payload: {email, password, displayName}}) {
    try {
        const { user } = yield call(createUser, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp ({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromAuth, user, additionalDetails);
}

export function* signOut () {
    try {
        yield call(customSignOut);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* onGoogleSignInStart () {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart () {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession () {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth);
}

export function* onSignUpStart () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga () {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)]);
}