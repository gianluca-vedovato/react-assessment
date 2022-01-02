/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { gradient, gray } from '../../styles/colors'
import { inputText, label } from '../../styles/input'
import { selectUsers } from '../usersSlice'
import { MdAdd, MdOutlineClose } from 'react-icons/md'

interface Props {
  friends: string[],
  setFriends: React.Dispatch<React.SetStateAction<string[]>>,
  openAddNewUser: () => void
}

export function AddFriends ({ friends, setFriends, openAddNewUser }: Props) {
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    if (search.length > 2) {
      setSearchResults(
        users
          .map(u => u.name)
          .filter(u => u.indexOf(search) > -1)
      )
      return
    }
    setSearchResults([])
  }, [search])

  return (
    <div css={css({ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${gray.light}` })}>
      <div css={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center'})}>
        <h2 css={css({ margin: '0' })}>Friends</h2>
        <div
          css={css({
            backgroundImage: gradient,
            borderRadius: '50%',
            width: '2.2rem',
            height: '2.2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px 2px rgba(80, 109, 240, 0.2)',
            color: '#ffffff',
            transition: 'opacity 0.4s ease-out, box-shadow 0.4s ease-out',
            '&:hover': {
              opacity: 0.8,
              boxShadow: '0 4px 6px 2px rgba(80, 109, 240, 0.4)',
            }
          })}
          onClick={() => openAddNewUser()}
        >
          <MdAdd size="1.5rem" />
        </div>
      </div>
      <div css={css({ position: 'relative', marginTop: '1.5rem' })}>
        <div>
          <label css={css({ position: 'relative', ...label })} htmlFor="search">Search for friends</label>
          <input
            css={css({ position: 'relative', ...inputText })}
            type="text"
            name="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            onBlur={ () => setTimeout(() => { setSearchResults([]) }, 200)}
          />
        </div>
        {
          !!searchResults.length && (
            <div css={css({
              backgroundColor: '#ffffff',
              position: 'absolute',
              width: '100%',
              left: 0,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              zIndex: 10
            })}>
              {
                searchResults.map((s, i) => {
                  const pointerEvents = friends.find(f => f === s)
                    ? 'none'
                    : 'auto'
                  return (
                    <div
                      css={css({
                        pointerEvents,
                        padding: '1rem 1.5rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-out',
                        '&:hover': {
                          backgroundColor: '#efefef'
                        }
                      })}
                      onClick={() => setFriends([...friends, s])}
                      key={i}
                    >{ s }</div>
                  )
                })
              }
            </div>
          )
        }
      </div>
      {
        <div css={css({ marginTop: '2rem' })}>
          <span css={css({ fontWeight: 700 })}>Friends list: </span>
          <ul css={css({ width: '100%', paddingLeft: 0})}>
            {
              friends.map((f, i) => (
                <li
                  css={css({ display: 'flex', justifyContent: 'space-between', listStyle: 'none', width: '100%' })}
                  key={i}
                >
                  <span>{ f }</span>
                  <span css={css({ cursor: 'pointer' })} onClick={() => setFriends([...friends].filter(o => f !== o))}><MdOutlineClose /></span>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}