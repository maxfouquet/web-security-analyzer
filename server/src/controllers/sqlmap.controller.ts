import { Route, Get, Query, Example, Tags, Controller } from 'tsoa'
import * as fs from 'fs'
import Python from '../lib/python'
import { promisify } from 'util'
import * as isUrl from 'is-url'

const appendFileAsync = promisify(fs.appendFile)
const writeFileAsync = promisify(fs.writeFile)

@Route('sqlmap')
export class SqlmapController extends Controller{

    private _script: string = './submodules/sqlmap/sqlmap.py'
    private _dir: string = './src/public/logs/'
    private _file: string = 'sqlmap-'+ Date.now() +'.log'

    @Get('/')
    @Tags('sqlmap')
    @Example({
        file: 'sqlmap-1564233482892.log'
    })
    public async index(@Query() url: string): Promise<any> {
        const sqlmapCmd = new Python(this._script)
        try {
            await writeFileAsync(this._dir + this._file, '', 'utf8')
        } catch(err) {
            console.error('Py log file was not created: ' + err)
        }
        if(isUrl(url)){
            const py = sqlmapCmd.execute(url)
            py.stdout.on('data', async (data) => {
                try {
                    await appendFileAsync(this._dir + this._file, data.toString())
                } catch(err) {
                    console.error('Py line was not appended to log file: ' + err)
                }
            })
            py.stderr.on('data', (err) => {
                console.error(err.toString())
            })
        } else {
            this.setStatus(407)
            console.error('URL bad format: ' + url)
        }
        return Promise.resolve({ file: this._file })
    }
}