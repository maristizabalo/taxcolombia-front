import React from 'react'
import { Spin } from 'antd';

export const Loading = () => {
  return (
    <div 
      className="loading-spinner-container"
      style={{ zIndex: 10000 }}
    >
      <Spin 
        tip="Cargando..." 
        size="large"
      />
    </div>
  )
}
