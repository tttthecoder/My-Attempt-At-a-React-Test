import { Layout, TextField, Select, Text } from "@shopify/polaris";
import styled from "styled-components";
const Input = ({
  label,
  unit = null,
  register,
  optionNumber,
  general = false,
  ...otherProps
}) => {
  const isSelect = otherProps.type === "select";
  const isInputRequired =
    label === "campaign" ||
    label === "title" ||
    label === "quantity" ||
    label === "amount";
  return (
    <InputWrapper>
      <Text variant="bodyLg" fontWeight="semiBold" alignment="start">
        {label.charAt(0).toUpperCase() +
          label.slice(1) +
          `${unit ? "(" + unit + ")" : ""}`}
      </Text>
      {isSelect ? (
        <StyledSelect {...register(`options.${optionNumber - 1}.${label}`)}>
          <option value="none">None</option>
          <option value="%Discount">% Discount</option>
          <option value="discountEach">Discount / Each</option>
        </StyledSelect>
      ) : (
        <StyledInput
          style={{ "--width": general ? "100%" : "180px" }}
          {...otherProps}
          id={label}
          {...register(
            general
              ? `general.${label}`
              : `options.${optionNumber - 1}.${label}`,
            {
              required: isInputRequired,
            }
          )}
        />
      )}
    </InputWrapper>
  );
};
const StyledInput = styled.input`
  width: var(--width);
  height: 36px;
`;
const Unit = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
`;
const InputWrapper = styled.div`
  position: relative;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
  align-items: flex-start;
`;
const StyledSelect = styled.select`
  width: 180px;
  height: 36px;
`;
export default Input;
