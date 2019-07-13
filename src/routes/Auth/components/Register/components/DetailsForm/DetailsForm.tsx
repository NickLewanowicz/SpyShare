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
import { type } from "os";

export interface FieldValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardNumber: string;
}

export type Fields = ReturnType<typeof useDetailFields>;

export function DetailsForm({
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
}: Fields) {
  return (
    <Stack vertical>
      <FormLayout>
        <FormLayout.Group>
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
  );
}

export function useDetailFields({
  firstName = "",
  lastName = "",
  email = "",
  password = "",
  passwordConfirmation = "",
  phone = "",
  address = "",
  city = "",
  state = "",
  zip = "",
  country = "",
  cardNumber = ""
}: Partial<FieldValues> = {}) {
  return {
    firstName: useField(firstName),
    lastName: useField(lastName),
    email: useField(email),
    password: useField(password),
    passwordConfirmation: useField(passwordConfirmation),
    phone: useField(phone),
    address: useField(address),
    city: useField(city),
    state: useField(state),
    zip: useField(zip),
    country: useField(country),
    cardNumber: useField(cardNumber)
  };
}
