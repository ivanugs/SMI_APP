import { Row, Col, Card } from "react-bootstrap";
import React from 'react';
import "@fortawesome/free-solid-svg-icons";
import "./RegistroPacienteComponent.css";
import logo from "../../../assets/logo.png";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

export const RegistroPacienteComponent = () => {
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <img src={logo} className="img-fluid mx-auto imagen-fondo d-flex align-items-center justify-content-center"/>
          <h1 className="display-6 text-center mt-3 mb-3">Crea tu cuenta</h1>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};
