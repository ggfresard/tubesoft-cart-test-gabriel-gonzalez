import { Drawer, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import { saveCart } from '../services/cartService'
import { setDrawerOpen } from '../services/controlService'
import CartItem from './CartItem'
const useStyles = makeStyles({
  item: {
    display: 'flex',
    justifyContent: 'between',
    alignItems: 'center'
  },

  drawer: {
    width: '50vw',
    maxWidth: '500px',
    margin: '1rem',
    textAlign: 'center',
    minWidth: '300px'
  },
  total: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    marginTop: '0.5rem'
  },
  totalQuantity: {
    fontSize: '2rem',
    fontWeight: 'normal'
  }
})

const DrawerCart = () => {
  const items = useSelector((s) => s.cartReducer.cart.items)
  const products = useSelector((s) => s.productReducer.products)
  const classes = useStyles()
  const drawerOpened = useSelector((s) => s.controlReducer.drawerOpened)

  return (
    <Drawer
      anchor="right"
      open={drawerOpened}
      onClose={() => setDrawerOpen(false)}
    >
      <div className={classes.drawer}>
        {items?.length ? (
          <>
            {items.map((item) => (
              <CartItem key={item.product} item={item}></CartItem>
            ))}
            <div className={classes.total}>
              Total:{' $'}
              <div className={classes.totalQuantity}>
                {items.reduce((acc, item) => {
                  const product = products.find(
                    (product) => product.id === item.product
                  )
                  return acc + product.price * item.quantity
                }, 0)}
              </div>
            </div>
            <Button variant="contained" color="primary" onClick={saveCart}>
              Save
            </Button>
          </>
        ) : (
          <div>The cart is empty</div>
        )}
      </div>
    </Drawer>
  )
}

export default DrawerCart
