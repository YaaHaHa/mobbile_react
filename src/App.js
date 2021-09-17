import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import rotues from './config/routes'
import './App.less'
import './utils/rem'
export default class App extends Component {
  render() {
    return (
        <div>
            <Switch>
              {
            rotues.map((routeObj)=>{
              return <Route key={routeObj.path} path={routeObj.path} component={routeObj.component} />
            })
              }
            </Switch>
        </div>

    )
  }
}
