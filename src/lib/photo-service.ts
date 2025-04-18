// This is a simple mock implementation of a photo service
// In a real application, this would likely be connected to a database

// Define the Photo type
export type Photo = {
	id: string;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: Date;
};

// Mock storage - this would be replaced with a real database in production
let photos: Photo[] = [
	{
		id: "1",
		title: "Hateruni",
		description: "A beautiful photograph from the collection.",
		imageSrc: "/hateruni.png",
		createdAt: new Date(),
	},
];

/**
 * Get all photos
 */
export const getAllPhotos = (): Photo[] => {
	return [...photos];
};

/**
 * Get a photo by ID
 */
export const getPhotoById = (id: string): Photo | undefined => {
	return photos.find((photo) => photo.id === id);
};

/**
 * Add a new photo
 */
export const addPhoto = (photo: Omit<Photo, "id" | "createdAt">): Photo => {
	const newPhoto: Photo = {
		...photo,
		id: Date.now().toString(), // Simple ID generation
		createdAt: new Date(),
	};

	photos = [...photos, newPhoto];
	return newPhoto;
};

/**
 * Update an existing photo
 */
export const updatePhoto = (
	id: string,
	photoData: Partial<Omit<Photo, "id" | "createdAt">>,
): Photo | null => {
	const photoIndex = photos.findIndex((p) => p.id === id);

	if (photoIndex === -1) {
		return null;
	}

	const updatedPhoto = {
		...photos[photoIndex],
		...photoData,
	};

	photos = [
		...photos.slice(0, photoIndex),
		updatedPhoto,
		...photos.slice(photoIndex + 1),
	];

	return updatedPhoto;
};

/**
 * Delete a photo by ID
 */
export const deletePhoto = (id: string): boolean => {
	const initialLength = photos.length;
	photos = photos.filter((photo) => photo.id !== id);
	return photos.length < initialLength;
};
