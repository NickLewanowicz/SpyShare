import React, { useState } from "react";
import {
  useForm,
  useField,
  submitFail,
  submitSuccess
} from "@shopify/react-form";
import useReactRouter from "use-react-router";
import { LocationButton } from "../LocationButton";

import {
  Avatar,
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField
} from "@shopify/polaris";
import { type } from "os";

export interface FieldValues {
  photo: string;
}

export type Fields = ReturnType<typeof useAvatarFields>;

export interface Props extends Fields {
  triggerCamera(): void;
  showCameraError: boolean;
}

export function AvatarSetup({ photo, showCameraError, triggerCamera }: Props) {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [loadingError, setloadingError] = useState(false);

  showCameraError && setTimeout(()=> setloadingError(true), 3000)
  loadingError && !photo.dirty && photo.onChange('asd')
  return (
    <Stack vertical>
      <FormLayout>
        <FormLayout.Group>
          <Stack vertical>
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              {!showCameraError ? (
                <Avatar size="large" initials="?" customer={false} />
              ) : (
                <div
                  style={{
                    background: "black",
                    color: 'white',
                    minWidth: 300,
                    minHeight: 300,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center"
                  }}
                >
                {loadingError ? 'Error: Cannot access camera' : 'Loading...'}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <p style={{ color: "red" }}>
                Error: Cannot retrieve image from Google Account
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Button
                primary
                disabled={showCameraError}
                onClick={() => {
                  setCameraEnabled(true);
                  triggerCamera();
                }}
              >
                Add a Profile Photo
              </Button>
            </div>
          </Stack>
        </FormLayout.Group>
      </FormLayout>
    </Stack>
  );
}

export function useAvatarFields({ photo = "" }: Partial<FieldValues> = {}) {
  return {
    photo: useField(photo)
  };
}
