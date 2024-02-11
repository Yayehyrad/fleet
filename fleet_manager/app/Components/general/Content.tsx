"use client";
import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  DatePicker,
  ColorPicker,
} from "antd";
import { useQuery, useMutation } from "react-query";
import axios from "@/Helper/axiosInstance";

const Content = () => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const mutation = useMutation<string, unknown, { newData: object }>(
    async ({ newData }) => {
      const response = await axios.post("/fleet", newData);
      return response.data;
    },
    {
      onSuccess: () => {},
    }
  );
  const onFinish = async (values: object) => {
    console.log("Success:", values);
    const a = await mutation.mutateAsync({ newData: values });
    if (a) {
      message.success("Added");
    }
    console.log(a);
    form.resetFields();
  };

  const onFinishFailed = async (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "60vw",
        margin: "auto",
        padding: "10px",
        paddingTop: "2vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Vechils Detail</h1>
      <Form
        className="custom-form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        labelCol={{ span: 4 }}
        form={form}
      >
        {/* <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true }]}
          style={{ height: "5vh" }}
        >
          <Select placeholder={"eg. Toyota"} style={{ height: "5vh" }}>
            <Select.Option value="Toyota">Toyota</Select.Option>
          </Select>
        </Form.Item> */}
        {/* <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="License"
          name="license"
          rules={[
            { required: true },
            { max: 20 },
            { min: 5 },
            { message: "please enter the plate" },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input style={{ height: "5vh" }} />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Select placeholder={"eg. New"} style={{ height: "5vh" }}>
            <Select.Option value="New">New</Select.Option>
            <Select.Option value="sales">Sales</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="(ODO):"
          name="LastOMeter"
          rules={[
            { required: true },
            { message: "please last odo meter in km" },
            { whitespace: true },
          ]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          hasFeedback
        >
          <Input type="number" style={{ height: "5vh" }} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          // rules={[
          //   { required: false },
          //   { message: "date is required" },
          //   { type: "date" },
          // ]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <DatePicker picker="date" style={{ width: "100%", height: "5vh" }} />
        </Form.Item>

        <Form.Item
          label="Chassie:"
          name="chassieNumber"
          rules={[
            { required: true },
            { max: 20 },
            { min: 5 },
            { message: "please enter the chassie" },
            { whitespace: true },
          ]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          hasFeedback
        >
          <Input style={{ height: "5vh" }} />
        </Form.Item>

        <Form.Item
          label="Seat:"
          name="seatNumber"
          rules={[
            { required: true },
            { message: "required" },
            { whitespace: true },
          ]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          hasFeedback
        >
          <Input type="number" style={{ height: "5vh" }} />
        </Form.Item>

        <Form.Item
          label="doors:"
          name="doorsNumber"
          rules={[
            { required: true },
            { message: "required" },
            { whitespace: true },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            height: "70px",
            fontSsize: "xx-large",
          }}
          hasFeedback
        >
          <Input
            type="number"
            style={{ width: "100%", height: "5vh", fontSize: "16px" }}
          />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          // rules={[{ required: false }, { message: "required" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <ColorPicker picker="color" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="Secdate"
          // rules={[
          //   { required: false },
          //   { message: "date is required" },
          //   { type: "date" },
          // ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px) ",
          }}
        >
          <DatePicker picker="date" style={{ width: "100%", height: "5vh" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Content;
