import React from "react";

import {
  useForm,
  useField,
  submitFail,
  submitSuccess
} from "@shopify/react-form";
import useReactRouter from "use-react-router";

import {
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField
} from "@shopify/polaris";
import { useFirebase } from "../../../../components";

export function Register() {
  const router = useReactRouter();
  const { fields, submit, submitting, dirty, reset, submitErrors } = useForm({
    fields: {
      firstName: useField(""),
      lastName: useField(""),
      email: useField(""),
      password: useField(""),
      passwordConfirmation: useField(""),
      phone: useField(""),
      address: useField(""),
      city: useField(""),
      state: useField(""),
      zip: useField(""),
      country: useField(""),
      cardNumber: useField("")
    },
    async onSubmit() {
      return submitSuccess();
    }
  });
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    phone,
    address,
    city,
    state,
    zip,
    country,
    cardNumber
  } = fields;
  const loading = submitting ? <p className="loading">loading...</p> : null;
  const errors =
    submitErrors.length > 0 ? (
      <p className="error">{submitErrors.join(", ")}</p>
    ) : null;

  console.log(fields)
  return (
    <Page title="">
      <img src="logo.png" height="100" />
      <Layout>
        <Layout.Section>
          <Card
            primaryFooterAction={{
              content: "Submit",
              onAction: submit,
              disabled: !dirty
            }}
            secondaryFooterAction={{
              content: "Back",
              onAction: () => {
                submit();
                router.history.goBack();
              }
            }}
          >
            <Card.Section>
              <Stack vertical>
                <FormLayout>
                  <FormLayout.Group>
                    {loading}
                    {errors}
                    <TextField name="fname" label="First" {...firstName} />
                    <TextField label="Last" {...lastName} />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField label="Email" type="email" {...email} />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField label="Password" type="password" {...password} />
                    <TextField
                      label="Confirm Password"
                      type="password"
                      {...passwordConfirmation}
                    />
                    <div style={{ position: "fixed", left: "100VW" }}>
                      <TextField label="" name="ccname" {...cardNumber} />
                      <TextField label="" name="phone" {...phone} />
                      <TextField label="" name="ship-address" {...address} />
                      <TextField label="" name="ship-city" {...city} />
                      <TextField label="" name="ship-state" {...state} />
                      <TextField label="" name="ship-zip" {...zip} />
                      <TextField label="" name="ship-country" {...country} />
                    </div>
                  </FormLayout.Group>
                </FormLayout>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
