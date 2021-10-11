import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

function ManageTechnologies() {
  const [list, updateList] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState("");
  const toggle = () => setModal(!modal);
  const technologyNameRef = useRef();
  const durationRef = useRef();
  const saveData = () => {
    const technologyName = technologyNameRef.current.value;
    const duration = durationRef.current.value;
    if (
      technologyName.trim().length > 0 &&
      duration.trim().length > 0
    ) {
      if (editId === "") {
        axios
          .post("https://613ed586e9d92a0017e172ca.mockapi.io/technologies", {
            name: technologyName,
            duration: duration,
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
            "https://613ed586e9d92a0017e172ca.mockapi.io/technologies/" + editId,
            {
              name: technologyName,
              duration: duration,
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
          "https://613ed586e9d92a0017e172ca.mockapi.io/technologies/" + data.id
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
    }, 5);
  };

  const getData = () => {
    axios
      .get("https://613ed586e9d92a0017e172ca.mockapi.io/technologies")
      .then(function (response) {
        // handle success
        console.log(response.data);
        updateList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
          Add New Technology
        </button>
        <Table dark>
          <thead>
            <tr>
              <th>Technology Name</th>
              <th>Duration in Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.duration}</td>
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
          <ModalHeader toggle={toggle}>Add New Technology</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <label className="form-label">Technology Name</label>
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

export default ManageTechnologies;
