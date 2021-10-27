import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../services/productService'

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gap: '10px',
    padding: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
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

const ProductsView = () => {
  const classes = useStyles()
  const { products, loading: loadingProducts } = useSelector(
    (s) => s.productReducer
  )
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div
      className={
        !loadingProducts ? classes.container : classes.containerLoading
      }
    >
      {loadingProducts ? (
        <div className={classes.center}>
          <CircularProgress></CircularProgress>
        </div>
      ) : products?.length ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id}></ProductCard>
        ))
      ) : (
        <div>No products</div>
      )}
    </div>
  )
}

export default ProductsView
