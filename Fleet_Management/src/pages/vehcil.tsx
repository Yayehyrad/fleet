import React, { useState } from "react";
import axios from "../Helper/axiosInstance";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import App from "../components/general/Carusel";
import NavBar from "../components/Nav/NavBar";
import { CarOutlined } from "@ant-design/icons";
import { Popconfirm, message, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import CarInfoForm from "../components/general/Update";
import Image from "../components/general/image";

interface MyData {
  model: string;
  licensePlate: string;
  LOM: number;
  chassieNumber: string;
  seatNumber: number;
}

const fetchData = async (id: string | undefined): Promise<MyData> => {
  const response = await axios.get<MyData>(`/fleet/${id}`);
  console.log(response);
  return response.data;
};
const Vehcil: React.FC = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const handleDelete = async (itemId: string | undefined) => {
    try {
      const status = await axios.delete(`/fleet/${itemId}`);
      if (status.data) {
        message.success("Item deleted successfully");
        navigate("/Fleet");
      }
    } catch (error) {
      // Handle deletion error
      message.error("Error deleting item");
      console.error("Delete error:", error);
    }
  };

  const { vehcilId } = useParams<{ vehcilId: string }>();
  console.log(vehcilId);
  fetchData(vehcilId);
  const { data, isLoading, error, refetch } = useQuery<MyData, Error>(
    ["myData", vehcilId],
    () => fetchData(vehcilId)
  );
  const onSubmit = async (data: object) => {
    try {
      const status = await axios.patch(`/fleet/${vehcilId}`, data);
      if (status.data) {
        message.success("Item updated successfully");
      }
    } catch (error) {
      // Handle deletion error
      message.error("Error deleting item");
      console.error("Delete error:", error);
    }
    refetch();
  };
  const handleClick = () => {
    setEdit((prev) => !prev);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || data === undefined) {
    return <div>"Some thing went wrong"</div>;
  }

  return (
    <div>
      {edit ? (
        <div>
          <NavBar title={""} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 style={{ textAlign: "center" }}>EDIT DETAIS</h1>
            <Image />
            <CarInfoForm
              initialValues={data}
              onSubmit={onSubmit}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        <div>
          <NavBar />
          <App
            image={
              "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <div>
            <div style={{}}>
              <Card
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CarOutlined
                      style={{ fontSize: "24px", marginRight: "12px" }}
                    />
                    <h1 style={{ margin: 0 }}>Model: {data.model}</h1>
                  </div>
                }
                style={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "auto",
                  marginBottom: "0",
                  height: "40vh",
                  overflow: "auto",
                }}
              >
                <p style={{ fontSize: "1.7vw" }}>
                  <strong>License Plate:</strong> {data.licensePlate}
                </p>
                <p style={{ fontSize: "1.7vw" }}>
                  <strong>Last Odometer:</strong> {data.LOM}
                </p>
                <p style={{ fontSize: "1.7vw" }}>
                  <strong>Chassis Number:</strong> {data.chassieNumber}
                </p>
                <p style={{ fontSize: "1.7vw" }}>
                  <strong>Seat Number:</strong> {data.seatNumber}
                </p>
              </Card>
            </div>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                gap: "2px",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleClick} type="primary" size="large">
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this item?"
                onConfirm={() => handleDelete(vehcilId)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger size="large">
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehcil;
