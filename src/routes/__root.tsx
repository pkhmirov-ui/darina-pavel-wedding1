import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Павел & Дарина | Приглашение на регистрацию брака',
      },
      {
        name: 'description',
        content:
          'Элегантное свадебное приглашение Павла и Дарины с программой дня, картой, таймером и RSVP.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
  <HeadContent />

  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <meta name="theme-color" content="#fbf7ee" />
</head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
