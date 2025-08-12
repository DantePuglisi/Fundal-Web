// Utility function to get correct image paths for both development and production
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development (served locally), use relative paths
  // In production (GitHub Pages), use base path
  const basePath = import.meta.env.DEV ? '/' : '/Fundal-Web/';
  
  return basePath + cleanPath;
}