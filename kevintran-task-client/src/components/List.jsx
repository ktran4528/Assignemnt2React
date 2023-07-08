import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//
import { useNavigate } from 'react-router-dom';
//
// this component displays a list of students
function List(props) {
  let navigate = useNavigate();
  // declare the states of this component
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  //
  const apiUrl = "http://localhost:5000/students";
  const fetchData = async () => {
    axios.get(apiUrl)
      .then(result => {
        console.log('result.data:',result.data)
        setData(result.data);
        setShowLoading(false);
        
      }).catch((error) => {
        console.log('error in fetchData:', error)
        setListError(true)
      });
    };  
  //
  // retrieve all students
  useEffect(() => {
    // load the students
    fetchData();
  }, []);
  //
  const deleteStudent = (item) => {
    setShowLoading(true);
    const id=item._id;

    
    const student = { studentNum: item.studentNum, password: item.password, firstName: item.firstName,
      lastName: item.lastName, address: item.address, city: item.city,phoneNum: item.phoneNum,
      email:item.email, program: item.program, favGame: item.favGame,favFruit: item.favFruit};

    console.log('student to delete:', student)
    //
    const apiUrlDelete = "http://localhost:5000/students/" + id;
    console.log('url:',apiUrlDelete)
    //
    axios.delete(apiUrlDelete, student)
      .then((results) => {
        setShowLoading(false);
        console.log('deleted document:', results.data)
        //refresh the list
        fetchData()
        //navigate('/list')
      }).catch((error) => setShowLoading(false));
  };
  //show the task
  const showDetails = (id) => {
    //
    navigate('/show/' + id);

  }
  //
  return (
    <div>
      
        {showLoading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> }
        
          <h2>See all your students here:</h2>
          <ListGroup>
            <Table>
            <tbody>
              {data.map((item, idx) => (
                
                  <tr key={idx}>
                  <td>{idx+1}</td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.chatId} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.prompt} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.response} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.createdAt} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.chatTitle} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.upVotes} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetails(item._id) }}>{item.downVotes} </ListGroup.Item></td>
                  <td><Button type="button" variant="danger" onClick={() => { deleteStudent(item) }}>Delete</Button></td>
                
                  </tr>                
              
              ))}
              </tbody>
            </Table>
          </ListGroup>
          
        
    </div>

  );
}
//

export default List;

