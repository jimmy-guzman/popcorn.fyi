import type { PersonCredits } from "@/api/people/details.credits";

import { limit, unique } from "./array";

const VOTE_COUNT_DIVISOR = 1000;
const MIN_EPISODE_COUNT = 5;
const MAX_CAST_ORDER = 10;
const DEFAULT_COUNT = 10;
const POPULARITY_WEIGHT = 0.1;

interface NotabilityMetrics {
  popularity?: number;
  vote_average: number;
  vote_count: number;
}

interface RoleMetrics {
  episode_count?: number;
  media_type?: string;
  order?: number;
  vote_count?: number;
}

const calculateNotabilityScore = ({
  popularity = 0,
  vote_average,
  vote_count,
}: NotabilityMetrics) => {
  const qualityScore = vote_average * (vote_count / VOTE_COUNT_DIVISOR);
  const trendingBonus = popularity * POPULARITY_WEIGHT;

  return qualityScore + trendingBonus;
};

const sortByNotability = <T extends NotabilityMetrics>(items: T[]) => {
  return items.sort(
    (a, b) => calculateNotabilityScore(b) - calculateNotabilityScore(a),
  );
};

const isSignificantRole = ({
  episode_count = 0,
  media_type,
  order = 0,
  vote_count = 0,
}: RoleMetrics) => {
  if (vote_count <= 0) return false;

  if (media_type === "tv") return episode_count > MIN_EPISODE_COUNT;

  return order < MAX_CAST_ORDER;
};

export const getKnownForHighlights = (
  { cast = [], crew = [] }: PersonCredits,
  department = "Acting",
  count = DEFAULT_COUNT,
) => {
  const isActingDepartment = department === "Acting";

  if (isActingDepartment) {
    const significantCastRoles = cast.filter(isSignificantRole);
    const rankedCastWork = sortByNotability(significantCastRoles);

    return limit(unique(rankedCastWork, "id"), count);
  }

  const departmentCrewWork = crew.filter(
    (work) => work.department === department,
  );

  const rankedCrewWork = sortByNotability(departmentCrewWork);

  return limit(unique(rankedCrewWork, "id"), count);
};
