import React, { useState } from "react";
import ItemTable from "../Components/ItemTable";
import AddItem from "../Components/AddItem";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  VStack,
  Text,
  Flex,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardSection from "../Components/DashboardSection";
import { primaryColor } from "../themeSettings";
import CostDisplay from "../Components/CostDisplay";
import ModalComponent from "../Components/ModalComponent";

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateDashboard, setUpdateDashboard] = useState(false); //When an item is added, flip the value, updating all dashboard items
  const updateDashboardFunction = () => {
    setUpdateDashboard(!updateDashboard);
  };
  return (
    <Flex
      align={{ base: "center", md: "" }}
      justify="center"
      direction={{ base: "column", md: "row" }}
      gap="20px"
      p={2}
      minHeight="100vh"
    >
      <Flex
        justify="center"
        wrap="wrap"
        direction={{ base: "column", md: "row" }}
        gap="20px"
      >
        <DashboardSection
          titlesArray={["Name", "Expiration"]}
          Contents={<ItemTable updateVariable={updateDashboard} />}
        />
        <DashboardSection
          Contents={
            <CostDisplay updateVariable={updateDashboard} timeFrame={"month"} />
          }
        />
        <DashboardSection
          titlesArray={["Name", "Expiration"]}
          Contents={<ItemTable updateVariable={updateDashboard} />}
        />
        <DashboardSection
          titlesArray={["Name", "Expiration"]}
          Contents={<ItemTable updateVariable={updateDashboard} />}
        />
      </Flex>
      <ModalComponent
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        content={<AddItem updateFunction={updateDashboardFunction} />}
      />
      <Button
        position="fixed"
        bottom={0}
        right={0}
        m={3}
        borderRadius="100%"
        p={0}
        boxShadow="0 0 10px rgba(0, 0, 0, 0.4)"
        onClick={onOpen}
      >
        <AddIcon />
      </Button>
    </Flex>
  );
}

export default HomePage;
