export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with OpenCreditAi: Your Complete Guide",
    excerpt: "Learn how to browse, install, and use AI skills from the OpenCreditAi marketplace. Perfect for first-time users.",
    date: "March 9, 2026",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    slug: "getting-started-with-opencreditai",
    category: "Getting Started",
  },
  {
    id: "2",
    title: "How to Create Your First Skill Listing",
    excerpt: "A step-by-step guide to listing your AI skill on OpenCreditAi. From registration to publishing your first skill.",
    date: "March 8, 2026",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    slug: "create-first-skill-listing",
    category: "Seller Guide",
  },
  {
    id: "3",
    title: "Understanding Skill Pricing: Free vs Paid Skills",
    excerpt: "Everything you need to know about skill pricing models. Learn when to offer free skills and how to set paid pricing.",
    date: "March 7, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=450&fit=crop",
    slug: "understanding-skill-pricing",
    category: "Pricing Guide",
  },
  {
    id: "4",
    title: "Installing Skills in Your AI Agent: Technical Deep Dive",
    excerpt: "Technical guide for developers. Learn how to integrate and configure AI skills in your agent workflow.",
    date: "March 6, 2026",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    slug: "installing-skills-technical-guide",
    category: "Technical",
  },
  {
    id: "5",
    title: "Best Practices for Writing Skill Descriptions",
    excerpt: "Write compelling skill descriptions that convert visitors to users. Tips from top-performing sellers.",
    date: "March 5, 2026",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&h=450&fit=crop",
    slug: "skill-description-best-practices",
    category: "Seller Tips",
  },
  {
    id: "6",
    title: "Navigating the Marketplace: Tips for Finding the Right Skills",
    excerpt: "Master the search and filter tools to find exactly what you need. Category guides and search strategies.",
    date: "March 4, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop",
    slug: "navigating-the-marketplace",
    category: "Getting Started",
  },
];
