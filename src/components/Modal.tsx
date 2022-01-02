/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

interface Props {
  children: React.ReactElement
}

export function Modal ({ children }: Props) {
  return (
    <div css={css({
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20
    })}>
      <div css={css({
        backgroundColor: '#000000',
        opacity: 0.2,
        position: 'absolute',
        width: '100%',
        height: '100%'
      })}></div>
      <div css={css({
        backgroundColor: '#ffffff',
        width: '60%',
        padding: '3rem 1.2rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        display: 'block',
        position: 'relative',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
      })}>
        { children }
      </div>
    </div>
  )
}