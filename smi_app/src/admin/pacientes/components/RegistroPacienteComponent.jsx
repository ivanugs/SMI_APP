import React from 'react';
import "./RegistroPacienteComponent.css";
import logo2 from "../../../assets/logo.png";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

export const RegistroPacienteComponent = () => {
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='container' style={{ maxWidth: '500px' }}>
        <MDBCardBody className='px-5'>
          <img src={logo2} id='imagen-registro' className="img-fluid mx-auto d-flex align-items-center justify-content-center" />
          <h2 id="label-crear" className="display-6 text-center mt-1 mb-3">Crea tu cuenta</h2>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="form1" className="form-label">Apellido Paterno</label>
              <MDBInput wrapperClass='mb-3' placeholder='Apellido paterno' size='' id='form1' type='text'/>
            </div>
            <div className="col-md-6">
              <label htmlFor="form2" className="form-label">Apellido Materno</label>
              <MDBInput wrapperClass='mb-3' placeholder='Apellido materno' size='' id='form2' type='text' />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="form3" className="form-label">Nombre(s)</label>
              <MDBInput wrapperClass='mb-3' placeholder='Nombre(s)' size='' id='form3' type='text' />
            </div>
            <div className="col-md-6">
              <label htmlFor="form4" className="form-label">CURP</label>
              <MDBInput wrapperClass='mb-3' placeholder='CURP' size='' id='form4' type='text' />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="form5" className="form-label">Número celular</label>
              <MDBInput wrapperClass='mb-3' placeholder='Número celular' size='' id='form5' type='number' />
            </div>
            <div className="col-md-6">
              <label htmlFor="form6" className="form-label">Correo electrónico</label>
              <MDBInput wrapperClass='mb-3' placeholder='Correo electrónico' size='' id='form6' type='email' />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="pass1" className="form-label">Contraseña</label>
              <MDBInput wrapperClass='mb-3' placeholder='Contraseña' size='' id='pass1' type='password' />
            </div>
            <div className="col-md-6">
              <label htmlFor="pass2" className="form-label">Repetir contraseña</label>
              <MDBInput wrapperClass='mb-3' placeholder='Repetir contraseña' size='' id='pass2' type='password' />
            </div>
          </div>

          <div className='d-flex flex-row justify-content-center mb-2'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='He leído y acepto los términos y condiciones de uso.' />
          </div>
          <div className="row">
            <div className="col-md-6">
              <MDBBtn id="btn-register" className='w-100 btn-success' size='lg'>Registrar</MDBBtn>
            </div>
            <div className="col-md-6">
              <MDBBtn id="btn-cancel" className='w-100' size='lg'>Cancelar</MDBBtn>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};
