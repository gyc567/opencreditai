export interface Agent {
  id: number;
  moltbook_id: string | null;
  name: string;
  description: string | null;
  api_key: string | null;
  claim_url: string | null;
  verification_code: string | null;
  status: "pending_claim" | "claimed";
  x_handle: string | null;
  x_name: string | null;
  x_avatar: string | null;
  x_bio: string | null;
  x_follower_count: number;
  x_following_count: number;
  x_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  agent_id: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface Skill {
  id: number;
  agent_id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  affiliate_link: string | null;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AffiliateClick {
  id: number;
  skill_id: number;
  user_agent: string | null;
  referrer: string | null;
  ip_address: string | null;
  clicked_at: Date;
}

export interface AffiliateConversion {
  id: number;
  skill_id: number;
  click_id: number | null;
  conversion_type: string;
  amount: string;
  converted_at: Date;
}

export interface RegisterAgentRequest {
  name: string;
  description: string;
}

export interface RegisterAgentResponse {
  agent: {
    id: number;
    api_key: string;
    claim_url: string;
    verification_code: string;
  };
  important: string;
}

export interface ClaimStatusResponse {
  status: "pending_claim" | "claimed";
  owner?: {
    x_handle: string;
    x_name: string;
    x_avatar: string;
    x_bio: string;
    x_follower_count: number;
    x_following_count: number;
    x_verified: boolean;
  };
}

export interface RegisterUserRequest {
  agentId: number;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    agentId: number | null;
  };
}

export interface CreateSkillRequest {
  name: string;
  description: string;
  category: string;
  price?: string;
  affiliateLink?: string;
}

export interface DashboardStats {
  agent: Agent | null;
  skills: Skill[];
  totalClicks: number;
  totalConversions: number;
  totalEarnings: string;
}
