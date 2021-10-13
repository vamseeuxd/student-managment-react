import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
} from "reactstrap";
import { MultiSelect } from "react-multi-select-component";

function ManageBatches() {
  const [list, updateList] = useState([]);
  const [technologies, updateTechnologies] = useState([]);
  const [students, updateStudents] = useState([]);
  const [selectedStudents, updateSelectedStudents] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState("");
  const toggle = () => setModal(!modal);
  const technologyNameRef = useRef();
  const durationRef = useRef();
  const tehcnologyRef = useRef();
  const studentsRef = useRef();
  const saveData = () => {
    const batchName = technologyNameRef.current.value;
    const duration = durationRef.current.value;
    const technolgy = tehcnologyRef.current.value;
    // const selectedStudents = selectedStudents;
    console.log(selectedStudents);
    if (
      batchName.trim().length > 0 &&
      duration.trim().length > 0 &&
      technolgy.trim().length > 0 &&
      selectedStudents.length > 0
    ) {
      if (editId === "") {
        axios
          .post("https://613ed586e9d92a0017e172ca.mockapi.io/batches", {
            name: batchName,
            duration: duration,
            technolgy: technolgy,
            students: selectedStudents.map((student) => student.id),
          })
          .then(function (response) {
            console.log(response);
            getData();
            toggle();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .put(
            "https://613ed586e9d92a0017e172ca.mockapi.io/batches/" + editId,
            {
              name: batchName,
              duration: duration,
              technolgy: technolgy,
              students: selectedStudents.map((student) => student.value),
            }
          )
          .then(function (response) {
            console.log(response);
            getData();
            toggle();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      alert("Please provide valid Information");
    }
  };
  const deleteData = (data) => {
    const isConfirm = window.confirm("Are you sure!Do you want to delet?");
    if (isConfirm) {
      axios
        .delete(
          "https://613ed586e9d92a0017e172ca.mockapi.io/batches/" + data.id
        )
        .then(function (response) {
          // handle success
          console.log(response);
          getData();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };
  const editData = (data) => {
    toggle();
    setTimeout(() => {
      setEditId(data.id);
      technologyNameRef.current.value = data.name;
      durationRef.current.value = data.duration;
      tehcnologyRef.current.value = data.technolgy;
    }, 5);
  };

  const getData = () => {
    axios
      .get("https://613ed586e9d92a0017e172ca.mockapi.io/batches")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        updateList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getTechnologies = () => {
    axios
      .get("https://613ed586e9d92a0017e172ca.mockapi.io/technologies")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        updateTechnologies(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getStudents = () => {
    axios
      .get("https://613ed586e9d92a0017e172ca.mockapi.io/students")
      .then(function (response) {
        // handle success
        console.log(response.data);
        updateStudents(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getTechnologies();
    getStudents();
  }, []);

  const getTechnologyName = (id) => {
    const targetTechnology = technologies.find((technology) => {
      return technology.id === id;
    });
    if (targetTechnology) {
      return targetTechnology.name;
    } else {
      return "";
    }
  };

  const getStudentName = (id) => {
    debugger;
    const studnet = students.find((studnet) => {
      return studnet.id === id;
    });
    if (studnet) {
      return studnet.firstName + " " + studnet.lastName;
    } else {
      return "";
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2 mt-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            toggle();
            setEditId("");
          }}
        >
          Add New Batch
        </button>
        <Table dark>
          <thead>
            <tr>
              <th>Batch Name</th>
              <th>Duration in Hours</th>
              <th>Technology</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.duration}</td>
                  <td>{getTechnologyName(item.technolgy)}</td>
                  <td>
                    {item.students &&
                      item.students.map((student) => {
                        return (
                          <span className="badge bg-primary me-2" key={student}>
                            {getStudentName(student)}
                          </span>
                        );
                      })}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteData(item)}
                      className="btn btn-danger btn-sm mx-1"
                      style={{ width: "60px" }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editData(item)}
                      className="btn btn-warning btn-sm mx-1"
                      style={{ width: "60px" }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
          <ModalHeader toggle={toggle}>Add New Batch</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <label className="form-label">Batch Name</label>
                <input
                  ref={technologyNameRef}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input ref={durationRef} type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Technology</label>
                <select ref={tehcnologyRef} className="form-control">
                  <option>Select Technology</option>
                  {technologies.map((technolgy) => {
                    return (
                      <option key={technolgy.id} value={technolgy.id}>
                        {technolgy.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Students</label>
                <MultiSelect
                  options={students.map((student) => {
                    return {
                      label: `${student.firstName}  ${student.lastName}`,
                      value: student.id,
                    };
                  })}
                  value={selectedStudents}
                  onChange={updateSelectedStudents}
                  labelledBy="firstName"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveData}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
export default ManageBatches;
