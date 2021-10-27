import { mdiChevronDown, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'
import {
  Accordion,
  AccordionSummary,
  Button,
  AccordionActions,
  AccordionDetails,
  IconButton
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setCart, deleteCart } from '../services/cartService'
import { setDrawerOpen } from '../services/controlService'
import { productById } from '../services/productService'

const useStyles = makeStyles({
  accordionSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1
  },
  icon: {
    width: '1.5rem'
  },
  itemDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    textAlign: 'left'
  }
})

const CartAcordion = ({ cart }) => {
  const currentCart = useSelector((s) => s.cartReducer.cart.id === cart.id)
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  return (
    <Accordion
      expanded={expanded}
      onChange={(e, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        expandIcon={
          <Icon className={classes.icon} path={mdiChevronDown}></Icon>
        }
      >
        <div className={classes.accordionSummary}>
          <div>Cart {cart.id} </div>
          <div>
            Items: {cart.items?.length} Total: $
            {cart.items.reduce((acc, item) => {
              const product = productById(item.product)
              return acc + product?.price * item.quantity
            }, 0)}
          </div>
        </div>
      </AccordionSummary>
      <AccordionActions>
        <Button
          variant={currentCart ? 'outlined' : 'contained'}
          color="primary"
          disabled={currentCart}
          onClick={() => {
            setCart(cart)
            setDrawerOpen(true)
          }}
        >
          {currentCart ? 'Active' : 'Edit'}
        </Button>
        <Button
          onClick={() => {
            deleteCart(cart)
          }}
          color="error"
          variant="contained"
        >
          <Icon className={classes.icon} path={mdiTrashCan}></Icon>
        </Button>
      </AccordionActions>
      <AccordionDetails>
        {cart.items.map((item) => {
          const product = productById(item.product)
          return (
            <div key={item.product} className={classes.itemDetails}>
              <div className={classes.title} title={product?.title}>
                {product?.title}
              </div>
              <div>x {item.quantity}</div>
            </div>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}

export default CartAcordion
