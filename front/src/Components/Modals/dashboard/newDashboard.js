import React from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { IoMdImage } from 'react-icons/io';
import FormInput from '../formInput';
import Availability from '../availability';

export default function NewDashboard (props) {
  const handleTemplateChanged = (event) => {
    const template = props.templates.find((obj) => obj.name === event.target.value);
    if (template) {
      const url = [];
      for (var i = 0; i < template.url; i++)
        url.push('');
      props.handleInput('setUrl', url);
      template.url = url.length;
      props.handleInput('chosedTemplate', template);
    }
    else {
      props.handleInput('setUrl', [''])
      props.handleInput('chosedTemplate', { name: 'None', url: 1 });
    }
  };

  const renderUrlInput = () => {
    const arr = [];
    for (var i = 0; i < props.chosedTemplate.url; i++) {
      arr.push(<FormInput
        className='pl-4'
        sm={12}
        required={true}
        value={props.Url[i]}
        placeholder='Url'
        name='Url'
        updateValue={props.handleInput}
        onError='insert an URL or upload an image'
        type='url'
        dataName='dashboard'
        upload-route='/api/upload'
        openImageManagement={(name, index, folderName) => props.handleInput('images', {name, index, folderName})}
        rest={props.rest}
        index={i}
        key={i}
      />);
    }
    return arr;
  }

  return (
    <>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text">Template</label>
        </div>
        <select className="custom-select" onChange={handleTemplateChanged}>
          <option defaultValue>None</option>
          {props.templates.map((tp, index) =>
            <option key={index} value={tp.name}>{tp.name}</option>)}
        </select>
      </div>
      <Form.Row>
        {renderUrlInput()}
      </Form.Row>
      <Form.Row>
        <FormInput
          md={6}
          sm={12}
          value={props.watermark}
          placeholder='Watermark'
          name='watermark'
          updateValue={props.handleInput}
          type="url"
          dataName='dashboard'
          openImageManagement={(name, index, folderName) => props.handleInput('images', {name, index, folderName})}
        />
        <Form.Group as={Col} md={6} sm={12}>
          <InputGroup>
            <InputGroup.Prepend style={{ width: '42px' }}>
              <InputGroup.Text className="input-group-text" htmlFor='watermarkPosition'>
                <IoMdImage />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              size='lg'
              as='select'
              className='custom-select custom-select-lg'
              value={props.watermarkPosition}
              onChange={event => props.handleInput('watermarkPosition', event.target.value)}
            >
              <option value='center'>Centered</option>
              <option value='topright'>Top right</option>
              <option value='topleft'>Top left</option>
              <option value='bottomright'>Bottom right</option>
              <option value='bottomleft'>Bottom left</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>
        <FormInput
          sm={12}
          required={false}
          value={props.Description}
          placeholder="Description"
          name='Description'
          updateValue={props.handleInput}
          type="text"
        />
        <FormInput
          sm={12}
          required={false}
          isInvalid={!props.isValidViewport()}
          value={props.Viewport}
          placeholder="Viewport size (height x width)"
          name='Viewport'
          updateValue={props.handleInput}
          type="text"
        />
        <FormInput
          md={6}
          sm={12}
          required={false}
          value={props.Timeout}
          placeholder="Timeout"
          name='Timeout'
          updateValue={props.handleInput}
          type="number"
          dropdown={true}
          time={props.timeoutTime}
          selectTime={(value) => { props.handleInput('timeoutTime', value) }}
        />
        <FormInput
          md={6}
          sm={12}
          required={false}
          value={props.Delay}
          placeholder="Delay"
          name='Delay'
          updateValue={props.handleInput}
          type="number"
          dropdown={true}
          time={props.delayTime}
          selectTime={(value) => { props.handleInput('delayTime', value) }}
        />
        <FormInput
          sm={12}
          required={false}
          hasTextArea={true}
          placeholder="This dashboard is available when..."
          name='Available'
          updateValue={props.handleInput}
          type="text"
        />
        
      </Form.Row>
      </>
  );
}

/**<Form.Text className="text-muted">
          <Availability input={props.Available} />
        </Form.Text> */