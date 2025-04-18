"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Photo, addPhoto, deletePhoto, getAllPhotos } from "@/lib/photo-service";

export default function AdminDashboard() {
    // State to store photos
    const [photos, setPhotos] = useState<Photo[]>([]);

    // Load photos on component mount
    useEffect(() => {
        setPhotos(getAllPhotos());
    }, []);

    // Form setup
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            imageSrc: "",
        },
    });

    // Handle form submission
    const onSubmit = (data: { title: string; description: string; imageSrc: string }) => {
        // Add photo using the service
        const newPhoto = addPhoto({
            title: data.title,
            description: data.description,
            imageSrc: data.imageSrc,
        });

        // Update local state
        setPhotos([...photos, newPhoto]);
        form.reset();
        toast.success("Photo added successfully");
    };

    // Handle photo deletion
    const handleDeletePhoto = (id: string) => {
        // Delete from service
        const success = deletePhoto(id);

        if (success) {
            // Update local state
            setPhotos(photos.filter((photo) => photo.id !== id));
            toast.success("Photo deleted successfully");
        } else {
            toast.error("Failed to delete photo");
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <Toaster />

            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your photography collection</p>
            </div>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Add New Photo</CardTitle>
                    <CardDescription>Add a new photograph to your gallery</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter photo title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter photo description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageSrc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter image URL" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs">
                                            URL should point to an image file in your public directory or an external image
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="mt-4">
                                <Plus className="h-4 w-4 mr-2" /> Add Photo
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Photography Collection</CardTitle>
                    <CardDescription>Manage your existing photographs</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Image Path</TableHead>
                                <TableHead>Added On</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {photos.map((photo) => (
                                <TableRow key={photo.id}>
                                    <TableCell className="font-medium">{photo.title}</TableCell>
                                    <TableCell>{photo.description}</TableCell>
                                    <TableCell className="truncate max-w-[200px]">{photo.imageSrc}</TableCell>
                                    <TableCell>{photo.createdAt.toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeletePhoto(photo.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {photos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                        No photos found. Add a new photo to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 