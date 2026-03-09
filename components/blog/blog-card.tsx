import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
        {/* Image */}
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs text-accent font-mono uppercase tracking-wider">
            {post.category}
          </span>

          {/* Title */}
          <h3 className="mt-2 text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.date} · {post.readTime}</span>
            <span className="flex items-center gap-1 text-accent group-hover:translate-x-1 transition-transform">
              Read article →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
