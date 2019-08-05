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
  DataTable,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField,
  ProgressBar
} from "@shopify/polaris";

import {
  DetailsForm,
  useDetailFields,
  ProfileInfo,
  useProfileFields,
  AvatarSetup,
  useAvatarFields
} from "./components";
import { VideoRecorder } from "components";
import "./Register.css";

export function Register() {
  const router = useReactRouter();
  const { fields, submit, submitting, dirty, reset, submitErrors } = useForm({
    fields: {
      details: useDetailFields(),
      profile: useProfileFields(),
      avatar: useAvatarFields()
    },
    async onSubmit({ details }) {
      console.log(details);
      setStep(step + 1);
      return submitSuccess();
    }
  });
  const { avatar, details, profile } = fields;
  const [step, setStep] = useState(0);
  const [triggerCamera, setTriggerCamera] = useState(false);
  const [cameraPerm, setCameraPerm] = useState(false);
  const loading = submitting ? <p className="loading">loading...</p> : null;
  const errors =
    submitErrors.length > 0 ? (
      <p className="error">{submitErrors.join(", ")}</p>
    ) : null;

  console.log(details);
  console.log(profile.location.value)
  const formContent = (step => {
    switch (step) {
      case 0:
        return <DetailsForm {...details} />;
      case 1:
        return <ProfileInfo {...profile} />;
      case 2:
        return (
          <AvatarSetup
            showCameraError={cameraPerm}
            triggerCamera={() => setTriggerCamera(true)}
            {...avatar}
          />
        );
      case 3:
        const {coords: {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed}, timestamp} = profile.location.value as Position
        return (
          <>
            <div><p>I know alot about you....</p></div>
            <div><p><b>First Name</b>: {details.firstName.value}</p></div>
            <div><p><b>Last Name</b>: {details.lastName.value}</p></div>
            <div><p><b>Middle Name</b>: {details.middleName.value}</p></div>
            <div><p><b>Email</b>: {details.email.value}</p></div>
            <div><p><b>Password</b>: {details.password.value}</p></div>
            <div><p><b>Phone Number</b>: {details.phone.value}</p></div>
            <div><p><b>Address</b>: {details.address.value}</p></div>
            <div><p><b>CC Name</b>: {details.ccname.value}</p></div>
            <div><p><b>City</b>: {details.city.value}</p></div>
            <div><p><b>Province/State</b>: {details.state.value}</p></div>
            <div><p><b>Postal Code</b>: {details.zip.value}</p></div>
            <div><p><b>Location</b>: </p></div>
            <div><p><b>----coords</b>: </p>Lat-{latitude}, <b>Long-</b>{longitude}, <b>altitude-</b>{altitude}, <b>accuracy-</b>{accuracy}, <b>heading-</b>{heading}</div>
            <div><p><b>Timestamp</b>: {timestamp}</p></div>
          </>
        );
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
              disabled: !isNextEnabled()
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
            <Card.Section>
              {formContent}
              <div className={step === 3 ? "" : "hideCamera"}>
                <VideoRecorder
                  triggerCamera={triggerCamera}
                  toggleCameraEnabled={() => setCameraPerm(true)}
                  onRecordingComplete={(
                    videoBlob: any,
                    startedAt: any,
                    thumbnailBlob: any,
                    duration: any
                  ) => {
                    console.log(videoBlob, startedAt, thumbnailBlob, duration);
                  }}
                />
              </div>
            </Card.Section>
          </Card>
          <ProgressBar progress={((step + 1) / 3) * 100} />
        </Layout.Section>
      </Layout>
    </Page>
  );

  function isNextEnabled() {
    const { details, profile, avatar } = fields;
    if (step === 0) {
      return (
        details.firstName.dirty &&
        details.lastName.dirty &&
        details.password.dirty &&
        details.passwordConfirmation.dirty &&
        details.password.value == details.passwordConfirmation.value
      );
    } else if (step === 1) {
      return profile.username.dirty && profile.location.dirty;
    } else if (step === 2) {
      return avatar.photo.dirty;
    }

    return true;
  }
}
