import { PHProvider } from './providers'
import './globals.css'

export const metadata = {
  title: 'Focusly — Study Smarter',
  description: 'AI-powered productivity app for students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  )
}