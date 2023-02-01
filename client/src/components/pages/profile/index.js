import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { User,logout } = useAuth();
  
  let navigate = useNavigate();
	const handleLogout = async () => {
		logout(() => {
			navigate("../");
		});
	};
  return (
    <div>
      <Text as="h2">Profile</Text>
      <br></br>
      <code>{JSON.stringify(User)}</code>
      <br></br>
      <br></br>
      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
}

export default Profile;
