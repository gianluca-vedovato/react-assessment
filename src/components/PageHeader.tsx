/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from "@emotion/react";
import { gradient } from "../styles/colors";

interface Props {
  children: React.ReactNode
}

export function PageHeader ({ children }: Props) {
  return (
    <div css={css({
      backgroundImage: gradient,
      width: '100%',
      height: '8rem',
      padding: '0.75rem 1rem',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      '@media(min-width:768px)': {
        padding: '5vw 2.5vw'
      },
      '@media(min-width:1600px)': {
        padding: '3.2vw 2.5vw'
      }
    })}>
      <div>
        { children }
      </div>
    </div>
  )
}