import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

function Error404() {
  return (
    <div>
      <Alert status="error">
        <AlertIcon></AlertIcon>
        <AlertTitle mr={2}>Error404</AlertTitle>
        <AlertDescription>This page was not found.</AlertDescription>
      </Alert>
    </div>
  );
}

export default Error404;
