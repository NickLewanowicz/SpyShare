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
  photo: string;
}

export type Fields = ReturnType<typeof useProfileFields>;

export function ProfileInfo({ username, photo }: Fields) {
  return (
    <Stack vertical>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            label="Username"
            helpText="🔒 This information is private by default."
            name="fname"
            {...username}
          />
        </FormLayout.Group>
        <FormLayout.Group>
        <LocationButton onSuccess={(position)=>console.log(`Success`,position)} onError={(error)=>console.log(`Error ${error}`)} />

        </FormLayout.Group>
      </FormLayout>
    </Stack>
  );
}

export function useProfileFields({
  username = "",
  photo = ""
}: Partial<FieldValues> = {}) {
  return {
    username: useField(username),
    photo: useField(photo)
  };
}
