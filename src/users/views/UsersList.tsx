/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

import { useAppSelector } from '../../app/hooks'
import { editUser, selectUsers } from '../usersSlice'
import { MainButton } from '../../components/MainButton';

interface Props {
  addNewUser: () => void,
  editUser: (name: string) => void
}

export function UsersList({ addNewUser, editUser }: Props) {
  const users = useAppSelector(selectUsers)

  return (
    <div css={css({
      display: 'flex',
      flexDirection: 'column'
    })}>
      {
        users.length
        ? users.map((u, i) => (
            <div
              key={i}
              css={css({
                display: 'block',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease-out',
                '&:hover': {
                  opacity: 0.8
                }
              })}
              onClick={ () => editUser(u.name)}
            >
              <span css={css({
                fontWeight: 'bold',
                display: 'inline-block'
              })}>
                { i + 1 }
              </span>. { u.name }
            </div>
          ))
        : (
          <div>
            <div>No users found.</div>
          </div>
        )
      }
      <div css={css({
        width: '100%',
        margin: '2.5rem auto',
        display: 'flex',
        justifyContent: 'center'
      })}>
        <MainButton type="primary" handleClick={() => addNewUser()}>
          <div>Add new user</div>
        </MainButton>
      </div>
    </div>
  )
}