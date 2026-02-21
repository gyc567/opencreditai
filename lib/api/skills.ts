import { skills, categories, type Skill } from "../skills-data";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface SkillFilter {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

const DEFAULT_PAGE_SIZE = 20;

export function getPaginatedSkills(filter: SkillFilter = {}): PaginatedResult<Skill> {
  const { page = 1, limit = DEFAULT_PAGE_SIZE, category, search } = filter;

  let filteredSkills = skills;

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredSkills = filteredSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(lowerSearch) ||
        skill.description.toLowerCase().includes(lowerSearch) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
    );
  }

  if (category) {
    filteredSkills = filteredSkills.filter((skill) => skill.category === category);
  }

  const total = filteredSkills.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = filteredSkills.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}

export function getSkillCategories() {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    count: cat.count,
    color: cat.color,
  }));
}

export function searchSkillsWithPagination(
  query: string,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE
): PaginatedResult<Skill> {
  return getPaginatedSkills({ search: query, page, limit });
}

export function getSkillsByCategoryWithPagination(
  categoryId: string,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE
): PaginatedResult<Skill> {
  return getPaginatedSkills({ category: categoryId, page, limit });
}

export type { Skill };
