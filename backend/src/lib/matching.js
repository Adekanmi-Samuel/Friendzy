// Friendzy Matching Algorithm
// Combines personality, interests, location, and seeking alignment

/**
 * Calculate compatibility score between two users (0-100)
 */
export function calculateCompatibility(user1, user2) {
  let score = 0;
  const weights = {
    interests: 25,
    personality: 30,
    age: 10,
    location: 15,
    seeking: 20,
  };

  // 1. Interests (25%)
  const interests1 = user1.interests || [];
  const interests2 = user2.interests || [];
  const commonInterests = interests1.filter(i => interests2.includes(i));
  const maxInterests = Math.max(interests1.length, interests2.length, 1);
  const interestScore = (commonInterests.length / maxInterests) * 100;
  score += interestScore * (weights.interests / 100);

  // 2. Personality (30%)
  const p1 = user1.personality || { openness: 50, conscientiousness: 50, extraversion: 50, agreeableness: 50, neuroticism: 50 };
  const p2 = user2.personality || { openness: 50, conscientiousness: 50, extraversion: 50, agreeableness: 50, neuroticism: 50 };

  const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  const diffs = traits.map(t => Math.abs((p1[t] || 50) - (p2[t] || 50)));
  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const personalityScore = Math.max(0, 100 - avgDiff);
  score += personalityScore * (weights.personality / 100);

  // 3. Age (10%)
  const age1 = user1.age || 25;
  const age2 = user2.age || 25;
  const ageDiff = Math.abs(age1 - age2);
  const ageScore = Math.max(0, 100 - ageDiff * 5);
  score += ageScore * (weights.age / 100);

  // 4. Location (15%)
  const locationScore = calculateLocationScore(user1, user2);
  score += locationScore * (weights.location / 100);

  // 5. Seeking alignment (20%)
  const seeking1 = user1.seeking || 'FRIENDSHIP';
  const seeking2 = user2.seeking || 'FRIENDSHIP';
  const seekingScore = seeking1 === seeking2 ? 100 :
    (seeking1 === 'ANY' || seeking2 === 'ANY') ? 70 : 50;
  score += seekingScore * (weights.seeking / 100);

  return Math.round(Math.min(100, Math.max(0, score)));
}

/**
 * Calculate location compatibility
 */
function calculateLocationScore(user1, user2) {
  // Same region = 90
  // Same continent = 70
  // Different continent = 40
  const regions = { NG: 'Africa', GH: 'Africa', KE: 'Africa', US: 'Americas', CA: 'Americas', BR: 'Americas', UK: 'Europe', DE: 'Europe', FR: 'Europe', IN: 'Asia', SG: 'Asia', PH: 'Asia' };

  const region1 = regions[user1.region] || 'Unknown';
  const region2 = regions[user2.region] || 'Unknown';

  if (user1.region === user2.region) return 100;
  if (region1 === region2) return 80;
  if (region1 !== 'Unknown' && region2 !== 'Unknown') return 50;
  return 40;
}

/**
 * Get match recommendations for a user
 */
export function getRecommendations(user, candidates, limit = 20) {
  const scored = candidates.map(candidate => ({
    ...candidate,
    compatibility: calculateCompatibility(user, candidate),
  }));

  // Sort by compatibility score (highest first)
  scored.sort((a, b) => b.compatibility - a.compatibility);

  return scored.slice(0, limit);
}
