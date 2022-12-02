import axios from "axios";
import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const Header = (props) => {
    const [file, setFile] = useState()
    const [show, setShow] = useState(false);
    const [msg, setMsg]= useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => {console.log('check') ;
    setShow(true)}
  function handleChange(event) {
    setFile(event.target.files[0])
    if(event.target.files[0]){
        upload_file(event.target.files[0])
    }
    
  }
  function upload_file(file_name){
    const formData = new FormData();
    formData.append('file', file_name);
    axios.post('http://127.0.0.1:8000/upload_files', formData)
    .then(function (response) {
      console.log(response);
      setShow(true)
      setMsg(response.data)
      // handleShow()
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Try it Out
                  <input type="file" onChange={handleChange}/>
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} style={{opacity:1}}>
        <Modal.Header>
          <Modal.Title>Prediction : {msg.prediction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Warning! : {msg.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  )
}
