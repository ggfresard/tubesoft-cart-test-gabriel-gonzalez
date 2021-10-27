import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartAcordion from '../components/CartAcordion'
import { fetchCarts } from '../services/cartService'
import { fetchProducts } from '../services/productService'

const useStyles = makeStyles({
  container: {
    gap: '10px',
    padding: '5px',
    marginTop: '4rem',
    justifyItems: 'center'
  },
  containerLoading: {
    gap: '10px',
    padding: '5px',
    marginTop: '4rem'
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CartsView = () => {
  const classes = useStyles()
  const { carts, loading: loadingCarts } = useSelector((s) => s.cartReducer)
  const loadingProducts = useSelector((s) => s.productReducer.loading)
  useEffect(() => {
    fetchCarts()
    fetchProducts()
  }, [])

  return (
    <div
      className={!loadingCarts ? classes.container : classes.containerLoading}
    >
      {loadingCarts || loadingProducts ? (
        <div className={classes.center}>
          <CircularProgress></CircularProgress>
        </div>
      ) : carts?.length ? (
        carts.map((cart) => (
          <CartAcordion key={cart.id} cart={cart}></CartAcordion>
        ))
      ) : (
        <div className={classes.center}>No carts</div>
      )}
    </div>
  )
}

export default CartsView
