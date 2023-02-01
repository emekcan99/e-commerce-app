import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Button, Text } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { useBasket } from "../../../contexts/BasketContext";

function ProductDetails() {
  const { product_id } = useParams();
  const {addToBasket, items} = useBasket();

  const findInBasket = items.find((item)=> item._id === product_id )
  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  //console.log(data);
  const images = data.photos.map((url) => ({ original: url }));
  return (
    <div>
      <Text as="h2" fontSize="3xl">
        {data.title}
      </Text>

      <Box margin="5">
        <ImageGallery items={images}></ImageGallery>
      </Box>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
      <p>{data.description}</p>
      <Button colorScheme={findInBasket ? "pink" : "green"} onClick={()=>addToBasket(data,findInBasket)}>{
        findInBasket ? "Remove From Basket" : "Add To Basket"
      }
      </Button>
    </div>
  );
}

export default ProductDetails;
