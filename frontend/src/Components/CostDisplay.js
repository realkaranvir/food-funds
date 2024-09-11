import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getStartAndEndOfMonth } from "../Utils";
import axios from "axios";
import { CostDisplayTypes } from "../Enums";
import { accentTwo } from "../themeSettings";

function CostDisplay({ type, updateVariable }) {
  const [amountSpent, setAmountSpent] = useState(null);

  // Fetch items when the component mounts
  useEffect(() => {
    let endDate = null;
    let startDate = null;
    const fetchAmountSpent = async () => {
      if (type === CostDisplayTypes.SUM_LAST_MONTH) {
        const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();
        endDate = endOfMonth;
        startDate = startOfMonth;
      } else if (type === CostDisplayTypes.SUM_LAST_YEAR) {
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

  if (!amountSpent) {
    return (
      <Flex
        justify="center"
        align="center"
        textAlign="center"
        h="100%"
        color={accentTwo}
      >
        No Data
      </Flex>
    );
  }

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      textAlign="center"
      p={3}
    >
      {type === CostDisplayTypes.SUM_LAST_MONTH && (
        <Text fontSize="2rem" fontWeight="bold">
          You Spent ${amountSpent} This Month On Food
        </Text>
      )}
      {type === CostDisplayTypes.SUM_LAST_YEAR && (
        <Text fontSize="2rem" fontWeight="bold">
          You Spent ${amountSpent} This Year On Food
        </Text>
      )}
    </Flex>
  );
}

export default CostDisplay;
