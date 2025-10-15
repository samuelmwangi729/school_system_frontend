import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//import the faro sdk 
import { Route } from 'react-router-dom';
import { createReactRouterV4Options, getWebInstrumentations, initializeFaro, ReactIntegration } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
  url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/2b633a3d2bc30f7d166aa33a7cfe5b93',
  app: {
    name: 'school management system',
    version: '1.0.0',
    environment: 'production'
  },

  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),

    // React integration for React applications.
    new ReactIntegration({
      router: createReactRouterV4Options({
        history, // the history object used by react-router
        Route, // Route component imported from react-router package
      }),
    }),
  ],
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
