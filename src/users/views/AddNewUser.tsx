/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addUser, selectUsers } from '../usersSlice'
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
  closeWindow: (id: string) => void,
  openWindow: () => void,
  id: string,
  index: number
}

export function AddNewUser({ openWindow, closeWindow, id, index }: Props) {
  const [ inputName, setInputName ] = useState<string>('')
  const [ alreadyExist, setAlreadyExist ] = useState<boolean>(false)
  const [ friends, setFriends ] = useState<string[]>([])
  const [ showCloseModal, setShowCloseModal ] = useState<boolean>(false)
  const [ showErrorModal, setShowErrorModal ] = useState<boolean>(false)
  const users = useAppSelector(selectUsers)
  
  const dispatch = useAppDispatch()

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault()
    if (alreadyExist) return
    const result: any = await dispatch(addUser(inputName))
    if (!result.error) {
      closeWindow(id)
      return
    }
    const newResult: any = await dispatch(addUser(inputName))
    if (!newResult.error) {
      closeWindow(id)
      return
    }
    setShowErrorModal(true)
  }
  useEffect(() => {
    if (users.find(u => u.name === inputName)) {
      setAlreadyExist(true)
      return
    }
    setAlreadyExist(false)
  }, [inputName])
  return (
    <div css={css({
      position: 'absolute',
      top: '4vw',
      left: '0',
      width: '100%',
      zIndex: index
    })}>
      {
        showErrorModal && (
          <Modal>
            <div>
              <div css={css({
                ...l,
                color: black
              })}>
                Error. <br/>
                Do you want to try again?
              </div>
              <div css={css({
                ...m,
                color: black,
                margin: '1.5rem 0',
              })}>
                Sorry, we ran into an error. Do you want to try again?
              </div>
              <div css={css({
                display: 'flex',
                justifyContent: 'center'
              })}>
                <div css={css({ margin: '0 1rem' })}>
                  <MainButton type="secondary" handleClick={() => setShowErrorModal(false) }>
                    <span>Cancel</span>
                  </MainButton>
                </div>
                <div css={css({ margin: '0 1rem' })}>
                  <MainButton type="primary" handleClick={() => handleSubmit() }>
                    <span>Try again</span>
                  </MainButton>
                </div>
              </div>
            </div>
          </Modal>
        )
      }
      {
        showCloseModal && (
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
                  <MainButton type="secondary" handleClick={() => closeWindow(id) }>
                    <span>Confirm</span>
                  </MainButton>
                </div>
                <div css={css({ margin: '0 1rem' })}>
                  <MainButton type="primary" handleClick={() => setShowCloseModal(false) }>
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
          onClick={() => setShowCloseModal(true)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value) }
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
                <span>Add user</span>
              </MainButton>
            </div>
          </form>
        </div>
      </Content>
    </div>
  )
}