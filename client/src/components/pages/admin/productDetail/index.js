import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import validationSchema from "./validations";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import { message } from "antd";
function ProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error-{error}</div>;
  }

  console.log(data);

  const handleSubmit = async (values, bag) => {
    console.log("submitted");
    message.loading({content:"Loading...",key:"product_update"});
    try{
        await updateProduct(values,product_id);
        message.success({
            content:"The product successfully updated",
            key:"product_update",
            duration:2,
        })
    }catch(e){
        message.error("The product does not updated ")
    }
  };
  return (
    <div>
      <Text fontSize="2xl">Edit</Text>

      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          touched
        }) => (
          <>
            <Box>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid = {touched.title && errors.title}
                    ></Input>
                    {touched.title && errors.title && <Text color="red.500">{errors.title}</Text>}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>desciription</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid = {touched.description && errors.description}
                    ></Textarea>
                    {touched.description && errors.description && <Text color="red.500">{errors.description}</Text>}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid = {touched.price && errors.price}
                    ></Input>
                    {touched.price && errors.price && <Text color="red.500">{errors.price}</Text>}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                ></Input>
                                <Button
                                  ml="4"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button mt="5" onClick={() => arrayHelpers.push("")}>
                            Add a photo
                          </Button>
                        </div>
                      )}
                    ></FieldArray>
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default ProductDetail;
