import React from "react";
import {
  useForm,
  useField,
  submitFail,
  submitSuccess
} from "@shopify/react-form";
import useReactRouter from "use-react-router";
import { LocationButton } from "../LocationButton";

import {
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
  username: string;
  location: Position | boolean;
}

export type Fields = ReturnType<typeof useProfileFields>;

export function ProfileInfo({ username, location }: Fields) {
  return (
    <Stack vertical>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            label="Username"
            helpText="🔒 Private by default."
            name="fname"
            {...username}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <LocationButton
            onSuccess={position => location.onChange(position)}
            onError={error => {
              location.onChange(true);
              console.log(`Error ${error}`);
            }}
          />
        </FormLayout.Group>
      </FormLayout>
    </Stack>
  );
}

export function useProfileFields({
  username = "",
  location = false
}: Partial<FieldValues> = {}) {
  return {
    username: useField(username),
    location: useField(location)
  };
}
