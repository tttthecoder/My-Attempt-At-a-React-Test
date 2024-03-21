import {
  Layout,
  Button,
  Page,
  Text,
  Icon,
  Box,
  Divider,
  InlineStack,
} from "@shopify/polaris";
import { ArrowLeftIcon } from "@shopify/polaris-icons";
import React from "react";
import styled from "styled-components";
import OptionGroup from "./UI/OptionGroup";
import { useForm } from "react-hook-form";
import PreviewPanel from "./UI/PreviewPanel";
import { PlusCircleIcon } from "@shopify/polaris-icons";
import Input from "./UI/Input";
export default function CampaignForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      general: {
        campaign: "",
        title: "",
        description: "",
      },
      options: [
        {
          title: "",
          subtitle: "",
          label: "",
          quantity: "",
          discountType: "none",
          amount: "",
        },
        {
          title: "",
          subtitle: "",
          label: "",
          quantity: "",
          discountType: "%Discount",
          amount: "",
        },
      ],
    },
  });
  const { options, general } = watch();
  options.forEach((option) => {
    if (option.discountType === "none") {
      option.amount = "";
    }
  });
  const onSubmit = async (data) => {
    // const { options } = data;

    // console.log(quantity, amount);
    // if (Number(quantity) !== "number") {
    //   setError({
    //     name: "quantity",
    //     shouldFocus: true,
    //     error: {
    //       type: "wrong-type",
    //       message: "Quantity has to be a number",
    //     },
    //   });
    //   return;
    // }
    // if (Number(amount) !== "number") {
    //   setError({
    //     name: "quantity",
    //     shouldFocus: true,
    //     error: {
    //       type: "wrong-type",
    //       message: "Quantity has to be a number",
    //     },
    //   });
    //   return;
    // }
    try {
      // reset();
      const response = await fetch("http://localhost:3000", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(JSON.stringify(data));
  };
  function handleDeleteOption(optionNumber) {
    if (options.length === 1) return;
    const newOptions = [...options];
    newOptions.splice(optionNumber - 1, 1);
    const newFormValues = {
      general: { ...general },
      options: newOptions,
    };
    reset(newFormValues);
  }
  function handleAddOption() {
    const newOptions = [...options];
    newOptions.push({
      title: "",
      subtitle: "",
      label: "",
      quantity: "",
      discountType: "none",
      amount: "",
    });
    const newFormValues = {
      general: { ...general },
      options: newOptions,
    };
    reset(newFormValues);
  }
  return (
    <Page fullWidth>
      <InlineStack blockAlign="center" align="start" gap={"200"}>
        <Box padding={"100"} borderRadius="100" borderWidth="1px">
          <Icon source={ArrowLeftIcon}></Icon>
        </Box>

        <Text alignment="start" variant="headingXl">
          Create Volume Discount
        </Text>
        <Box minHeight="60px"></Box>
      </InlineStack>
      <Layout>
        <Layout.Section variant="twoThird">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              shadow="300"
              background="bg-fill"
              padding={"500"}
              borderRadius="200"
            >
              <Text variant="headingMd" alignment="start">
                General
              </Text>
              <Input
                label={"campaign"}
                defaultValue={general.campaign}
                type="text"
                general
                // optionNumber={optionNumber}
                register={register}
              ></Input>
              <Input
                label={"title"}
                defaultValue={general.title}
                type="text"
                general
                // optionNumber={optionNumber}
                register={register}
              ></Input>
              <Input
                label={"description"}
                defaultValue={general.description}
                type="text"
                general
                // optionNumber={optionNumber}
                register={register}
              ></Input>
            </Box>
            <Divider borderWidth="100"></Divider>
            <Box
              background="bg-fill"
              padding={"400"}
              borderStartStartRadius="200"
              borderStartEndRadius="200"
            >
              <Text variant="headingMd" alignment="start">
                Volume Discount Rule
              </Text>
            </Box>
            <Divider borderWidth="100"></Divider>
            {options.map((option, index) => (
              <OptionGroup
                {...option}
                key={index}
                optionNumber={index + 1}
                register={register}
                handleDeleteOption={handleDeleteOption}
              ></OptionGroup>
            ))}
            <Box
              background="bg-fill"
              padding={"300"}
              borderEndEndRadius="200"
              borderEndStartRadius="200"
              color="bg-fill"
            >
              <ButtonWrapper>
                <Button
                  variant="monochome"
                  fullWidth
                  icon={PlusCircleIcon}
                  onClick={handleAddOption}
                  submit={false}
                >
                  Add Option
                </Button>
              </ButtonWrapper>
            </Box>
            <Box padding={"500"}>
              <Button tone="success" size="large" submit={"submit"}>
                Save Campaign
              </Button>
            </Box>
          </form>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <PreviewPanel
            campaignTitle={general.title}
            campaignDescription={general.description}
            options={options}
          ></PreviewPanel>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  height: 36px;

  border-radius: 4px;
  background-color: rgba(239, 77, 47, 1);
`;
