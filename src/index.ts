import express, {Request, Response} from 'express'
const app = express()
app.listen(8080)

//dont delete below line
// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Your server is running!')
})
