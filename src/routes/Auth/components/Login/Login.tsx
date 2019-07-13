import React from "react";

import useReactRouter from "use-react-router";

import { Button, Card, Page, Layout, TopBar } from "@shopify/polaris";
import { useFirebase } from "../../../../components";

export function Login() {
  const firebase = useFirebase();
  const { history } = useReactRouter();
  if (!firebase) {
    return <>Error</>;
  }
  const doSignIn = async () => {
    await firebase.doSignInWithGoogle();
    if (firebase.auth.currentUser) {
      history.push("/register");
    }
    firebase.auth.currentUser &&
      console.log(firebase.auth.currentUser.photoURL);
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
