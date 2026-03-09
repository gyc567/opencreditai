export const metadata = {
  title: "Getting Started with ClawSkillStore: Your Complete Guide",
  description: "Learn how to browse, install, and use AI skills from the ClawSkillStore marketplace. Perfect for first-time users.",
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent font-mono text-sm uppercase tracking-wider">
            Getting Started
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground font-mono">
            Getting Started with ClawSkillStore: Your Complete Guide
          </h1>
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <span>March 9, 2026</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
            alt="ClawSkillStore Marketplace"
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-3xl mx-auto prose prose-invert prose-accent">
          <h2>Welcome to ClawSkillStore</h2>
          <p>
            ClawSkillStore is a marketplace for AI agent skills that supercharges your AI assistants 
            with specialized capabilities. Whether you need help with financial analysis, content creation, 
            data processing, or any other task, skills can enhance your AI agents to get work done faster.
          </p>

          <h2>What Are Skills?</h2>
          <p>
            Skills are pre-built capabilities that you can add to your AI agents. Think of them as 
            apps for your AI - each skill gives your agent new abilities. Skills can be:
          </p>
          <ul>
            <li><strong>Free</strong> - No cost to use, great for getting started</li>
            <li><strong>Paid</strong> - Premium skills with advanced features</li>
          </ul>

          <h2>Step 1: Browse the Marketplace</h2>
          <p>
            Start by exploring our marketplace at <a href="/">ClawSkillStore</a>. You can browse skills by category:
          </p>
          <ul>
            <li>Programming & Development</li>
            <li>Data & Analytics</li>
            <li>Marketing & Content</li>
            <li>Finance & Trading</li>
            <li>And many more...</li>
          </ul>
          <p>
            Use the search bar to find specific skills, or filter by category to discover new possibilities.
          </p>

          <h2>Step 2: Understand What You Need</h2>
          <p>
            Before installing a skill, ask yourself:
          </p>
          <ul>
            <li>What task do I want my AI agent to help with?</li>
            <li>Do I need free or premium features?</li>
            <li>What category best fits my use case?</li>
          </ul>
          <p>
            Each skill page shows a description, pricing, version, and installation command - 
            take a moment to read through before deciding.
          </p>

          <h2>Step 3: Install Your First Skill</h2>
          <p>
            Installing a skill is simple. On any skill card, you'll see an installation command. 
            Here's how it works:
          </p>
          <pre><code>npm install @clawskill/[skill-name]</code></pre>
          <p>
            Or if you're using a specific AI framework:
          </p>
          <pre><code>npx clawskill install [skill-name]</code></pre>
          <p>
            Click the copy button on any skill card to copy the installation command to your clipboard.
          </p>

          <h2>Step 4: Configure and Use</h2>
          <p>
            After installation, most skills require minimal configuration. Common setup steps include:
          </p>
          <ol>
            <li><strong>API Keys</strong> - Some skills need API keys for external services</li>
            <li><strong>Environment Variables</strong> - Configure settings via environment variables</li>
            <li><strong>Permissions</strong> - Grant necessary permissions for the skill to function</li>
          </ol>
          <p>
            Each skill's documentation (in the README) provides specific configuration instructions.
          </p>

          <h2>Best Practices for New Users</h2>
          <ul>
            <li><strong>Start Free</strong> - Try free skills first to understand how they work</li>
            <li><strong>Read Descriptions</strong> - Understand what each skill does before installing</li>
            <li><strong>Check Version</strong> - Make sure the skill version is compatible with your setup</li>
            <li><strong>One at a Time</strong> - Install skills gradually to identify any issues</li>
          </ul>

          <h2>Where to Go From Here</h2>
          <p>
            Now that you understand the basics, here's what to explore next:
          </p>
          <ul>
            <li>
              <a href="/blog/create-first-skill-listing">
                <strong>Create Your First Skill Listing</strong>
              </a>
              {' '}- Learn how to sell your own skills
            </li>
            <li>
              <a href="/blog/installing-skills-technical-guide">
                <strong>Technical Deep Dive</strong>
              </a>
              {' '}- Advanced installation and configuration
            </li>
            <li>
              <a href="/blog/navigating-the-marketplace">
                <strong>Marketplace Navigation</strong>
              </a>
              {' '}- Tips for finding the right skills
            </li>
          </ul>

          <h2>Get Started Today</h2>
          <p>
            Ready to supercharge your AI agents? Head back to the{' '}
            <a href="/">marketplace</a> and start exploring skills that match your needs. 
            If you have questions, our documentation and community are here to help.
          </p>

          <hr className="my-8 border-border" />

          <p className="text-muted-foreground">
            Have questions or need help? Contact our support team or join our community 
            of AI developers building the future of agent capabilities.
          </p>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            ← Back to all articles
          </a>
        </div>
      </section>
    </div>
  );
}
