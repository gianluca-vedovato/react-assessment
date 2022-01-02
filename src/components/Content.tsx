/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode
}

export function Content ({ children }: Props) {
  return (
    <div css={css({
      backgroundColor: '#ffffff',
      padding: '1rem',
      marginTop: '-1.25rem',
      width: '100%',
      boxSizing: 'border-box',
      borderRadius: '2.25rem 2.25rem 0 0',
      '@media(min-width:768px)': {
        padding: '4vw',
        marginTop: '-4vw',
        borderRadius: '4vw 4vw 0 0',
      },
      '@media(min-width:1600px)': {
        padding: '2.5vw',
        marginTop: '-2.5vw',
        borderRadius: '2.5vw 2.5vw 0 0',
      }
    })}>
      { children }
    </div>
  )
}