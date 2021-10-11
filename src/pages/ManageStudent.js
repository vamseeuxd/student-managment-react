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

function ManageStudent() {
  const [list, updateList] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState("");
  const toggle = () => setModal(!modal);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const saveData = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    if (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0
    ) {
      if (editId === "") {
        axios
          .post("https://613ed586e9d92a0017e172ca.mockapi.io/students", {
            firstName: firstName,
            lastName: lastName,
            email: email,
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
          .put("https://613ed586e9d92a0017e172ca.mockapi.io/students/" + editId, {
            firstName: firstName,
            lastName: lastName,
            email: email,
          })
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
          "https://613ed586e9d92a0017e172ca.mockapi.io/students/" + data.id
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
      firstNameRef.current.value = data.firstName;
      lastNameRef.current.value = data.lastName;
      emailRef.current.value = data.email;
    }, 5);
  };

  const getData = () => {
    axios
      .get("https://613ed586e9d92a0017e172ca.mockapi.io/students")
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
          Add New Student
        </button>
        <Table dark>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
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
          <ModalHeader toggle={toggle}>Add New Student</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  ref={firstNameRef}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input ref={lastNameRef} type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input ref={emailRef} type="email" className="form-control" />
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
export default ManageStudent;
