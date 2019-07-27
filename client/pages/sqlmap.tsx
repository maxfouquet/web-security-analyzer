import * as React from 'react'
import axios from 'axios'
import Layout from '../src/components/Layout'
import LogShine from '../src/components/LogShine'
import { SERVER_SQLMAP } from '../config/config'
import * as isUrl from 'is-url'
import {
  Row, 
  Col,
  FormGroup,
  Form,
  Input,
  Button
} from 'reactstrap'

interface Props {}
interface State {
  url: string,
  file: string,
  forceUpdate: boolean
}

export default class sqlmap extends React.Component<Props, State> {
  state: State = {
    url: "",
    file: "",
    forceUpdate: false
  }
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.execute = this.execute.bind(this)
  }
  handleChange(e: React.FormEvent<HTMLInputElement>): void{
    this.setState({
      url: e.currentTarget.value
    })
  }
  async execute(){
    let req = await axios
      .get(`${SERVER_SQLMAP}`, {
        params: {
          url: this.state.url
        }
      })
    this.setState({
      forceUpdate: true,
      file: req.data.file
    })
  }
  render() {
    const formClass: string = isUrl(this.state.url) ? "has-success" : ""
    const inputClass: string = isUrl(this.state.url) ? "is-valid" : ""
    return (
        <Layout title="Web Security Analyzer - SQLMap">
          <h2>sqlmap</h2>
          <Row>
              <Col sm="12" md="6">
                  <p>sqlmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers. It comes with a powerful detection engine, many niche features for the ultimate penetration tester and a broad range of switches lasting from database fingerprinting, over data fetching from the database, to accessing the underlying file system and executing commands on the operating system via out-of-band connections.</p>
              </Col>
              <Col sm="12" md="6">
                <Form onSubmit={(e) => { e.preventDefault(); this.execute()}}>
                  <Row>
                    <Col sm="9">
                      <FormGroup className={formClass}>
                        <Input
                            value={this.state.url}
                            onChange={this.handleChange}
                            name="url"
                            className={`${inputClass}`}
                            id="url"
                            placeholder="https://www.example.com"
                            type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <Button className="btn-icon btn-3" color="default" type="submit">
                        <span className="btn-inner--icon">
                          <i className="fa fa-cog" />
                        </span>
                        <span className="btn-inner--text">Scan</span>
                      </Button>
                    </Col>
                  </Row>
                </Form>
                { this.state.file && 
                  <LogShine file={this.state.file} forceUpdate={this.state.forceUpdate} />
                }
            </Col>
        </Row>
      </Layout>
    )
  }
}