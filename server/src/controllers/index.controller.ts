import { Route, Get, Tags, Controller } from 'tsoa'

@Route('/')
export class IndexController extends Controller {
  @Get('/')
  @Tags('Index')
    public index(): Promise<any> {
        return Promise.resolve({})
    }
}
