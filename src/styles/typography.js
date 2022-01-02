const sizes = {
  xl: {
    fontWeight: 700,
    fontSize: '2rem',
    '@media(min-width:768px)': {
      fontSize: '4vw'
    },
    '@media(min-width:1200px)': {
      fontSize: '3.2vw'
    }
  },
  l: {
    fontWeight: 700,
    fontSize: '1.5rem',
    '@media(min-width:768px)': {
      fontSize: '3.2vw'
    },
    '@media(min-width:1200px)': {
      fontSize: '2.6vw'
    }
  },
  m: {
    fontWeight: 500,
    fontSize: '1rem'
  },
  s: {
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  xs: {
    fontWeight: 500,
    fontSize: '0.75rem'
  }
}

export const { xl, l, m, s, xs } = sizes