import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import { removeItem, upsertItem } from '../services/cartService'
import Icon from '@mdi/react'
import { IconButton } from '@mui/material'
import { mdiPlus, mdiMinus, mdiTrashCan } from '@mdi/js'
const useStyles = makeStyles({
  card: {
    width: 345
  },
  quantityContainer: {
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
    flex: 1,
    justifyContent: '',
    flexWrap: 'nowrap'
  },
  quantityIcon: {
    width: '1.5rem'
  },
  total: {
    fontSize: '2rem',
    fontWeight: 'normal'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  }
})

const ProductCard = ({ product }) => {
  const classes = useStyles()
  const item = useSelector((s) =>
    s.cartReducer.cart.items.find((item) => item.product === product.id)
  )

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="500"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.actions}>
          {item ? (
            <div className={classes.quantityControls}>
              <IconButton
                onClick={() => {
                  item.quantity > 1
                    ? upsertItem({ ...item, quantity: item.quantity - 1 })
                    : removeItem(item.product)
                }}
                size="small"
              >
                <Icon className={classes.quantityIcon} path={mdiMinus}></Icon>
              </IconButton>
              {item.quantity}
              <IconButton
                onClick={() => {
                  upsertItem({ ...item, quantity: item.quantity + 1 })
                }}
                size="small"
              >
                <Icon className={classes.quantityIcon} path={mdiPlus}></Icon>
              </IconButton>
              <IconButton
                onClick={() => {
                  removeItem(item.product)
                }}
                size="small"
                color="error"
              >
                <Icon
                  className={classes.quantityIcon}
                  path={mdiTrashCan}
                ></Icon>
              </IconButton>
            </div>
          ) : (
            <Button
              onClick={() => {
                upsertItem({ product: product.id, quantity: 1 })
              }}
              size="small"
            >
              Add to cart
            </Button>
          )}
          <div className={classes.total}>$ {product.price}</div>
        </div>
      </CardActions>
    </Card>
  )
}
export default ProductCard
