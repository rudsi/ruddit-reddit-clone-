import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { User } from "firebase/auth";
import Icons from "./Icons";
import UserMenu from "../UserMenu";

type RightSideProps = {
  user?:User | null;
};

const RightSide: React.FC<RightSideProps> = ({user}) => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user? <Icons /> :<AuthButtons />}
        <UserMenu />
      </Flex>
    </>
  );
};
export default RightSide;