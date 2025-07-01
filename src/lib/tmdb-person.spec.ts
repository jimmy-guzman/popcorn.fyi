import { getKnownForHighlights } from "./tmdb-person";

const createCast = (overrides = {}) => {
  return {
    adult: false,
    id: Math.random(),
    media_type: "movie",
    order: 1,
    popularity: 50,
    video: false,
    vote_average: 7,
    vote_count: 1500,
    ...overrides,
  };
};

const createCrew = (overrides = {}) => {
  return {
    adult: false,
    department: "Directing",
    id: Math.random(),
    media_type: "movie",
    popularity: 70,
    video: false,
    vote_average: 8,
    vote_count: 2000,
    ...overrides,
  };
};

describe("getKnownForHighlights", () => {
  it("should return empty array if no cast and crew provided", () => {
    const result = getKnownForHighlights({ cast: [], crew: [], id: 1 });

    expect(result).toStrictEqual([]);
  });

  it("should return top cast roles based on notability and uniqueness", () => {
    const cast = [
      createCast({ id: 1, order: 1, vote_average: 9, vote_count: 3000 }),
      createCast({ id: 2, order: 2, vote_average: 8, vote_count: 2500 }),
      createCast({ id: 3, order: 3, vote_average: 7, vote_count: 1000 }),
    ];

    const result = getKnownForHighlights({ cast, id: 1 });

    expect(result).toHaveLength(3);
    expect(result[0]?.id).toBe(1);
  });

  it("should filter out insignificant cast roles based on order and vote_count", () => {
    const cast = [
      createCast({ id: 1, order: 1, vote_count: 0 }),
      createCast({ id: 2, order: 15, vote_count: 100 }),
      createCast({ id: 3, order: 5, vote_count: 100 }),
    ];

    const result = getKnownForHighlights({ cast, id: 1 });

    expect(result.map((r) => r.id)).toStrictEqual([3]);
  });

  it("should include only TV roles with sufficient episode count", () => {
    const cast = [
      createCast({
        episode_count: 3,
        id: 1,
        media_type: "tv",
        vote_count: 100,
      }),
      createCast({
        episode_count: 6,
        id: 2,
        media_type: "tv",
        vote_count: 100,
      }),
    ];

    const result = getKnownForHighlights({ cast, id: 1 });

    expect(result.map((r) => r.id)).toStrictEqual([2]);
  });

  it("should limit results to the given count", () => {
    const cast = Array.from({ length: 20 }, (_, i) =>
      createCast({ id: i + 1 }),
    );

    const result = getKnownForHighlights({ cast, id: 1 }, "Acting", 5);

    expect(result).toHaveLength(5);
  });

  it("should return top crew roles for non-acting departments", () => {
    const crew = [
      createCrew({ id: 1, vote_average: 9, vote_count: 5000 }),
      createCrew({ id: 2, vote_average: 7, vote_count: 1000 }),
    ];

    const result = getKnownForHighlights({ crew, id: 1 }, "Directing");

    expect(result.map((r) => r.id)).toStrictEqual([1, 2]);
  });

  it("should ignore crew roles from other departments", () => {
    const crew = [
      createCrew({ department: "Writing", id: 1 }),
      createCrew({ department: "Directing", id: 2 }),
    ];

    const result = getKnownForHighlights({ crew, id: 1 }, "Directing");

    expect(result.map((r) => r.id)).toStrictEqual([2]);
  });

  it("should de-duplicate by id", () => {
    const cast = [
      createCast({ id: 1 }),
      createCast({ id: 1 }), // duplicate
    ];

    const result = getKnownForHighlights({ cast, id: 1 });

    expect(result).toHaveLength(1);
  });
});
