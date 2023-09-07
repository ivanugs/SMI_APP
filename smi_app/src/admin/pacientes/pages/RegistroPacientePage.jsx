import React from 'react'
import { AppLayout } from "../../../ui/layout/AppLayout";
import { RegistroPacienteComponent } from "../../pacientes/components/RegistroPacienteComponent"


export const RegistroPacientePage = () => {
    return (
        <AppLayout>
          <RegistroPacienteComponent/>
        </AppLayout>
      )
}

