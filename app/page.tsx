import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import prisma from "./db"
import { revalidatePath } from "next/cache";
import { toast } from "sonner"
import { useState } from "react";





async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      id: true,
      input: true,
    },
    orderBy: {
      createdAt: "desc",
    }
  });
  return data;
}

export  default async function Home() {
 
  
  
 
  const data = await getData();

  async function create(FormData: FormData) {
    "use server"

    const input = FormData.get("input") as string

    await prisma.todo.create({data: 
      {
        input: input,
      }});

      revalidatePath("/");
  }

  async function edit(FormData: FormData) {
    "use server"
    const input = FormData.get("input") as string
    const inputId = FormData.get("inputId") as string

    await prisma.todo.update({
      where: {
        id: inputId
      },
      data: {
        input: input
      }
    })

    revalidatePath("/");
  }


  async function deletItems(FormData: FormData){
    

    "use server"

    const inputId = FormData.get("inputId") as string

    await prisma.todo.delete({
      where: {
        id: inputId
      }
    });

    revalidatePath("/");

  }
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl bg-green-500 p-10 w-[30vw]">
        <form action={create} method="post" className="flex flex-col">
        <Input  type="text" name="input" className="border p-1 " />
          <Button  className="mt-5" type="submit" variant="destructive">Ajouter</Button>
          
        </form>

        <div className="mt-5 flex flex-col gap-y-2">
          <ul>
            {data.map((todo) => (
              <form key={todo.id} className="flex" action={edit}>
                <input type="hidden" name="inputId" value={todo.id} className="" />
                <Input className="border p-1" type="text" name="input" defaultValue={todo.input} />
                <Button type="submit"  className="">Save</Button>
                <Button formAction={deletItems} variant="destructive">Delete</Button>
              </form>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
