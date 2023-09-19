import { Router } from "express"
import * as Onfido from './controllers/onfido'

const routes = Router()

routes.post('/getSDKToken', Onfido.getSDKToken)
routes.post('/getWorkflowRunId', Onfido.getWorkflowRunId)
routes.get('/getMotionFrame', Onfido.getMotionFrame)


export default routes