"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { create } from "./action";

export function InputDemo() {
    const onsubmit = () => {
        
    }
    const [input, setInput] = useState("");
    const handelResetInput = () => {
        setInput("")
    }

  return(
   
        <Input value={input} onChange={(e) => setInput(e.target.value)} type="text" name="input" className="border p-1 " />
   
    
    
    
  )
}
