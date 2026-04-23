#!/usr/bin/env python3
"""
Twitter Data Fetching Wrapper for Auto-X-Marketing Skill

Provides a unified interface to x-tweet-fetcher for AI agents.
Supports multiple backends with graceful fallbacks.

Usage:
    python3 twitter_fetcher.py --mode timeline --user elonmusk --limit 10
    python3 twitter_fetcher.py --mode search --query "AI agent"
    python3 twitter_fetcher.py --mode tweet --url "https://x.com/user/status/123"
    python3 twitter_fetcher.py --mode replies --url "https://x.com/user/status/123"
    python3 twitter_fetcher.py --mode mentions --user @username
    python3 twitter_fetcher.py --mode list --list_id 1455045069516357634
    python3 twitter_fetcher.py --mode article --url "https://x.com/user/article/123"
"""

import argparse
import json
import os
import sys
import subprocess
from pathlib import Path
from typing import Optional, Dict, Any

# Resolve the script directory
SCRIPT_DIR = Path(__file__).parent
FETCH_TWEET_SCRIPT = SCRIPT_DIR / "x-tweet-fetcher" / "scripts" / "fetch_tweet.py"
NITTER_CLIENT_SCRIPT = SCRIPT_DIR / "x-tweet-fetcher" / "scripts" / "nitter_client.py"


def run_fetch_tweet(args: list) -> Dict[str, Any]:
    """Run fetch_tweet.py and return parsed JSON output."""
    cmd = [sys.executable, str(FETCH_TWEET_SCRIPT)] + args
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        # Try to parse JSON output
        if result.stdout.strip():
            try:
                return json.loads(result.stdout)
            except json.JSONDecodeError:
                # If not JSON, return as text
                return {"success": True, "text": result.stdout, "raw": True}

        # Check for errors in stderr
        if result.returncode != 0:
            return {
                "success": False,
                "error": result.stderr,
                "exit_code": result.returncode,
            }

        return {"success": True, "output": result.stdout}

    except subprocess.TimeoutExpired:
        return {"success": False, "error": "Request timed out after 60 seconds"}
    except FileNotFoundError:
        return {"success": False, "error": f"Script not found: {FETCH_TWEET_SCRIPT}"}
    except Exception as e:
        return {"success": False, "error": str(e)}


def run_nitter_client(args: list) -> Dict[str, Any]:
    """Run nitter_client.py and return parsed JSON output."""
    cmd = [sys.executable, str(NITTER_CLIENT_SCRIPT)] + args
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        if result.stdout.strip():
            try:
                return json.loads(result.stdout)
            except json.JSONDecodeError:
                return {"success": True, "text": result.stdout, "raw": True}

        if result.returncode != 0:
            return {
                "success": False,
                "error": result.stderr,
                "exit_code": result.returncode,
            }

        return {"success": True, "output": result.stdout}

    except subprocess.TimeoutExpired:
        return {"success": False, "error": "Request timed out after 60 seconds"}
    except FileNotFoundError:
        return {"success": False, "error": f"Script not found: {NITTER_CLIENT_SCRIPT}"}
    except Exception as e:
        return {"success": False, "error": str(e)}


def mode_timeline(user: str, limit: int, backend: str) -> Dict[str, Any]:
    """Fetch user timeline tweets."""
    args = ["--user", user, "--limit", str(limit), "--backend", backend, "--json"]
    return run_fetch_tweet(args)


def mode_search(query: str, limit: int, backend: str) -> Dict[str, Any]:
    """Search tweets by keyword."""
    args = ["--search", query, "--limit", str(limit), "--backend", backend, "--json"]
    return run_nitter_client(args)


def mode_tweet(url: str, backend: str) -> Dict[str, Any]:
    """Fetch single tweet."""
    args = ["--url", url, "--backend", backend, "--json"]
    return run_fetch_tweet(args)


def mode_replies(url: str, limit: int, backend: str) -> Dict[str, Any]:
    """Fetch tweet replies."""
    args = [
        "--url",
        url,
        "--replies",
        "--limit",
        str(limit),
        "--backend",
        backend,
        "--json",
    ]
    return run_fetch_tweet(args)


def mode_mentions(user: str, backend: str) -> Dict[str, Any]:
    """Monitor user mentions."""
    args = ["--monitor", user, "--backend", backend, "--json"]
    return run_fetch_tweet(args)


def mode_list(list_id: str, limit: int, backend: str) -> Dict[str, Any]:
    """Fetch tweets from X List."""
    args = ["--list", list_id, "--limit", str(limit), "--backend", backend, "--json"]
    return run_fetch_tweet(args)


def mode_article(url: str, backend: str) -> Dict[str, Any]:
    """Fetch X Article (long-form content)."""
    args = ["--article", url, "--backend", backend, "--json"]
    return run_fetch_tweet(args)


def main():
    parser = argparse.ArgumentParser(
        description="Twitter Data Fetching Wrapper for Auto-X-Marketing",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --mode timeline --user elonmusk --limit 10
  %(prog)s --mode search --query "AI agent" --limit 20
  %(prog)s --mode tweet --url "https://x.com/elonmusk/status/123456789"
  %(prog)s --mode replies --url "https://x.com/elonmusk/status/123456789" --limit 50
  %(prog)s --mode mentions --user "@yourhandle"
  %(prog)s --mode list --list_id 1455045069516357634
  %(prog)s --mode article --url "https://x.com/user/article/123"
        """,
    )

    parser.add_argument(
        "--mode",
        required=True,
        choices=[
            "timeline",
            "search",
            "tweet",
            "replies",
            "mentions",
            "list",
            "article",
        ],
        help="Operation mode",
    )
    parser.add_argument("--user", help="Username (without @)")
    parser.add_argument("--url", help="Tweet or Article URL")
    parser.add_argument("--query", help="Search query")
    parser.add_argument("--list_id", help="X List ID or URL")
    parser.add_argument(
        "--limit", type=int, default=20, help="Max results (default: 20)"
    )
    parser.add_argument(
        "--backend",
        default="auto",
        choices=["auto", "nitter", "browser"],
        help="Backend to use (default: auto)",
    )

    args = parser.parse_args()

    # Route to appropriate handler
    handlers = {
        "timeline": lambda: mode_timeline(args.user, args.limit, args.backend),
        "search": lambda: mode_search(args.query, args.limit, args.backend),
        "tweet": lambda: mode_tweet(args.url, args.backend),
        "replies": lambda: mode_replies(args.url, args.limit, args.backend),
        "mentions": lambda: mode_mentions(args.user, args.backend),
        "list": lambda: mode_list(args.list_id, args.limit, args.backend),
        "article": lambda: mode_article(args.url, args.backend),
    }

    # Validate required args
    required_args = {
        "timeline": args.user,
        "search": args.query,
        "tweet": args.url,
        "replies": args.url,
        "mentions": args.user,
        "list": args.list_id,
        "article": args.url,
    }

    if not required_args.get(args.mode):
        parser.error(
            f"--mode {args.mode} requires: {', '.join([k for k, v in required_args.items() if v is None and k == args.mode])}"
        )

    result = handlers[args.mode]()

    # Output as JSON
    print(json.dumps(result, indent=2, ensure_ascii=False))
    sys.exit(0 if result.get("success", False) else 1)


if __name__ == "__main__":
    main()
