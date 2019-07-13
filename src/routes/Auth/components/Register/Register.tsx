import React, {useState} from "react";

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

import {DetailsForm, useDetailFields} from './components'

export function Register() {
  const router = useReactRouter();
  const { fields, submit, submitting, dirty, reset, submitErrors } = useForm({
    fields: {
      details: useDetailFields(),
    },
    async onSubmit({details}) {
      console.log(details)
      return submitSuccess();
    }
  });
  const {details} = fields;
  const [step, setStep] = useState(0);
  const loading = submitting ? <p className="loading">loading...</p> : null;
  const errors =
    submitErrors.length > 0 ? (
      <p className="error">{submitErrors.join(", ")}</p>
    ) : null;

  console.log(details)

  const formContent = ((step) => {
    switch(step) {
      case 0:
        return <DetailsForm {...details} />;
      case 1:
        return null;
      default:
        return <>Loading</>;
    }
  })(step)


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
              {formContent}
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
