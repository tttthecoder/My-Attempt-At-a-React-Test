import { Page, Text, Card, DataTable, Box, Scrollable } from "@shopify/polaris";
import styled from "styled-components";
export default function PreviewPanel({
  campaignTitle,
  campaignDescription,
  options,
}) {
  const rowsData = options.map((option) => {
    const row = [];
    row.push(option.title);
    row.push(option.discountType);
    row.push(option.quantity);
    row.push(option.amount);
    return row;
  });
  return (
    <Box shadow="300" background="bg-fill" padding={"500"} borderRadius="200">
      <Text variant="headingMd" alignment="start">
        Preview
      </Text>
      <Box padding={300}></Box>
      <Text variant="headingMd" alignment="center">
        {campaignTitle}
      </Text>
      <Box padding={300}></Box>
      <Text variant="headingSm" alignment="start">
        {campaignDescription}
      </Text>
      <Box padding={200}></Box>
      <DataTable
        columnContentTypes={["text", "text", "number", "number"]}
        headings={["Title", "Discount Type", "Quantity", "Amount"]}
        hideScrollIndicator
        rows={rowsData}
      />
      <Box padding={200}></Box>
    </Box>
  );
}
