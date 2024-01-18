import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import App from './App.tsx'
import { history } from './configs/history.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  // ts-expect-error
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
  // </React.StrictMode>
)
