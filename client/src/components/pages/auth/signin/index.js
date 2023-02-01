import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const { login } = useAuth();
  let negative = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse)
        negative("../")
        console.log(loginResponse);
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" justifyContent="center" width="full">
        <Box pt="10">
          <Box textAlign="center">
            <Heading>SignUp</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box textAlign="left" my="5">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>
              <Button type="submit" mt="4" width="full" colorScheme="pink">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
