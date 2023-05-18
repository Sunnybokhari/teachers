import { PatchCheck } from "react-bootstrap-icons";
import { PersonCheck } from "react-bootstrap-icons";
import { BarChartLine } from "react-bootstrap-icons";
import { Journals } from "react-bootstrap-icons";

import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { mobile, desktop } from "../../responsive";

const Container = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  ${desktop({ width: "95%" })}
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Right = styled.div`
  display: block;
  flex: 1;
  align-items: center;
`;

const Image = styled.img`
  width: 550px;
  height: 700px;
`;

const Heading = styled.div`
  margin-top: 100px;
  margin-left: 50px;
`;

const Points = styled.div`
  margin-top: 20px;
  display: block;
  margin-left: 50px;
`;

const Point = styled.div`
  display: inline-flex;
`;

const Circle = styled.div`
  display: flex;
  background-color: blue;
  width: 80%;
  height: 70%;
  border-radius: 70px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Advertisment = () => {
  return (
    <Container>
      <Left>
        <Image src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></Image>
      </Left>
      <Right>
        <Heading>
          <p className="headerP">CAMBRIDGE EXAMINATIONS</p>
          <h1>We Are the Best Exam Practice Website</h1>
        </Heading>

        <Points>
          <Row>
            <Point>
              <Col sm={2}>
                <Circle>
                  <PatchCheck color="white" size={45} />
                </Circle>
              </Col>
              <Col sm={8}>
                <h4>Automated Marking</h4>
                <p className="adP">
                  Save time and increase accuracy with our automated marking
                  system.
                </p>
              </Col>
            </Point>
          </Row>
          <Row>
            <Point>
              <Col sm={2}>
                <Circle>
                  <PersonCheck color="white" size={40} />
                </Circle>
              </Col>
              <Col sm={8}>
                <h4>Expert Teachers</h4>
                <p className="adP">
                  Benefit from the expertise of our world-class teachers and
                  take your learning to the next level.
                </p>
              </Col>
            </Point>
          </Row>
          <Row>
            <Point>
              <Col sm={2}>
                <Circle>
                  <BarChartLine color="white" size={40} />
                </Circle>
              </Col>
              <Col sm={8}>
                <h4>Student Analytics</h4>
                <p className="adP">
                  Maximize student success with our comprehensive student
                  analytics system.
                </p>
              </Col>
            </Point>
          </Row>
          <Row>
            <Point>
              <Col sm={2}>
                <Circle>
                  <Journals color="white" size={40} />
                </Circle>
              </Col>
              <Col sm={8}>
                <h4>Topical Papers</h4>
                <p className="adP">
                  Learn at your own pace with our flexible online lecture
                  platform.
                </p>
              </Col>
            </Point>
          </Row>
        </Points>
      </Right>
    </Container>
  );
};

export default Advertisment;
