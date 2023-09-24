import React, { useEffect, useState } from 'react';
import {createRoot} from 'react-dom/client'
import App from './App'

import store from './app/store'
import { Provider } from 'react-redux'

import '../public/fonts/Geometos.ttf'
import '../public/images/spotify-logo.png'

const container = document.getElementById('root')

const root = createRoot(container)
root.render(
<Provider store={store}>
  <App />
</Provider>
)

