import React, { useState } from "react";

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
  TextField,
  ProgressBar,
} from "@shopify/polaris";

import {
  DetailsForm,
  useDetailFields,
  ProfileInfo,
  useProfileFields
} from "./components";

export function Register() {
  const router = useReactRouter();
  const { fields, submit, submitting, dirty, reset, submitErrors } = useForm({
    fields: {
      details: useDetailFields(),
      profile: useProfileFields()
    },
    async onSubmit({ details }) {
      console.log(details);
      setStep(step + 1);
      return submitSuccess();
    }
  });
  const { details, profile } = fields;
  const [step, setStep] = useState(0);
  const loading = submitting ? <p className="loading">loading...</p> : null;
  const errors =
    submitErrors.length > 0 ? (
      <p className="error">{submitErrors.join(", ")}</p>
    ) : null;

  console.log(details);

  const formContent = (step => {
    switch (step) {
      case 0:
        return <DetailsForm {...details} />;
      case 1:
        return <ProfileInfo {...profile} />;
      default:
        return <>Loading</>;
    }
  })(step);

  return (
    <Page title="Details">
      <Layout>
        <Layout.Section>
          <Card
            primaryFooterAction={{
              content: "Next",
              onAction: submit,
              disabled: !dirty
            }}
            secondaryFooterAction={{
              content: "Back",
              onAction:
                step === 0
                  ? () => {
                      submit();
                      router.history.goBack();
                    }
                  : () => setStep(step - 1)
            }}
          >
            <Card.Section>{formContent}</Card.Section>
          </Card>
          <ProgressBar progress={(step+1)/3*100} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
