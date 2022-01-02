/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from "@emotion/react";
import { blue, gradient } from '../styles/colors';

interface Props {
  handleClick: () => void,
  children: React.ReactElement,
  type: 'primary'|'secondary'
}
export function MainButton ({ children, handleClick, type }: Props) {
  return (
    <div
      onClick={() => handleClick()}
      css={css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '1rem 2rem',
        borderRadius: '0.25rem',
        background: type === 'primary'
          ? gradient
          : '#ffffff',
        color: type === 'primary'
          ? '#ffffff'
          : blue.default,
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '1rem',
        textTransform: 'uppercase',
        boxShadow: '0 2px 4px 2px rgba(80, 109, 240, 0.2)',
        transition: 'opacity 0.4s ease-out, box-shadow 0.4s ease-out',
        '&:hover': {
          opacity: 0.8,
          boxShadow: '0 4px 6px 2px rgba(80, 109, 240, 0.4)',
        }
      })}
    >
      { children }
    </div>
  )
}