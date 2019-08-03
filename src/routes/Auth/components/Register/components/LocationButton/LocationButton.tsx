import React, { useState } from "react";
import { Button, Modal, Stack } from "@shopify/polaris";

interface Props {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  onSuccess(arg0: Position): void;
  onError(arg0: PositionError): void;
}

export function LocationButton({
  enableHighAccuracy = true,
  timeout = Infinity,
  maximumAge = 10000,
  onSuccess,
  onError
}: Props) {
  const [fetchingPosition, setFetchingPosition] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [blockSubmit, setBlockSumbit] = useState(false);

  hasLocationPermission();
  if (typeof window !== "object") {
    return null;
  }

  if (!("geolocation" in window.navigator)) {
    console.log("has perm");
    return <>Position gottem</>;
  }

  return (
    <Stack>
      <Button
        icon={locationPermission ? "checkmark" : "add"}
        disabled={locationPermission}
        loading={fetchingPosition}
        onClick={getCurrentPosition}
      >
        Add Location
      </Button>

      {blockSubmit && (
        <p>
          It looks like you denied our location request, this will impact the
          quality of service we can provide you. Please click{" "}
          <Button plain onClick={() => setLocationPermission(true)}>
            bypass
          </Button>{" "}
          to ignore.
        </p>
      )}
    </Stack>
  );

  async function getCurrentPosition() {
    setFetchingPosition(true);

    return await window.navigator.geolocation.getCurrentPosition(
      position => {
        setFetchingPosition(false);
        onSuccess(position);
      },
      error => {
        setFetchingPosition(false);
        onError(error);
      },
      { enableHighAccuracy, timeout, maximumAge }
    );
  }

  async function hasLocationPermission() {
    const nav: any = window.navigator;
    const perm: PermissionStatus = await nav.permissions.query({
      name: "geolocation"
    });
    if (perm.state === "granted") {
      setLocationPermission(true);
    } else if (perm.state === "denied") {
      setBlockSumbit(true);
    }
  }
}
