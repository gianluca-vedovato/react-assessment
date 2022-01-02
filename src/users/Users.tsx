import React, { useState } from 'react'
import { UsersList } from './views/UsersList'
import { AddNewUser } from './views/AddNewUser'
import { v4 as uuidv4 } from 'uuid'
import { EditUser } from './views/EditUser'

export function Users () {
  const [newUserWindows, setNewuserWindows] = useState<string[]>([])
  const [editUserWindow, setEditUserWindow] = useState<string>('')

  const openAddNewUser = (): void => {
    const newId = uuidv4()
    setNewuserWindows([...newUserWindows, newId])
  }
  const closeAddNewUser = (id: string): void => {
    setNewuserWindows([...newUserWindows].filter(window => window !== id))
  }

  const openEditUserWindow = (name: string): void => {
    setEditUserWindow(name)
  }

  const closeEditUserWindow = (): void => {
    setEditUserWindow('')
  }
  
  return (
    <div>
      <UsersList addNewUser={openAddNewUser} editUser={openEditUserWindow} />
      {
        editUserWindow && (
          <EditUser user={editUserWindow} closeWindow={closeEditUserWindow} openWindow={openAddNewUser} />
        )
      }
      {
        newUserWindows.map((n, i) => (
          <AddNewUser key={i} id={n} openWindow={openAddNewUser} closeWindow={closeAddNewUser} index={i} />
        ))
      }
    </div>
  );
}
