import { makeStyles } from '@mui/styles'
import DrawerCart from './components/DrawerCart'
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductsView from './views/ProductsView'
import CartsView from './views/CartsView'

const useStyles = makeStyles({})

const App = () => {
  const classes = useStyles()
  return (
    <Router>
      <DrawerCart />
      <Header />
      <Switch>
        <Route exact path="/">
          <ProductsView />
        </Route>
        <Route exact path="/products">
          <CartsView />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
