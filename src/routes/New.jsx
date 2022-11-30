import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Col from "../components/Col";
import Row from "../components/Row";

import { collection, addDoc } from 'firebase/firestore'
import db from '../db'

function New() {
  const navigate = useNavigate()
  const [note, setNote] = useState({
    title: '',
    text: ''
  })

  function changeHandler(e) {
    //console.log (e.target.name , e.target.value)
    setNote({
      ...note,
      [e.target.name]: e.target.value

    })
  }

  function submitHandler(e) {
    e.preventDefault()
    //addDoc returns promise

    const c = collection(db, 'notes')
    addDoc(c, note)
      .then(document => navigate('/note/' + document.id))
  }

  return (
    <Row>
      <Col>
        <form className="p-5 bg-light border border-1 mb-3"
          onSubmit={submitHandler}>
          <h2 className="mb-3">New Note</h2>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="title" type="text" class="form-control"
              value={note.title} onChange={changeHandler} />
          </div>
          <div className="mb-3">
            <label className="form-label">Text</label>
            <textarea className="text" alt="form-control"
              value={note.text} onChange={changeHandler}></textarea>
          </div>
          <div className="d-flex justify-content-end">

            <Link className="btn btn-secondary me-3" to="/">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </Col>
    </Row>
  )
}

export default New