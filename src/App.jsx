import { Button, ConfigProvider } from 'antd'
import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './utils/PrivateRoute'
import { Provider } from 'react-redux'
import store from './redux/store'
import Private from './pages/Private'


const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#42BFF2',
        },
      }}
    >
      <Provider store={store} >
        <Router>
          <Routes>
            <Route element={<PrivateRoute />} >
              <Route path="/" element={<Private />} />
            </Route>
            <Route exact path='/login' element={<LoginPage />} />
          </Routes>
        </Router>
      </Provider>
    </ConfigProvider>

  )
}

export default App