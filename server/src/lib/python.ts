import { spawn } from 'child_process'

export default class Python {
    private _script: string

    constructor(script: string) {
        this._script = script
    }

    execute(url: string) {
        const py = spawn('python', [this._script, '-u', url])
        return py
    }
}
