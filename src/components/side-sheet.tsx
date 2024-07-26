import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { RiMenuUnfoldFill } from "react-icons/ri";
import Image from "next/image";


export function SideSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex p-1 items-center cursor-pointer rounded-md hover:scale-110">
          {/* <Image width={32} height={32} alt="logo" src="/logo.png"></Image> */}
          <RiMenuUnfoldFill className="w-8 h-8 text-primary" />
        </div>
        {/* <Button variant="outline">Open</Button> */}
      </SheetTrigger>
      <SheetContent side={"left"} className="z-[999]">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full">ddd</div>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
