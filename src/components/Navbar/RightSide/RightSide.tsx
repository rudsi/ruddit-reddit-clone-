import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

type RightSideProps = {

};

const RightSide: React.FC<RightSideProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightSide;