import { mdiCart } from '@mdi/js'
import Icon from '@mdi/react'
import { AppBar, Toolbar, IconButton, Badge } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import { setDrawerOpen } from '../services/controlService'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem'
    }
  },
  cartButton: {
    margin: '5px',
    padding: '5px'
  },
  icon: {
    color: 'white',
    width: '2rem'
  },
  expand: {
    flexGrow: 1
  },
  toolBar: {
    display: 'flex',
    gap: '1rem'
  }
}))

const Header = () => {
  const classes = useStyles()
  const totalItems = useSelector((s) =>
    s.cartReducer.cart.items.reduce((acc, value) => acc + value.quantity, 0)
  )

  return (
    <AppBar title="Tubesoft Cart">
      <Toolbar className={classes.toolBar}>
        <div className={classes.title}>Tubesoft Cart</div>
        <Link to="/">
          <div>Products</div>
        </Link>
        <Link to="/products">
          <div>Carts</div>
        </Link>
        <div className={classes.expand}></div>
        <Badge
          badgeContent={totalItems ? totalItems : ''}
          color={totalItems ? 'error' : 'primary'}
        >
          <IconButton
            onClick={() => setDrawerOpen(true)}
            className={classes.cartButton}
          >
            <Icon className={classes.icon} path={mdiCart}></Icon>
          </IconButton>
        </Badge>
      </Toolbar>
    </AppBar>
  )
}

export default Header
