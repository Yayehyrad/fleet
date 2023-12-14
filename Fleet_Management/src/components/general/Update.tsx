import React from "react";
import { Form, Input, Button, Card } from "antd";
import { CarOutlined } from "@ant-design/icons";

interface CarInfoFormProps {
  initialValues: {
    model: string;
    licensePlate: string;
    LOM: number;
    chassieNumber: string;
    seatNumber: number;
  };
  onSubmit: (values: object) => void;
  handleClick: () => void;
}

const CarInfoForm: React.FC<CarInfoFormProps> = ({
  initialValues,
  onSubmit,
  handleClick,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: object) => {
    onSubmit(values);
  };

  return (
    <Card title={<CarOutlined />}>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="model" label="Model" rules={[{}]}>
          <Input />
        </Form.Item>

        <Form.Item name="licensePlate" label="License Plate" rules={[{}]}>
          <Input />
        </Form.Item>

        <Form.Item name="LOM" label="Last Odometer Reading" rules={[]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="chassieNumber"
          label="Chassis Number"
          rules={[{ message: "Please enter the chassis number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="seatNumber" label="Seat Number" rules={[]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Information
          </Button>
          <Button type="" onClick={handleClick}>
            Done
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CarInfoForm;
