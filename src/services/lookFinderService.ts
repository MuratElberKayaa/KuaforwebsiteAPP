import { PortfolioItem, LookFinderPreferences } from '../types';
import { portfolioData } from '../data/portfolioData';

/**
 * Look Finder Recommendation Service
 * 
 * Uses a weighted multi-criteria matching engine to pair user style preferences
 * (Vibe, Hair Length, Desired Action) with curated haute coiffure portfolio items.
 * 
 * Extensible design: Can be swapped with Gemini Embeddings / Vector Search API in the future.
 */

export interface ScoredLookItem {
  item: PortfolioItem;
  score: number;
  matchReasons: string[];
}

export function recommendLooks(preferences: LookFinderPreferences): PortfolioItem[] {
  const { vibe, length, action } = preferences;

  const scoredList: ScoredLookItem[] = portfolioData.map((item) => {
    let score = 0;
    const matchReasons: string[] = [];

    // 1. Action / Service intent match (Weight: 40 points)
    if (action === 'not-sure') {
      score += 30; // Flexible intent
    } else if (item.actions?.includes(action)) {
      score += 40;
      matchReasons.push('Aradığınız işlem tekniğiyle birebir eşleşiyor');
    }

    // 2. Vibe / Aesthetic match (Weight: 35 points)
    if (item.vibes?.includes(vibe)) {
      score += 35;
      matchReasons.push('İstediğiniz stil aurasını yansıtıyor');
    }

    // 3. Hair Length match (Weight: 25 points)
    if (item.hairLengths?.includes(length)) {
      score += 25;
      matchReasons.push('Saç boyunuza uygun formda');
    }

    // Category relevance booster
    if (action === 'cut' && item.category === 'kesim') score += 10;
    if (action === 'balayage' && (item.category === 'balayage' || item.category === 'ombre')) score += 10;
    if (action === 'color' && item.category === 'renk') score += 10;
    if (action === 'styling' && (item.category === 'styling' || item.category === 'gelin')) score += 10;
    if (action === 'treatment' && item.category === 'bakim') score += 10;

    return { item, score, matchReasons };
  });

  // Sort by highest score first
  scoredList.sort((a, b) => b.score - a.score);

  // Return top matching portfolio items
  const results = scoredList.map((entry) => entry.item);

  // Ensure at least 3-4 results are returned
  return results.slice(0, 4);
}

