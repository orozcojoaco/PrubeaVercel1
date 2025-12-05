/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface NewsItem {
  id: string;
  title: string; // Was name
  category: string; // Was genre
  image: string;
  date: string; // Was day
  description: string;
}

export interface Career {
  id: string;
  name: string;
  faculty: string;
  duration: string;
  color: string;
  description: string;
  features: { icon: any; title: string; desc: string }[];
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  NEWS = 'news',
  CAREERS = 'careers',
  SUMMARY = 'summary',
}