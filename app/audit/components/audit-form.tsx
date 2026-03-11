"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface AuditFormProps {
  onSubmit: (email: string, file: File) => Promise<void>;
  isLoading?: boolean;
}

export function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (emailValue: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  const validateAndSetFile = useCallback((selectedFile: File) => {
    setError(null);

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size exceeds 50MB limit");
      return;
    }

    const allowedExtensions = [".zip", ".js", ".ts", ".json", ".md"];
    const fileName = selectedFile.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!hasAllowedExtension) {
      setError("Invalid file type. Allowed: .zip, .js, .ts, .json, .md");
      return;
    }

    setFile(selectedFile);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, [validateAndSetFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    await onSubmit(email, file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="audit-email"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Email Address
        </label>
        <Input
          id="audit-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Skill File
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
            ${dragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}
          `}
          onClick={() => document.getElementById("audit-file")?.click()}
        >
          <input
            id="audit-file"
            type="file"
            accept=".zip,.js,.ts,.json,.md"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          {file ? (
            <div>
              <p className="text-sm text-foreground font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <Button type="button" variant="outline" size="sm">
                Select File
              </Button>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Accepted formats: .zip, .js, .ts, .json, .md up to 50MB
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading || !email || !file}
      >
        {isLoading ? "Processing..." : "Continue to Payment — $10"}
      </Button>
    </form>
  );
}
