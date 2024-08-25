// @ts-ignore
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import fire from "../fire";
import { toast } from "react-toastify";

var fireDb = fire.database().ref();

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = fire.auth().currentUser.uid;  // Add this line to get the current user's UID

  useEffect(() => {
    fire
      .database()
      .ref(`contacts/${userId}`)  // Use userId to scope data to the current user
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });

    return () => {
      setData({});
    };
  }, [id, userId]);  // Add userId to the dependency array

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please fill in all fields");
    } else {
      if (!id) {
        fireDb.child(`contacts/${userId}`).push(state, (err) => {  // Use userId to add data
          if (err) {
            toast.error(err);
          } else {
            toast.success("Task added successfully");
          }
        });
      } else {
        fireDb.child(`contacts/${userId}/${id}`).set(state, (err) => {  // Use userId to update data
          if (err) {
            toast.error(err);
          } else {
            toast.success("Task updated successfully");
          }
        });
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div className='form' style={{ marginTop: "100px" }}>
      <form
        style={{
          amrgin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Task</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your task"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Description</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your Description"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Link</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Enter your link"
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type='submit' value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
