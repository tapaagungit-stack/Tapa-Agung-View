export interface FileData {
  path: string;
  name: string;
  id: string;
  type: 'image' | 'video' | 'pdf' | 'unknown';
  thumbnail?: string;
  fullSize?: string;
}

export enum Category {
  HOME = 'Home',
  ACCOMMODATION = 'Accommodation',
  DINING = 'Dining',
  EXPERIENCES = 'Experiences',
  GALLERY = 'Gallery',
  INFO = 'Information'
}

export interface NavItem {
  label: string;
  value: Category;
  icon?: React.ReactNode;
}