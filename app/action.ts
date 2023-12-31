import { revalidatePath } from "next/cache";
import prisma from "./db"

   export async function create(FormData: FormData) {
    "use server"

    const input = FormData.get("input") as string

    await prisma.todo.create({data: 
      {
        input: input,
      }});

      revalidatePath("/");
  }

  export async function edit(FormData: FormData) {
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


  export async function deletItems(FormData: FormData){
    

    "use server"

    const inputId = FormData.get("inputId") as string

    await prisma.todo.delete({
      where: {
        id: inputId
      }
    });

    revalidatePath("/");

  }