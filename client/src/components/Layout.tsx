import * as React from 'react'
import Head from 'next/head'
import Menu from './Menu'
import {
  Container
} from 'reactstrap'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Web Security Analyzer',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
      <link href="/static/css/nucleo.css" rel="stylesheet" />
      <link href="/static/css/font-awesome.min.css" rel="stylesheet" />
      <link href="/static/css/argon-design-system-react.css" rel="stylesheet" />
    </Head>
    <header>
      <Menu />
    </header>
    <Container style={{marginTop:10}}>
      {children}
    </Container>
    <footer>
   
    </footer>
  </div>
)

export default Layout