# OpenSpec: Skill Seller 页面设计与实现 (修订版)

## 1. 概述

本规范定义了 ClawSkillStore 平台的 Skill Seller 功能，允许 AI Agent 注册为创作者（Creator）、上传技能并通过 x402 协议接收支付。

**关键决策：** 复用现有 `creators` 架构，避免数据冗余。

## 2. 背景与目标

### 2.1 背景

- 平台已存在 `creators` 表和 `listings` 表
- 已有 `/api/v1/creators` API 实现
- 已有 `lib/x402` 支付模块
- 缺少前端卖家界面和完整的 x402 集成

### 2.2 目标

1. 提供卖家注册入口（复用 creators API）
2. 支持技能上架与定价（复用 listings API）
3. 集成 x402 支付协议保护技能获取
4. 遵循 KISS 原则，复用现有代码

## 3. 功能需求

### 3.1 卖家注册

复用现有 `creators` 表结构：

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| address | string | 是 | Ethereum 钱包地址 |
| username | string | 是 | 用户名（唯一） |
| displayName | string | 否 | 显示名称 |
| bio | string | 否 | 简介 |
| avatarUrl | string | 否 | 头像 URL |
| category | string | 否 | 分类 |

**API:** `POST /api/v1/creators`

### 3.2 技能上架

复用现有 `listings` 表，新增 `tags` 字段：

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | string | 是 | 技能名称 |
| description | string | 是 | 技能描述 |
| priceUsd | number | 是 | 价格 (USD) |
| category | string | 是 | 分类 |
| tags | string[] | 否 | 标签（新增） |
| packageUrl | string | 是 | 安装包 URL |
| version | string | 否 | 版本号 |

**API:** `POST /api/v1/creators/[id]/listings`

### 3.3 x402 支付集成

- 使用 x402 协议接收 USDC 支付
- 支持 Base 链 (EIP-155:84532)
- 5% 平台费
- $50 最低提现
- 7 天退款窗口

**API:** `GET /api/listings/[id]` (返回 402 状态码 + 支付要求)

## 4. 数据库变更

### 4.1 新增字段

```sql
-- 添加 tags 字段到 listings 表
ALTER TABLE listings ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- 添加 installation_command 字段（可选，如果 package_url 不够）
ALTER TABLE listings ADD COLUMN IF NOT EXISTS installation_command TEXT;
```

### 4.2 现有表结构

**creators 表（已存在）：**
```sql
CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  address VARCHAR(42) NOT NULL UNIQUE,
  username VARCHAR(30) NOT NULL UNIQUE,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  category VARCHAR(50) DEFAULT 'general',
  is_verified BOOLEAN DEFAULT false,
  total_earnings DECIMAL(10,4) DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**listings 表（已存在，需扩展）：**
```sql
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES creators(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  price_usd DECIMAL(10,4) NOT NULL DEFAULT 0,
  version VARCHAR(20) DEFAULT '1.0.0',
  package_url TEXT,
  is_published BOOLEAN DEFAULT false,
  x402_enabled BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',  -- 新增
  installation_command TEXT, -- 新增
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 5. 页面设计

### 5.1 路由结构

```
/seller                    → 重定向到 /seller/register 或 /seller/dashboard
/seller/register           → 创作者注册页面
/seller/dashboard          → 卖家控制台（展示统计数据和技能列表）
/seller/listings/new       → 新建技能页面
```

### 5.2 页面组件

1. **SellerRegister** (`app/seller/register/page.tsx`)
   - 钱包连接（复用 `WalletConnect`）
   - 注册表单（username, displayName, bio, category）
   - 调用 `POST /api/v1/creators`

2. **SellerDashboard** (`app/seller/dashboard/page.tsx`)
   - 统计卡片（总收入、销售数量、评分）
   - 技能列表（调用 `GET /api/v1/creators/[id]/listings`）
   - 新建技能按钮

3. **SkillListingForm** (`app/seller/listings/new/page.tsx`)
   - 技能信息表单
   - 价格设置
   - 标签输入
   - 调用 `POST /api/v1/creators/[id]/listings`

### 5.3 导航更新

在 navbar 添加 "Sell Skills" 菜单项，链接到 `/seller`。

## 6. API 设计

### 6.1 复用现有 API

| 功能 | 方法 | 端点 | 状态 |
|------|------|------|------|
| 注册创作者 | POST | `/api/v1/creators` | ✅ 已存在 |
| 获取创作者信息 | GET | `/api/v1/creators/[id]` | ✅ 已存在 |
| 创建技能 | POST | `/api/v1/creators/[id]/listings` | ✅ 已存在 |
| 获取技能列表 | GET | `/api/v1/creators/[id]/listings` | ✅ 已存在 |
| 获取公开技能 | GET | `/api/listings` | ✅ 已存在 |

### 6.2 需要修改的 API

**GET /api/listings/[id]** - 添加 x402 支付保护

```typescript
// 如果未支付，返回 402
if (!hasValidPayment) {
  return NextResponse.json(
    { 
      error: "Payment Required",
      x402: {
        version: 2,
        accepts: [{
          scheme: "exact",
          network: "eip155:84532",
          amount: usdToMicroUsd(listing.price_usd),
          asset: "USDC",
          payTo: creator.address
        }]
      }
    },
    { status: 402 }
  );
}
```

## 7. 技术实现

### 7.1 依赖

- 复用 `lib/x402` 模块
- 复用 `components/wallet/connect.tsx`
- 复用 `lib/db/client.ts`

### 7.2 文件结构

```
app/
├── seller/
│   ├── page.tsx                    # 重定向逻辑
│   ├── layout.tsx                  # 卖家页面布局
│   ├── register/
│   │   └── page.tsx               # 注册页面
│   ├── dashboard/
│   │   └── page.tsx               # 控制台
│   └── listings/
│       └── new/
│           └── page.tsx           # 新建技能
├── api/
│   └── listings/
│       └── [id]/
│           └── route.ts           # 修改：添加 x402 保护
└── components/
    └── seller/
        ├── creator-form.tsx       # 创作者注册表单
        ├── listing-form.tsx       # 技能上架表单
        ├── stats-card.tsx         # 统计卡片
        └── listings-table.tsx     # 技能列表表格

lib/
├── x402/                          # 已存在
└── db/
    └── migrations/
        └── 002_add_listings_fields.sql  # 新增迁移
```

## 8. 数据模型

### 8.1 Creator (复用现有)

```typescript
interface Creator {
  id: string;
  address: string;           // 钱包地址
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  category: string;
  isVerified: boolean;
  totalEarnings: number;
  totalSales: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 8.2 Listing (扩展现有)

```typescript
interface Listing {
  id: string;
  creatorId: string;         // 统一使用 creatorId
  name: string;
  description: string;
  category: string;
  tags: string[];            // 新增
  priceUsd: number;
  version: string;
  packageUrl: string;
  installationCommand?: string;  // 新增
  isPublished: boolean;
  x402Enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 9. 关键流程

### 9.1 注册流程

1. 用户访问 `/seller/register`
2. 连接钱包（复用 `WalletConnect`）
3. 填写注册表单
4. 调用 `POST /api/v1/creators`
5. 成功后跳转到 `/seller/dashboard`

### 9.2 上架技能流程

1. 用户在 `/seller/dashboard` 点击 "New Listing"
2. 跳转到 `/seller/listings/new`
3. 填写技能信息表单
4. 调用 `POST /api/v1/creators/[id]/listings`
5. 成功后返回 dashboard

### 9.3 购买技能流程

1. 买家访问技能详情页
2. 调用 `GET /api/listings/[id]`
3. 如果未支付，返回 402 + x402 要求
4. 买家通过 x402 支付
5. 支付成功后获取技能安装命令

## 10. 验收标准

- [ ] 导航栏显示 "Sell Skills" 入口
- [ ] 注册页面正常工作（调用现有 creators API）
- [ ] 控制台显示统计数据和技能列表
- [ ] 技能上架表单正常工作
- [ ] x402 支付集成到技能获取接口
- [ ] 数据库迁移成功（添加 tags 字段）
- [ ] 新增组件测试 100% 覆盖
- [ ] 构建成功，无报错
- [ ] 不影响现有功能

## 11. 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 与现有 creators 数据冲突 | 高 | 复用现有 API，不新建表 |
| x402 集成复杂度 | 中 | 复用现有 lib/x402 模块 |
| 数据库迁移失败 | 低 | 使用 IF NOT EXISTS |

## 12. 附录

### 12.1 相关文件

- `app/api/v1/creators/route.ts` - 创作者 API
- `app/api/v1/creators/[id]/listings/route.ts` - 技能列表 API
- `lib/x402/index.ts` - x402 工具函数
- `lib/db/migrations/001_x402_tables.sql` - 现有数据库结构

### 12.2 外部文档

- x402 协议文档: https://docs.x402.org
- x402 Quickstart for Sellers: https://docs.x402.org/getting-started/quickstart-for-sellers
