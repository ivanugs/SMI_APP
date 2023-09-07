import React from 'react'
import { AppLayout } from "../../ui/layout/AppLayout";
import { HospitalesComponent } from "../../hospitales/components/HospitalesComponent"


export const HospitalesPage = () => {
    return (
        <AppLayout>
          <HospitalesComponent/>
        </AppLayout>
      )
}
