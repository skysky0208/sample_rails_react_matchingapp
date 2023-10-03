import React, {useState, useEffect, createContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import {CommonLayout, Home, SignUp, SignIn} from "components/index"

import { getCurrentUser } from 'lib/api/auth'
import { User } from 'interfaces/index'

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async() => {
    try {
      const res = await getCurrentUser()
      console.log(res)

      if(res?.status === 200){
        setIsSignedIn(true)
        setCurrentUser(res?.data.currentUser)
      } else {
        console.log("No current user")
      }
    } catch(err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const Private = ({children}: {children: React.ReactElement}) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Navigate to="/signin" replace />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<SignIn/>}/>
            <Route
              path="/"
              element={
                <Private>
                  <Routes>
                    <Route index element={<Home />} />
                  </Routes>
                </Private>
              }
            />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
