import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import Icon from '@mdi/react'
import { mdiPlus, mdiMinus, mdiTrashCan } from '@mdi/js'
import { IconButton } from '@mui/material'
import { removeItem, upsertItem } from '../services/cartService'

const useStyles = makeStyles({
  quantityContainer: {
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
    flex: 1,
    justifyContent: '',
    flexWrap: 'nowrap'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quantityIcon: {
    width: '1.5rem'
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    textAlign: 'left'
  }
})

const CartItem = ({ item }) => {
  const product = useSelector((s) =>
    s.productReducer.products.find((product) => product.id === item.product)
  )
  const classes = useStyles()

  return (
    <div className={classes.item}>
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
      </div>
      <div title={product.title} className={classes.title}>
        {product.title}
      </div>
      <div>$ {product.price}</div>
      <div>
        <IconButton
          onClick={() => {
            removeItem(item.product)
          }}
          size="small"
          color="error"
        >
          <Icon className={classes.quantityIcon} path={mdiTrashCan}></Icon>
        </IconButton>
      </div>
    </div>
  )
}

export default CartItem
