/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { black, gray } from '../styles/colors'
import { m, xl } from '../styles/typography'

interface Props {
  tag: 'h1'|'h2'|'h3'|'h4'|'h5'
  title: string,
  subtitle?: string,
  color?: string
}

export function Title ({ tag, title, subtitle, color }: Props) {
  const TitleTag = tag as keyof JSX.IntrinsicElements
  return (
    <div css={css({
      marginTop: '3.2rem',
      display: 'block',
      position: 'relative'
    })}>
      {
        subtitle && (
          <p css={css({
            ...m,
            color: color || gray.medium,
            margin: '0'
          })}>{ subtitle }</p>
        )
      }
      <TitleTag css={css({
        ...xl,
        color: color || black,
        margin: '0'
      })}>{ title }</TitleTag>
    </div>
  )
}