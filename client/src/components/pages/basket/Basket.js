import React, { useState } from "react";
import { useBasket } from "../../../contexts/BasketContext";
import {
  Alert,
  Box,
  Grid,
  Text,
  Image,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import "./basket.css";
import { postOrder } from "../../api";
function Basket() {
  const [address, setAddress] = useState("")
  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const handleSubmitForm =async() =>{
    const itemIds = items.map((item) => item._id)

    const input = {
      address,
      items: JSON.stringify(itemIds)
    };

    const response = await postOrder(input);
    emptyBasket()
    onClose()
    console.log(response)
  }
  console.log(items);
  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  return (
    <>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket</Alert>
      )}
      {items.length > 0 && (
        <Grid templateColumns="repeat(3,1fr)" gap={3}>
          {items.map((item) => (
            <Box mt={5} key={item._id}>
              <Text as="h1">{item.title}</Text>
              <Image
                htmlWidth={300}
                src={item.photos[0]}
                alt="basket item"
                loading="lazy"
              ></Image>
              <Heading>{item.price}-TL</Heading>
              <Button
                colorScheme="pink"
                onClick={() => removeFromBasket(item._id)}
              >
                Remove From Basket
              </Button>
            </Box>
          ))}
          <Box className="total">
            <Heading textAlign="center" padding={2}>
              Total:{total}-TL
            </Heading>
            <Button colorScheme="green" onClick={onOpen}>Order</Button>
          </Box>
        </Grid>
      )}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea ref={initialRef} placeholder="Address" value={address} onChange={(e)=> setAddress(e.target.value)} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitForm} >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Basket;
