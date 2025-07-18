import camelCase from './case'
import { readFileSync, writeFileSync } from "fs"
import path from "path"

const endpointSetup = (feature: string)=>{
    const name = camelCase(feature)
    const root = process.cwd()
    const serverFile = path.join(root, "src", "index.ts")
    const contents = readFileSync(serverFile, "utf-8")
    const arr = contents.split("\n")
    const ui: string[] = []
    
    for(let item of arr)
    {   
        ui.push(item)

        if(item === "// Routes")
            ui.push(`import ${name}Router from './${feature}/${feature}.routes'`)
    }

    ui.push(`app.use('/${feature}', ${name}Router)`)
    writeFileSync(serverFile, ui.join("\n").toString())
    return true
}

export default endpointSetup