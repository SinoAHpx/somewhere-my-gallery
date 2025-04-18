import Image from "next/image";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function Display({ src = '/hateruni.png', title = 'Photography', description = 'A beautiful photograph from the collection.' }: {
    src?: string,
    title?: string,
    description?: string
}) {
    return <>
        <div className="flex flex-col items-center">
            <Image className="select-none" draggable={false} alt={title} src={src} width={1000} height={100} />
            {title &&
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'link'}>
                            <h2 className="text-2xl font-semibold mt-4">{title}</h2>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>
                                {description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Image
                                className="mx-auto"
                                src={src}
                                alt={title}
                                width={400}
                                height={400}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            }
        </div>
    </>
}