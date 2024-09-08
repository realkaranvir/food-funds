import React, { useState } from "react";
import ItemTable from "../Components/ItemTable";
import AddItem from "../Components/AddItem";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import DashboardSection from "../Components/DashboardSection";
import {
  primaryColor,
  accentOne,
  textColor2,
  accentTwo,
} from "../themeSettings";
import CostDisplay from "../Components/CostDisplay";

function HomePage() {
  const [updateDashboard, setUpdateDashboard] = useState(false); //When an item is added, flip the value, updating all dashboard items
  return (
    <VStack p={2} bg={primaryColor}>
      <DashboardSection
        titlesArray={["Name", "Expiration"]}
        Contents={<ItemTable updateVariable={updateDashboard} />}
      />
      <DashboardSection
        Contents={
          <CostDisplay updateVariable={updateDashboard} timeFrame={"month"} />
        }
        updateVariable={updateDashboard}
      />

      <AddItem updateFunction={setUpdateDashboard} />
    </VStack>
  );
}

export default HomePage;
