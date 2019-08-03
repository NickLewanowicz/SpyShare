import React from "react";

import useReactRouter from "use-react-router";

import { Button, Card, Page, Layout, Stack, TopBar } from "@shopify/polaris";

import { useFirebase, useLocalStorage } from "components";

export function Login() {
  const firebase = useFirebase();
  const [currentUserObj, setCurrentUser] = useLocalStorage("currentUser", {});

  const { history } = useReactRouter();
  if (!firebase) {
    return <>Error</>;
  }
  const doSignIn = async () => {
    await firebase.doSignInWithGoogle();
    const { currentUser } = firebase.auth;
    if (currentUser) {
      const {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerData
      } = currentUser;
      setCurrentUser({
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerData
      });
      console.log(currentUser);
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
        <div style={{margin: '1rem 1rem 1rem 3rem'}}>
        <Card sectioned title="👋 Welcome to Subshare!">
          <Stack vertical>
            <p style={{maxWidth: 400}}>
              Looks like you havent logged in before! No problem simply sign in
              with Google and you will be prompted to setup your account 😄
            </p>
            <div style={{display: 'flex', flexDirection: 'column'}}><Button primary onClick={doSignIn}>Login in with Google</Button></div>
          </Stack>
        </Card></div>
      </Layout>
    </Page>
  );
}
