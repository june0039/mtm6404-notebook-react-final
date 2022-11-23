import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Col from "../components/Col";
import Row from "../components/Row";

import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import db from '../db.js'

function Notes () {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('title'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => data.push({
        id: doc.id,
        title: doc.data().title,
        text: doc.data().text
      }))
      setNotes(data)
    });
  }, [])

  return (
    <Row>
      {notes.map(note => (<Col className="col-12 col-md-6 col-lg-4 mb-3">
        <Link className="text-decoration-none text-body" to={"/note/" + note.id}>
          <Card title={note.title} text={note.text} />
        </Link>
      </Col>))}
    </Row>
  )
}

export default Notes