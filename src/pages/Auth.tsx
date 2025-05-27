
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/data-visualization-agent');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        navigate('/data-visualization-agent');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-charcoal min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link to="/#projects" className="inline-flex items-center text-electric hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
        
        <div className="max-w-md mx-auto">
          <Card className="bg-secondary border-none">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-electric/20 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-electric" />
              </div>
              <CardTitle className="text-2xl text-white">
                {isLogin ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                {isLogin ? 'Welcome back to the Data Visualization AI Agent' : 'Join the Data Visualization AI Agent'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-electric text-charcoal hover:bg-white"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
              
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-electric hover:text-white"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
