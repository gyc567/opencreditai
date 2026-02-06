#!/bin/bash

# OpenClawSkills Marketplace 本地启动脚本
# 用法: ./start.sh [dev|build|serve] [port]

set -e

CMD=${1:-dev}
PORT=${2:-3000}

echo "=========================================="
echo "  OpenClawSkills Marketplace"
echo "=========================================="
echo ""

# 检查 Node.js
echo "✓ 检查环境..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js 未安装"
    exit 1
fi
echo "  Node.js: $(node -v)"

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 安装依赖..."
    npm install
fi

echo ""
echo "=========================================="

case $CMD in
    dev)
        echo "  启动开发服务器"
        echo "  地址: http://localhost:$PORT"
        echo "=========================================="
        echo ""
        npm run dev -- --port $PORT
        ;;
    build)
        echo "  构建生产版本"
        echo "=========================================="
        echo ""
        rm -rf dist .next
        NODE_ENV=production npm run build
        echo ""
        echo "✓ 构建完成，输出目录: dist/"
        ;;
    serve)
        if [ ! -d "dist" ]; then
            echo "  先执行构建..."
            rm -rf .next
            NODE_ENV=production npm run build
        fi
        echo "  启动静态服务器"
        echo "  地址: http://localhost:$PORT"
        echo "=========================================="
        echo ""
        npx serve dist -p $PORT -s
        ;;
    *)
        echo "  用法: ./start.sh [dev|build|serve] [port]"
        echo ""
        echo "  命令:"
        echo "    dev    - 启动开发服务器 (默认)"
        echo "    build  - 构建生产版本"
        echo "    serve  - 构建并启动静态服务器"
        echo ""
        echo "  示例:"
        echo "    ./start.sh dev 3000"
        echo "    ./start.sh build"
        echo "    ./start.sh serve 8080"
        exit 0
        ;;
esac
