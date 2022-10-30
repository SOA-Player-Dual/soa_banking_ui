import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import GlobalStyles from '@/components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '@/_redux/store';
import 'nprogress/nprogress.css';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <StyledEngineProvider injectFirst>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </StyledEngineProvider>
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
