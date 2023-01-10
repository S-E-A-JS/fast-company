import React from "react"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import "bootstrap/dist/css/bootstrap.css"
import App from "./app/App"
import { Router } from "react-router-dom"
import { createRoot } from "react-dom/client"
import { createStore } from "./app/store/createStore"
import { Provider } from "react-redux"
import history from "./app/utils/history"

const container = document.getElementById ( "root" )
const root = createRoot ( container )

const store = createStore ()

root.render (
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </Router>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals ()