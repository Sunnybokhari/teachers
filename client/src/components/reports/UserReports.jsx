import React from "react";
import { message, Modal, Table, Tabs } from "antd";
import { Button } from "react-bootstrap";
import { getAllReports, getAllReportsByUser } from "../../apiCalls/reports";
import {
  getAllReportsByUserT,
  getReportById,
  getAllReportsT,
} from "../../apiCalls/theoryReports";
import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../home/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Footer from "../home/Footer";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { mobile, desktop } from "../../responsive";

const { TabPane } = Tabs;

const Container = styled.div`
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 15px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  ${desktop({ width: "95%" })}
`;

function UserReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const [reportsDataT, setReportsDataT] = React.useState([]);
  const [selectedreportsDataT, setSelectedReportsDataT] = React.useState();
  const [selectedReport, setSelectedReport] = React.useState([]);
  const [reports = [], setReports] = React.useState([]);
  const [reportId, setReportId] = React.useState(null);
  const history = useHistory();
  const [globalReportsData, setGlobalReportsData] = React.useState([]);
  const [globalReportsDataT, setGlobalReportsDataT] = React.useState([]);

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => (
        <>
          {record.exam.class} {record.exam.subject} {record.exam.name}
          {", "}
          {record.exam.year}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Percentage",
      dataIndex: "totalQuestions",
      render: (text, record) => (
        <>
          {(
            (record.result.correctAnswers.length / record.exam.totalMarks) *
            100
          ).toFixed(2)}
          {" %"}
        </>
      ),
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            onClick={() => history.push(`/mcqreport/${record._id}`)}
          >
            View Report
          </Button>
        </div>
      ),
    },
  ];
  const columnsT = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => (
        <>
          {record.exam.class} {record.exam.subject} {record.exam.name}
          {", "}
          {record.exam.year}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (text, record) => <>{record.obtainedMarks}</>,
    },
    {
      title: "Percentage",
      dataIndex: "totalQuestions",
      render: (text, record) => (
        <>
          {((record.obtainedMarks / record.exam.totalMarks) * 100).toFixed(2)}
          {" %"}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            onClick={() => history.push(`/theoryreport/${record._id}`)}
          >
            View Report
          </Button>
        </div>
      ),
    },
  ];
  const getData = async () => {
    try {
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const getDataT = async () => {
    try {
      const response = await getAllReportsByUserT();
      if (response.success) {
        setReportsDataT(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getGlobalData = async () => {
    try {
      const response = await getAllReports();
      if (response.success) {
        setGlobalReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const getGlobalDataT = async () => {
    try {
      const response = await getAllReportsT();
      if (response.success) {
        setGlobalReportsDataT(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
    getDataT();
    getGlobalData();
    getGlobalDataT();
  }, []);

  const colors = {
    Biology: "rgba(75,192,192,1)",
    Chemistry: "#00d11f",
    Economics: "#dc0b0b",
    Business: "#f3ba2f",
    English: "#2a71d0",
    Accounting: "#060080",
    Mathematics: "#ca008e",
    Physics: "#7f07e8",
    Psychology: "#f78400",
  };

  const [userReports, setUserReports] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const subjectData = {};

    reportsData.forEach((data) => {
      const subject = data.exam.subject;
      if (!subjectData[subject]) {
        subjectData[subject] = {
          label: `${subject}`,
          data: [],
          backgroundColor: colors[subject],
          borderColor: colors[subject],
          borderWidth: 1,
        };
      }
      subjectData[subject].data.push(parseInt(data.percentage));
    });

    const datasets = Object.values(subjectData);

    datasets.forEach((dataset) => {
      dataset.data.reverse();
    });

    const labels = reportsData
      .map((data) => moment(data.createdAt).format("DD-MM-YY"))
      .reverse();

    setUserReports({
      labels: labels,
      datasets: datasets,
    });
  }, [reportsData]);
  //

  const [userReportsT, setUserReportsT] = useState({
    labels: [],
    datasets: [],
    options: {
      scales: {
        yAxis: {
          scaleLabel: {
            display: true,
            labelString: "Percentage",
          },
        },

        xAxis: {
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      },
    },
  });

  useEffect(() => {
    const subjectData = {};

    reportsDataT.forEach((data) => {
      const subject = data.exam.subject;
      if (!subjectData[subject]) {
        subjectData[subject] = {
          label: `${subject}`,
          data: [],
          backgroundColor: colors[subject],
          borderColor: colors[subject],
          borderWidth: 1,
        };
      }
      subjectData[subject].data.push(parseInt(data.percentage));
    });

    const datasets = Object.values(subjectData);

    datasets.forEach((dataset) => {
      dataset.data.reverse();
    });

    const labels = reportsDataT
      .map((data) => moment(data.createdAt).format("DD-MM-YY"))
      .reverse();

    setUserReportsT({
      labels: labels,
      datasets: datasets,
    });
  }, [reportsDataT]);

  //

  const [globalReports, setGlobalReports] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const subjectData = {};

    globalReportsData.forEach((data) => {
      const subject = data.exam.subject;
      if (!subjectData[subject]) {
        subjectData[subject] = {
          label: `${subject}`,
          data: [],
          backgroundColor: colors[subject],
          borderColor: colors[subject],
          borderWidth: 1,
        };
      }
      subjectData[subject].data.push(parseInt(data.percentage));
    });

    const datasets = Object.values(subjectData);

    datasets.forEach((dataset) => {
      dataset.data.reverse();
    });

    const labels = globalReportsData
      .map((data) => moment(data.createdAt).format("DD-MM-YY"))
      .reverse();

    setGlobalReports({
      labels: labels,
      datasets: datasets,
    });
  }, [globalReportsData]);

  //

  const [globalReportsT, setGlobalReportsT] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const subjectData = {};

    globalReportsDataT.forEach((data) => {
      const subject = data.exam.subject;
      if (!subjectData[subject]) {
        subjectData[subject] = {
          label: `${subject}`,
          data: [],
          backgroundColor: colors[subject],
          borderColor: colors[subject],
          borderWidth: 1,
        };
      }
      subjectData[subject].data.push(parseInt(data.percentage));
    });

    const datasets = Object.values(subjectData);

    datasets.forEach((dataset) => {
      dataset.data.reverse();
    });

    const labels = globalReportsDataT
      .map((data) => moment(data.createdAt).format("DD-MM-YY"))
      .reverse();

    setGlobalReportsT({
      labels: labels,
      datasets: datasets,
    });
  }, [globalReportsDataT]);

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
            // weight: "bold",
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Percentage %",
          font: {
            size: 16,
            // weight: "bold",
          },
        },
      },
    },
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <h1 style={{ margin: 10 }}>Reports</h1>
        <Tabs style={{ marginLeft: 5 }} defaultActiveKey="1">
          <TabPane style={{ marginLeft: 0 }} tab="Mcq Exams" key="1">
            <Table columns={columns} dataSource={reportsData} />
          </TabPane>
          <TabPane tab="Theory Exams" key="2">
            <Table columns={columnsT} dataSource={reportsDataT} />
          </TabPane>
          <TabPane tab="Analytics" key="3">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: 700 }}>
                <h2>Your MCQ Exams</h2>
                <Line data={userReports} options={chartOptions} />
              </div>
              <div style={{ width: 700 }}>
                <h2>Global MCQ Exams</h2>
                <Line data={globalReports} options={chartOptions} />
              </div>
            </div>
            <div className="divider" style={{ paddingTop: 35 }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 50,
              }}
            >
              <div style={{ width: 700 }}>
                <h2>Your Theory Exams</h2>
                <Line data={userReportsT} options={chartOptions} />
              </div>
              <div style={{ width: 700 }}>
                <h2>Global Theory Exams</h2>
                <Line data={globalReportsT} options={chartOptions} />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default UserReports;
