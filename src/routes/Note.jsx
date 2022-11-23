import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Col from "../components/Col";
import Row from "../components/Row";

import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import db from '../db'

function Note() {
  const params = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState({
    title: '',
    text: ''
  })

  function changeHandler(e) {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  function submitHandler(e) {
    e.preventDefault()

    updateDoc(doc(db, 'notes', params.id), note)
      .then(() => navigate('/'))
  }

  function clickHandler() {
    deleteDoc(doc(db, 'notes', params.id))
      .then(() => navigate('/'))
  }

  useEffect(() => {
    getDoc(doc(db, 'notes', params.id))
      .then((document) => {
        if (document.exists()) {
          setNote({
            title: document.data().title,
            text: document.data().text
          })
        }
      })
  }, [])

  return (
    <Row>
      <Col>
        <form class="p-5 bg-light border border-1 mb-3"
          onSubmit={submitHandler}>
          <h2 class="mb-3">Edit Note: {params.id}</h2>
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input name="title" type="text" class="form-control"
              value={note.title} onChange={changeHandler} />
          </div>
          <div class="mb-3">
            <label class="form-label">Text</label>
            <textarea name="text" class="form-control"
              value={note.text} onChange={changeHandler}></textarea>
          </div>
          <div class="d-flex justify-content-end">
            <Link class="btn btn-secondary me-3" to="/">Cancel</Link>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>

        <button type="button" class="btn btn-danger"
          onClick={clickHandler}>Delete</button>
      </Col>
    </Row>
  )
}

export default Note