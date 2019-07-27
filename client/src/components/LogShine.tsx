import * as React from 'react'
import axios from 'axios'
import ReactInterval from 'react-interval'
import { SERVER_LOGS } from '../../config/config'
import Loader from 'react-spinners/FadeLoader'

interface Props {
    file: string,
    forceUpdate: boolean
}
interface State {
    code: any,
    output: string,
    forceUpdate: boolean
}

export default class LogShine extends React.Component<Props, State> {
    state: State = {
        output: '',
        code: '',
        forceUpdate: this.props.forceUpdate
    }
    async componentDidMount(){
        await this.log()
    }
    async componentWillUpdate(){
        if(this.state.forceUpdate != this.props.forceUpdate){
            this.setState({
                forceUpdate: this.props.forceUpdate
            })
        }
    }
    async log(){
        let req = await axios.get(`${SERVER_LOGS}/${this.props.file}`)
        this.setState({
            forceUpdate: false,
            output: req.data.replace(/\r\n/g,'<br />')
        })
        if(this.state.code)
            this.state.code.scrollTop = this.state.code.scrollHeight
    }
    enable(){
        return this.props.file !== "" 
            && this.state.output.indexOf("[*] ending @") === -1 
            || this.state.forceUpdate
    }
    render() {
        return (
            <div ref={(ref) => this.state.code = ref} className="code">
                <p style={{fontSize:10}} dangerouslySetInnerHTML={{__html: this.state.output}}></p>
                <Loader
                    height={10}
                    width={3}
                    sizeUnit={"px"}
                    color={'#fff'}
                    loading={this.state.output === ''} 
                />
                <ReactInterval timeout={1000} enabled={this.enable()} callback={() => this.log()} />
                <style jsx>{`
                    .code{
                        background-color: black;
                        color: #fff;
                        padding: 15px;
                        overflow-y: scroll;
                        height: 450px;
                        max-height: 450px;
                    }
                `}</style>
            </div>
        )
    }
}