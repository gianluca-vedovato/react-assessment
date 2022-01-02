/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { editUser, selectUsers } from '../usersSlice'
import { AddFriends } from './AddFriends'
import { Content } from '../../components/Content'
import { MdKeyboardBackspace } from 'react-icons/md'
import { l, m } from '../../styles/typography'
import { black } from '../../styles/colors'
import { MainButton } from '../../components/MainButton'
import { Title } from '../../components/Title'
import { inputText, label } from '../../styles/input'
import { Modal } from '../../components/Modal'

interface Props {
  closeWindow: () => void,
  openWindow: () => void,
  user: string
}

export function EditUser({ user, openWindow, closeWindow }: Props) {
  const users = useAppSelector(selectUsers)
  const [ inputName, setInputName ] = useState<string>(user)
  const [ alreadyExist, setAlreadyExist ] = useState<boolean>(false)
  const [ friends, setFriends ] = useState<string[]>(users.find(u => u.name === user)!.friends || [])
  const [ showClosePopup, setShowClosePopup ] = useState<boolean>(false)
  
  const dispatch = useAppDispatch()

  const handleSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault()
    if (alreadyExist) return
    dispatch(editUser({ searchFor: user, replaceWith: inputName, friends }))
    closeWindow()
  }
  useEffect(() => {
    if (inputName === user || users.find(u => u.name !== inputName)) {
      setAlreadyExist(false)
      return
    }
    setAlreadyExist(true)
  }, [inputName])
  return (
    <div css={css({
      position: 'absolute',
      top: '4vw',
      left: '0',
      width: '100%'
    })}>
      {
        showClosePopup && (
          <Modal>
            <div>
              <div css={css({
                ...l,
                color: black
              })}>
                Are you sure?
              </div>
              <div css={css({
                ...m,
                color: black,
                margin: '1.5rem 0',
              })}>
                If you quit now all your edits will be lost.
              </div>
              <div css={css({
                display: 'flex',
                justifyContent: 'center'
              })}>
                <div css={css({ margin: '0 1rem' })}>
                  <MainButton type="secondary" handleClick={() => closeWindow() }>
                    <span>Confirm</span>
                  </MainButton>
                </div>
                <div css={css({ margin: '0 1rem' })}>
                  <MainButton type="primary" handleClick={() => setShowClosePopup(false) }>
                    <span>Cancel</span>
                  </MainButton>
                </div>
              </div>
            </div>
          </Modal>
        )
      }
      <Content>
        <div
          css={css({
            cursor: 'pointer',
            transition: 'opacity 0.4s ease-out',
            '&:hover': {
              opacity: 0.6
            }
          })}
          onClick={() => setShowClosePopup(true)}
        >
          <MdKeyboardBackspace size="2rem" />
        </div>
        <div>
          <Title tag="h2" subtitle="Insert your" title="New user" />
          <form
            css={css({
              marginTop: '2rem'
            })}
            onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
          >
            <div>
              <label
                css={css(label)}
                htmlFor="name"
              >Name</label>
              <input
                css={css(inputText)}
                type="text"
                name="name"
                value={inputName}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value) }
              ></input>
              {
                alreadyExist && (
                  <span css={css({ color: '#ff0202' })}>The name is already taken. Please try to insert another one.</span>
                )
              }
            </div>
            <AddFriends friends={friends} setFriends={setFriends} openAddNewUser={openWindow} />
            <div css={css({
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            })}>
              <MainButton type="primary" handleClick={() => handleSubmit()}>
                <span>Edit user</span>
              </MainButton>
            </div>
          </form>
        </div>
      </Content>
    </div>
  )
}