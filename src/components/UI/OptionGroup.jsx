import { Button, Box, Divider } from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import Input from "./Input";
import styled from "styled-components";

export default function OptionGroup({
  optionNumber,
  title,
  subtitle,
  label,
  quantity,
  discountType,
  amount,
  register,
  handleDeleteOption,
}) {
  return (
    <>
      <Box
        shadow="300"
        background="bg-fill"
        padding={"400"}
        position="relative"
      >
        <OptionGroupLabel>Option {optionNumber}</OptionGroupLabel>
        <OptionGroupWrapper>
          <Column>
            <Input
              label={"title"}
              defaultValue={title}
              type="text"
              optionNumber={optionNumber}
              register={register}
            ></Input>
            <Input
              label={"quantity"}
              defaultValue={quantity}
              type="number"
              optionNumber={optionNumber}
              register={register}
            ></Input>
          </Column>
          <Column>
            <Input
              label={"subtitle"}
              defaultValue={subtitle}
              type="text"
              optionNumber={optionNumber}
              register={register}
            ></Input>
            <Input
              label={"discountType"}
              defaultValue={discountType}
              type="select"
              optionNumber={optionNumber}
              register={register}
            ></Input>
          </Column>
          <Column>
            <Input
              label={"label"}
              defaultValue={label}
              type="text"
              optionNumber={optionNumber}
              register={register}
            ></Input>
            {discountType === "none" ? null : (
              <Input
                label={"amount"}
                defaultValue={amount}
                type="number"
                unit={discountType === "%Discount" ? "%" : "$"}
                optionNumber={optionNumber}
                register={register}
              ></Input>
            )}
          </Column>
        </OptionGroupWrapper>
        <Box position="absolute" insetBlockStart={"100"} insetInlineEnd={"200"}>
          <Button
            size="large"
            variant="monochrome"
            fullWidth
            style={{ padding: "0px" }}
            onClick={() => handleDeleteOption(optionNumber)}
          >
            <Box width="35px">
              <DeleteIcon></DeleteIcon>
            </Box>
          </Button>
        </Box>
      </Box>
      <Divider borderWidth="100"></Divider>
    </>
  );
}

const OptionGroupWrapper = styled.div`
  margin: 36px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const OptionGroupLabel = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 36px;
  width: 115px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 0 0 8px 0;
  background-color: rgba(239, 77, 47, 1);
`;
const Column = styled.div`
  width: min-content;
`;
