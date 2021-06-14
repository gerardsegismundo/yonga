import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Address from './Address'
import AccountDetails from './AccountDetails'
import Avatar from '../../components/Avatar'
import Orders from './Orders'

import { logout } from '../../redux/actions'
import { progress } from '../../utils/helpers'

const routes = [
  { name: 'dashboard', path: '' },
  { name: 'orders', path: '/orders' },
  { name: 'address / billing details', path: '/address' },
  { name: 'account details', path: '/account-details' }
]

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const { path, url } = useRouteMatch()

  const user = useSelector(({ user }) => user)
  const { isAuthenticated } = user

  const handleLogout = () => progress(() => dispatch(logout()))

  useEffect(() => {
    if (!isAuthenticated) return history.push('/account/login')
  }, [history, isAuthenticated])

  return (
    user.data && (
      <div className='dashboard'>
        <nav>
          {user.data.avatar && <Avatar />}

          <ul>
            {routes.map(({ name, path }) => (
              <li key={url + name}>
                <NavLink exact to={url + path}>
                  {name}
                </NavLink>
              </li>
            ))}
            <li>
              <button className='logout-btn' onClick={handleLogout}>
                logout
              </button>
            </li>
          </ul>
        </nav>
        <section className='content'>
          <Switch>
            <Route exact path={path}>
              Hello {`${user.data.name}`}
            </Route>

            <Route exact path={`${path}/orders`} render={() => <Orders orders={user.data.orders} />} />

            <Route exact path={`${path}/address`} component={Address} />

            <Route exact path={`${path}/account-details`} component={AccountDetails}></Route>
          </Switch>
        </section>
      </div>
    )
  )
}

export default Dashboard
