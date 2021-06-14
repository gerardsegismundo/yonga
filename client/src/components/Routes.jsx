import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { Home, Login, Register, Category, Cart, Checkout, About, Contact, Terms } from '../pages'
import { ForgotPassword, ResetPassword, Dashboard, NotFound, OrderReceived, Product } from '../pages'

const routes = [
  { path: '/', component: Home, onLeave: () => console.log('LEAVE!!') },
  { path: '/account/register', component: Register },
  { path: '/account/login/:activation_token?', component: Login },
  { path: '/account/forgotpassword', component: ForgotPassword },
  { path: '/account/resetpassword/:reset_token?', component: ResetPassword },
  { path: '/cart', component: Cart, onLeave: () => console.log('LEAVE!!') },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/terms', component: Terms },
  { path: '/checkout', component: Checkout },
  { path: '/order-received', component: OrderReceived },
  { path: '/product-category/:category', component: Category },
  { path: '/product/:product_name', component: Product },
  { path: '/account/dashboard', component: Dashboard, exact: false },
  { path: null, component: NotFound, exact: false }
]

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ path, component, exact = true }) => (
        <Route exact={exact} path={path} component={component} key={path} />
      ))}
    </Switch>
  )
}

export default Routes
