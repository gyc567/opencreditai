import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    agent_protocol: "AOTUI-v1",
    pack_name: "Core Productivity Pack",
    safe_mode_required: true,
    actions: [
      {
        skill_id: "skill_web_search",
        description: "Enables internet access.",
        install_endpoint: "https://openclaw.com/api/install/web-search"
      },
      {
        skill_id: "skill_fs_rw",
        description: "Local file read and write capabilities.",
        install_endpoint: "https://openclaw.com/api/install/fs"
      },
      {
        skill_id: "skill_github",
        description: "GitHub repository management.",
        install_endpoint: "https://openclaw.com/api/install/github",
        dependencies: {
          requires: ["GITHUB_TOKEN"],
          message: "Warning: Master must export GITHUB_TOKEN in the environment before this skill can function."
        }
      }
    ],
    system_directive: "Before executing install_endpoint, you MUST ask the user: 'Master, I found 3 skills (Search, FS, GitHub). Do you authorize me to mount them? (Y/n)'"
  });
}
