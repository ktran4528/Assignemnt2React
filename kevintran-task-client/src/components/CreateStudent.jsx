import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./login.css";
//
import { useNavigate } from 'react-router-dom';

//
function CreateStudent(props) {
  let navigate = useNavigate()
  let myCurrentDate = new Date()
  let date = myCurrentDate.getDate();
  //
  const [student, setStudent] = useState({ _id: '', studentNum: '', password: '', firstName: '', 
                lastName: '', address: '', city: '',phoneNum: '', email: '', program: '', favGame: '',favFruit: ''});
  const [course,setCourse] = useState({courseCode: '', section: '', semester: '', students: $('#studentNum').val()})
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:5000/students";
    //
  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { studentNum: student.studentNum, password: student.password, firstName: student.firstName,
      lastName: student.lastName, address: student.address, city: student.city,phoneNum: student.phoneNum,
      email:student.email, program: student.program, favGame: student.favGame,favFruit: student.favFruit};

      //use promises
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div className='login'>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={saveStudent}>
          <Form.Group>
     
          <Form.Label> Student Number:</Form.Label>
            <Form.Control type="text" name="studentNum" id="studentNum" placeholder="Enter studentNum" value={student.studentNum} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Passowrd</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" rows="3" placeholder="Enter firstName" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter date created at" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter chat title" value={student.address} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter up votes" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNum" id="phoneNum" placeholder="Enter down Votes" value={student.phoneNum} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" placeholder="Enter down Votes" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter down Votes" value={student.program} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Favorite Game</Form.Label>
            <Form.Control type="text" name="favGame" id="favGame" placeholder="Enter down Votes" value={student.favGame} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Favorite Fruit</Form.Label>
            <Form.Control type="text" name="favFruit" id="favFruit" placeholder="Enter down Votes" value={student.favFruit} onChange={onChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>

        </Form>
    </div>
  );
}
// 
export default CreateStudent;

