import React, { useState } from "react";
import ItemTable from "../Components/ItemTable";
import AddItem from "../Components/AddItem";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { CostDisplayTypes } from "../Enums";
import {
  Box,
  VStack,
  Text,
  Flex,
  HStack,
  Button,
  useDisclosure,
  Select,
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
  const [timeframe, setTimeFrame] = useState(7); //Timeframe for Expiring Soon list

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
          title="Expiring Soon"
          Contents={
            <ItemTable
              updateVariable={updateDashboard}
              foodSorterFunction={(foodOne, foodTwo) =>
                new Date(foodOne.expiration_date) -
                new Date(foodTwo.expiration_date)
              }
              foodFilterFunction={(food) => {
                //Only get foods that are expiring within a week
                const today = new Date();
                const expirationDate = new Date(food.expiration_date);
                const oneWeekFromToday = new Date(today);
                oneWeekFromToday.setDate(today.getDate() + timeframe);

                return expirationDate <= oneWeekFromToday;
              }}
            />
          }
        />
        <DashboardSection
          Contents={
            <CostDisplay
              updateVariable={updateDashboard}
              type={CostDisplayTypes.SUM_LAST_MONTH}
            />
          }
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
