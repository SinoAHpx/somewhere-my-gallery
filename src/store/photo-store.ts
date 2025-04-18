import { create } from "zustand";
import {
	Photo,
	getAllPhotos as getAllPhotosService,
	addPhoto as addPhotoService,
	deletePhoto as deletePhotoService,
} from "@/lib/photo-service";

interface PhotoState {
	photos: Photo[];
	currentIndex: number;
	initializePhotos: () => void;
	addPhoto: (photoData: Omit<Photo, "id" | "createdAt">) => Photo;
	deletePhoto: (id: string) => boolean;
	goToNext: () => void;
	goToPrevious: () => void;
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
	photos: [],
	currentIndex: 0,

	initializePhotos: () => {
		const initialPhotos = getAllPhotosService();
		set({ photos: initialPhotos, currentIndex: 0 });
	},

	addPhoto: (photoData) => {
		const newPhoto = addPhotoService(photoData);
		set((state) => ({ photos: [...state.photos, newPhoto] }));
		return newPhoto;
	},

	deletePhoto: (id) => {
		const success = deletePhotoService(id);
		if (success) {
			set((state) => ({
				photos: state.photos.filter((photo) => photo.id !== id),
				// Adjust currentIndex if the deleted photo affects it
				currentIndex: Math.min(
					state.currentIndex,
					state.photos.length - 2 >= 0 ? state.photos.length - 2 : 0,
				),
			}));
		}
		return success;
	},

	goToNext: () => {
		const { photos, currentIndex } = get();
		if (photos.length > 0) {
			set({ currentIndex: (currentIndex + 1) % photos.length });
		}
	},

	goToPrevious: () => {
		const { photos, currentIndex } = get();
		if (photos.length > 0) {
			set({ currentIndex: (currentIndex - 1 + photos.length) % photos.length });
		}
	},
}));
