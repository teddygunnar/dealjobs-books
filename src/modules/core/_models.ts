export interface CategoryInt {
    id: number;
    name: string;
}

export interface BookInt {
    audio_length: number;
    authors: string[];
    category_id: number;
    cover_url: string;
    description: string;
    id: number;
    sections: SectionType[];
    title: string;
}

export interface BookIntBookmark extends BookInt {
    bookmarked: boolean;
}

export type SectionType = {
    content: string;
    title: string;
}