import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getStartAndEndOfMonth } from "../Utils";
import axios from "axios";

function CostDisplay({ timeFrame, updateVariable }) {
  const [amountSpent, setAmountSpent] = useState(null);

  // Fetch items when the component mounts
  useEffect(() => {
    let endDate = null;
    let startDate = null;
    const fetchAmountSpent = async () => {
      if (timeFrame === "month") {
        const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();
        endDate = endOfMonth;
        startDate = startOfMonth;
      } else if (timeFrame === "year") {
        endDate = new Date();
        startDate = new Date(endDate.getFullYear(), 1, 1);
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/items/amount-spent",
          {
            params: { startDate, endDate },
          }
        );
        setAmountSpent(response.data.cost);
      } catch (error) {
        console.error("Error fetching amount spent:", error);
      }
    };

    fetchAmountSpent();
  }, [updateVariable]);

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      textAlign="center"
    >
      <Text fontSize="2rem" fontWeight="bold">
        You spent ${amountSpent} this {timeFrame} on food
      </Text>
    </Flex>
  );
}

export default CostDisplay;
