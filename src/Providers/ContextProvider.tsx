"use client"
import { MenuProvider } from '@/context/SideBarMenuItemsProvider'
import React, { ReactNode } from 'react'

const ContextProvider = ({children}:{children:ReactNode}) => {
  return (
    <MenuProvider>
     {children} 
    </MenuProvider>
  )
}

export default ContextProvider
