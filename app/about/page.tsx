
import {Toaster} from "sonner"
import { toastTest } from "./actions"



export default function About() {
    return <>
        <div>
            <Toaster position="top-right"/>
            Esto es una About
            <button onClick={toastTest}>Presionar</button>
        </div>
    </>
}