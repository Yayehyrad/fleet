import React from "react";
import { Button, Typography } from "antd";
import "./NavBox.css";

function NavBox({ title }): JSX.Element {
  const { Title } = Typography;
  return (
    <div className="nav-box" style={{ background: "black", color: "white" }}>
      <Title level={1} style={{ color: "white" }}>
        {title}/Vehicles
      </Title>

      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}
      >
        <Button type="primary" ghost className="">
          Available
        </Button>
        <Button type="primary" danger ghost className="">
          On Duty
        </Button>
      </div>

      <div
        className="divider"
        style={{
          borderBottom: "1px solid #d9d9d9",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      />

      <div
        className="new-buttons"
        style={{
          background: "black",
          display: "flex",
          justifyContent: "flex-end",
          gap: "4px",
          padding: "2vh 0 2vh 0",
          borderBottom: "10vh",
        }}
      >
        <Button type="primary" ghost className="custom-button">
          New Request
        </Button>
        <Button type="primary" ghost className="custom-button">
          Order
        </Button>
        <Button type="primary" ghost className="custom-button">
          Request
        </Button>
        <Button type="primary" ghost className="custom-button">
          Downgraded
        </Button>
        <Button type="primary" ghost className="custom-button">
          Reserve
        </Button>
        <Button type="primary" ghost className="custom-button">
          Waiting
        </Button>
      </div>
    </div>
  );
}

export default NavBox;
