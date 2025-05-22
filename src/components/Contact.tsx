
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AnimatedSection from './AnimatedSection';
import { AtSign, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <AnimatedSection id="contact" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Contact Me</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          Have a project in mind or want to discuss a data science opportunity? Get in touch!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="bg-secondary rounded-lg p-6 animate-fade-in-up">
            <h3 className="text-xl font-semibold mb-4 text-white">Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-charcoal border-muted"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-charcoal border-muted"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    className="min-h-32 bg-charcoal border-muted"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-electric text-charcoal hover:bg-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-semibold mb-4 text-white">Let's Connect</h3>
            <p className="text-muted-foreground mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="bg-secondary p-6 rounded-lg mb-6">
              <h4 className="text-lg font-medium mb-2 text-white">Contact Information</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center">
                  <AtSign className="mr-2 h-5 w-5 text-electric" />
                  <span>Justin.d.taylor2@gmail.com</span>
                </div>
                <p className="pt-2">
                  Based in Chicago, IL
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              Prefer to connect on social media? Check out my profiles linked in the footer below.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
