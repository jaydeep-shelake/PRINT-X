import React ,{useState,useEffect}from 'react'
import {Form,Card,Alert,Button} from 'react-bootstrap'
import CenterContainer from '../Styles/CenterContainer'
import{useAuth} from '../../Context/AuthContext'
import {db} from '../../firebase';

 const GivePoints = () => {
    const [err,setErr]=useState('');
    const [email,setEmail]=useState('');
    const [givenPoints,setPoints]=useState(2);
    const [message ,setMessage]=useState(false);
    console.log(givenPoints)
    console.log(typeof  givenPoints)
   const {userInfo}=useAuth();
   console.log(userInfo)
   
  

    const handleSubmit =async(e)=>{
      e.preventDefault();
          try{
           await db.users.doc(email).get().then(doc=>{
              console.log(db.formatedDoc(doc)?.points);
              db.users.doc(email).update({
                points: db.formatedDoc(doc)?.points+givenPoints,
              })
           })
          setMessage('Sucessfully points given')
          }
          catch(err){
           setErr("Faild to five points")
           console.log(err)
          }
    }
    return (
        <CenterContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Give Points</h2>
            {err&&<Alert variant="danger">{err}</Alert>}
            {message&&<Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id="points">
                <Form.Label>Points</Form.Label>
                <Form.Control type="number" required onChange={(e)=>setPoints(parseInt(e.target.value))}></Form.Control>
            </Form.Group>
              <Button type="submit" className="w-100">Give Points</Button>

             </Form>
            </Card.Body>
          </Card>
        </CenterContainer>  
    )
}

export default GivePoints
