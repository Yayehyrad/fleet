import { Row, Pagination, Col } from "antd";
import NavBar from "../components/Nav/NavBar";
import InfoCard from "../components/general/InfoCard";
import NavBox from "../components/general/NavBox";
import axios from "../Helper/axiosInstance";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Document, ObjectId } from "mongoose";
import { useState } from "react";

interface vehcil {
  _id: ObjectId;
  model: string;
  // Additional fields if you have them
}

function FleetInfo(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async (skip: number): Promise<Array<vehcil>> => {
    const response = await axios.get(`/fleet?skip=${skip}`);
    console.log(response.data);
    return response.data;
  };
  const { data, isLoading, isError, refetch } = useQuery<Array<vehcil>>(
    "Data",
    () => fetchData((currentPage - 1) * 4)
  );
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    refetch();
    // fetchData(id:Number)
  };
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (isError || data === undefined) {
  //   return <p>Error loading data</p>;
  // }
  return (
    <div>
      <NavBar />
      <NavBox title={"Registered"} />
      {!isLoading ? (
        <Row gutter={16} style={{ padding: "1vw" }}>
          {data.length > 0 ? (
            data.map((item) => {
              {
                console.log(item);
              }
              return (
                <Col
                  style={{ marginBottom: "1vw" }}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                >
                  <Link to={`/vehcil/${item._id}`}>
                    <InfoCard item={item} />
                  </Link>
                </Col>
              );
            })
          ) : (
            <div style={{ margin: "auto", fontSize: "5vw" }}>no data</div>
          )}
        </Row>
      ) : (
        "Loading"
      )}
      <Pagination
        defaultCurrent={currentPage}
        total={500}
        style={{ margin: "4vw 0", textAlign: "center" }}
        onChange={handlePaginationChange}
      />
    </div>
  );
}

export default FleetInfo;
