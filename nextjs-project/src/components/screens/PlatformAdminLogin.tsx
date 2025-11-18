import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Icons } from "../icons";
import { motion } from "motion/react";

interface PlatformAdminLoginProps {
  onLogin: () => void;
}

export function PlatformAdminLogin({ onLogin }: PlatformAdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-900 to-primary-900 flex items-center justify-center p-8">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary-700 to-primary-900 p-10 text-center">
            <div className="w-16 h-16 bg-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icons.gift className="w-9 h-9 text-primary-900" />
            </div>
            <h2 className="text-white">Platform Admin</h2>
            <p className="text-white/70 mt-2">Sign in to manage the platform</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            <div className="space-y-2">
              <Label className="text-text-primary">Email Address</Label>
              <Input
                type="email"
                placeholder="admin@platform.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-border-light focus:border-primary-700 focus:ring-primary-700"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-text-primary">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-border-light focus:border-primary-700 focus:ring-primary-700"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary-700 hover:bg-primary-900 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Sign In
            </Button>

            <div className="text-center">
              <a href="#" className="text-primary-700 hover:text-primary-900 transition-colors">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}