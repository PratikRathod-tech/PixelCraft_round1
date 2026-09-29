import { PixelScreenConfig } from '../composition/types';

const SAVED_COMPOSITIONS_KEY = 'pixelcraft_saved_compositions';
const FAVORITES_KEY = 'pixelcraft_favorites';
const RECENT_KEY = 'pixelcraft_recent';

export interface SavedComposition {
  id: string;
  name: string;
  updatedAt: string;
  config: PixelScreenConfig;
}

export const getSavedCompositions = (): SavedComposition[] => {
  try {
    const data = localStorage.getItem(SAVED_COMPOSITIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.warn('Failed to load saved compositions:', err);
    return [];
  }
};

export const saveComposition = (name: string, config: PixelScreenConfig): SavedComposition[] => {
  try {
    const list = getSavedCompositions();
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const existingIdx = list.findIndex((item) => item.id === id);

    const newItem: SavedComposition = {
      id,
      name,
      updatedAt: new Date().toISOString(),
      config,
    };

    if (existingIdx >= 0) {
      list[existingIdx] = newItem;
    } else {
      list.unshift(newItem);
    }

    localStorage.setItem(SAVED_COMPOSITIONS_KEY, JSON.stringify(list));
    return list;
  } catch (err) {
    console.warn('Failed to save composition:', err);
    return getSavedCompositions();
  }
};

export const deleteComposition = (id: string): SavedComposition[] => {
  try {
    const list = getSavedCompositions().filter((item) => item.id !== id);
    localStorage.setItem(SAVED_COMPOSITIONS_KEY, JSON.stringify(list));
    return list;
  } catch (err) {
    console.warn('Failed to delete composition:', err);
    return getSavedCompositions();
  }
};

export const getFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (itemId: string): string[] => {
  try {
    const favorites = getFavorites();
    const exists = favorites.includes(itemId);
    const updated = exists ? favorites.filter((id) => id !== itemId) : [...favorites, itemId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getFavorites();
  }
};

export const getRecentItems = (): string[] => {
  try {
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addRecentItem = (itemId: string): string[] => {
  try {
    const recent = getRecentItems().filter((id) => id !== itemId);
    const updated = [itemId, ...recent].slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getRecentItems();
  }
};
