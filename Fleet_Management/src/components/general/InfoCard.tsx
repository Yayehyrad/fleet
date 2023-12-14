import { Avatar, Card, Button, Col } from "antd";
import React from "react";

const { Meta } = Card;

interface itemPrpos {
  item: object;
  // Additional fields if you have them
}

const InfoCard: React.FC<itemPrpos> = ({ item }) => {
  return (
    <Card
      type="inner"
      hoverable
      cover={
        <img
          alt="example"
          src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      }
      //   cover={<div style={{ width: "100%", padding: "10px" }}>Car1</div>}
    >
      <Meta
        avatar={
          <Avatar src="https://images.unsplash.com/photo-1546545817-27f0fb006153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        }
        style={{ width: "10vw" }}
        title="Model"
        description="This is the description"
      />
      <p>Model : {item.model}</p>
      <p>Licence Plate : {item.licensePlate}</p>
      <p>
        <span> chassi number : {item.chassieNumber} </span>
      </p>
      <p>
        <span>LOM(km) : {item.LOM}</span>
      </p>
      <p>Tags : {item.tags}</p>
    </Card>
  );
};

export default InfoCard;
