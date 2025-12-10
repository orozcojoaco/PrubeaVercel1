/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface NewsItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  description: string;
}

export interface Career {
  id: string;
  name: string;
  description: string;
  differential: string; // "Qué es de diferente a las demás"
  image: string;
  duration?: string;
}

export interface Faculty {
  id: string;
  name: string;
  shortName?: string;
  image: string;
  description: string;
  careers: Career[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  NEWS = 'news',
  FACULTIES = 'faculties',
}