import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import prisma from "./../db";
import { create, deletItems, edit } from "../action";



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
export default async function Better() {
    const data = await getData();
    return (
        <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl bg-green-500 p-10 w-[30vw]">
        <form action={create}  className="flex flex-col">
          <Input type="text" name="input" className="border p-1 " />

          <Button className="mt-5" type="submit" variant="destructive">Ajouter</Button>
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