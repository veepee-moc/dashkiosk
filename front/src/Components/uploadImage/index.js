import React, { useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { IoMdArrowUp } from 'react-icons/io';

const UploadImage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (event) => {
    setIsLoading(true);
    const data = new FormData();
    const file = event.target.files[0];

    event.preventDefault();
    data.append(props.dataName, file);
    Axios({
        method: 'post',
        url: props['upload-route'],
        data: data,
        headers: { 'content-type': 'multipart/form-data' }
    })
        .then(() => { 
          setIsLoading(false);
          props.reload();
          toast.success('Successfully added image!');
         })
        .catch((err) => {toast.error(`Failed to upload image ${err}`); setIsLoading(false); console.log(err)});
  }

  return (
    <div className='d-flex align-items-center mb-3 mt-0 upload-image'>
      <input
        title='file'
        style={{ display: 'none' }}
        id={`${props.name}fileUpload${props.index ? props.index : ''}`}
        type='file'
        onChange={event => uploadImage(event)}
      />
      <label
        htmlFor={`${props.name}fileUpload${props.index ? props.index : ''}`}
        style={{ height: '100%', cursor: 'pointer', width: '100%', margin: '0' }}
      >
        <Col className='my-3'>
          { isLoading
          ? <Row className='d-flex justify-content-center align-content-center'>
                <Spinner className='mr-2' animation='grow' size='md'/>
                <span className='mt-1'>Uploading...</span>
            </Row>
          : <Row className='d-flex justify-content-center align-content-center'>
              <IoMdArrowUp className='mr-2' size='22' />Upload
            </Row>
          }
        </Col>
      </label>
    </div>
  );
}

export default UploadImage;