import React from 'react'
import { AppLayout } from "../../../ui/layout/AppLayout";
import { PacienteComponent } from "../../pacientes/components/PacienteComponent"
export const PacientePage = () => {
  return (
    <AppLayout>
      <PacienteComponent/>
    </AppLayout>
  )
}
