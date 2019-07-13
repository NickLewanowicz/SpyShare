import React from "react";

import useReactRouter from "use-react-router";

import { Button, Card, Page, Layout, TopBar } from "@shopify/polaris";

import { useFirebase, useLocalStorage} from "components";

export function Login() {
  const firebase = useFirebase();
  const [currentUserObj, setCurrentUser] = useLocalStorage('currentUser', {})

  const { history } = useReactRouter();
  if (!firebase) {
    return <>Error</>;
  }
  const doSignIn = async () => {
    await firebase.doSignInWithGoogle();
    const {currentUser} = firebase.auth;
    if (currentUser) {
      const {displayName, email, phoneNumber, photoURL, providerData} = currentUser;
      setCurrentUser({displayName, email, phoneNumber, photoURL, providerData})
      console.log(currentUser)
      history.push("/register");
    }
  };

  const doSignout = async () => {
    const response = await firebase.doSignOut();
    console.log(response);
  };

  const profile =
    firebase.auth.currentUser && firebase.auth.currentUser.photoURL;
  return (
    <Page title="">
      <Layout>
          <Card sectioned>
              <p>Login or Signup with </p>
          <Button onClick={doSignIn}>Login in with Google</Button>
        <Button onClick={doSignout}>Sign out</Button>
          </Card>
        
      </Layout>
    </Page>
  );
}
