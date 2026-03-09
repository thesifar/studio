
import { PlaceHolderImages } from "./placeholder-images";

export type BhajanType = 'audio' | 'video';

export interface Bhajan {
  id: string;
  title: string;
  artist: string;
  type: BhajanType;
  category: string;
  language: string;
  description: string;
  thumbnail: string;
  url: string;
  duration: string;
  tags: string[];
  createdAt: string;
}

export const CATEGORIES = [
  "Krishna Bhakti",
  "Shiva Mahima",
  "Devi Aradhana",
  "Ganesha Stuti",
  "Hanuman Chalisa",
  "Ram Bhajan",
  "Sufi Devotional"
];

export const LANGUAGES = ["Hindi", "Sanskrit", "Marathi", "Gujarati", "Bengali"];

export const BHAJANS: Bhajan[] = [
  {
    id: "1",
    title: "Achyutam Keshavam",
    artist: "Shreya Ghoshal",
    type: "audio",
    category: "Krishna Bhakti",
    language: "Hindi",
    description: "A soulful rendition praising the various names of Lord Krishna.",
    thumbnail: PlaceHolderImages.find(img => img.id === "krishna-bhajan")?.imageUrl || "",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "05:12",
    tags: ["Peaceful", "Krishna", "Morning"],
    createdAt: "2024-03-10T10:00:00Z"
  },
  {
    id: "2",
    title: "Shiv Tandav Stotram",
    artist: "Ravana (Traditional)",
    type: "video",
    category: "Shiva Mahima",
    language: "Sanskrit",
    description: "The powerful hymn of Lord Shiva representing the cosmic dance.",
    thumbnail: PlaceHolderImages.find(img => img.id === "shiva-meditation")?.imageUrl || "",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "09:45",
    tags: ["Energetic", "Shiva", "Sanskrit"],
    createdAt: "2024-03-11T12:00:00Z"
  },
  {
    id: "3",
    title: "Gajananam Bhuta Ganadhi Sevitam",
    artist: "Pandit Jasraj",
    type: "audio",
    category: "Ganesha Stuti",
    language: "Sanskrit",
    description: "A serene invocation to Lord Ganesha for wisdom and prosperity.",
    thumbnail: PlaceHolderImages.find(img => img.id === "ganesha-mantra")?.imageUrl || "",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "04:30",
    tags: ["Invocation", "Ganesha", "Traditional"],
    createdAt: "2024-03-12T09:30:00Z"
  },
  {
    id: "4",
    title: "Durga Chalisa",
    artist: "Anuradha Paudwal",
    type: "video",
    category: "Devi Aradhana",
    language: "Hindi",
    description: "Forty verses dedicated to Goddess Durga, the epitome of power.",
    thumbnail: PlaceHolderImages.find(img => img.id === "devi-bhakti")?.imageUrl || "",
    url: "https://www.w3schools.com/html/movie.mp4",
    duration: "12:20",
    tags: ["Bhakti", "Durga", "Navratri"],
    createdAt: "2024-03-13T15:00:00Z"
  },
  {
    id: "5",
    title: "Madhurashtakam",
    artist: "M.S. Subbulakshmi",
    type: "audio",
    category: "Krishna Bhakti",
    language: "Sanskrit",
    description: "Describing the sweetness of Lord Krishna through poetic verses.",
    thumbnail: PlaceHolderImages.find(img => img.id === "krishna-bhajan")?.imageUrl || "",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "06:15",
    tags: ["Devotional", "Krishna", "Classical"],
    createdAt: "2024-03-14T08:00:00Z"
  }
];
