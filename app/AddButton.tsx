import { Button } from "@/components/ui/button"
import { InputDemo } from "./input";

const AddButon = () => {
    const setInput = InputDemo
    const handelResetInput = () => {
        // je veux que dec je click sur se button le input du fichier input est vide
        
    }
    return(
        <Button onClick={handelResetInput}  className="mt-5" type="submit" variant="destructive">Ajouter</Button>
    )
}