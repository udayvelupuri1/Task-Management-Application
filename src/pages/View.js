// @ts-ignore
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import fire from '../fire';
import { useParams, Link } from 'react-router-dom';
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const userId = fire.auth().currentUser.uid;  // Add this line to get the current user's UID

  useEffect(() => {
    fire.database().ref(`contacts/${userId}/${id}`).get().then(snapshot => {  // Use userId to fetch data
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      } else {
        setUser({});
      }
    });
  }, [id, userId]);  // Add userId to the dependency array

  return (
    <div style={{ marginTop: "150px" }}>
      <div className='card'>
        <div className='card-header'>
          <p>Task Details</p>
        </div>
        <div className='container'>
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Task: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Description: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Link: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to='/'>
            <button className='btn btn-edit'>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default View;
