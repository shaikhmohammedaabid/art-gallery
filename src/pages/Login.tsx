import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { artworks } from "@/data/galleryData";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = useMemo(() => emailPattern.test(email.trim()), [email]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);

    toast.success("OTP sent to your inbox (demo mode).");
    navigate(`/login/otp?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <main className="gallery-shell grid min-h-[calc(100vh-5rem)] gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <Card className="border-gallery-line bg-card/90 backdrop-blur">
        <CardHeader className="space-y-4">
          <p className="editorial-kicker">Members Access</p>
          <CardTitle className="section-title text-4xl md:text-5xl">Login with Email OTP</CardTitle>
          <CardDescription className="max-w-xl text-base text-muted-foreground">
            Enter your email and we’ll send a one-time code to verify your session.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="collector@aureagallery.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending OTP…" : "Send OTP"}
            </Button>

            <p className="text-xs text-muted-foreground" aria-live="polite">
              This screen is UI-only right now. OTP delivery is simulated for preview.
            </p>
          </form>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-gallery-line pt-4">
            <Link to="/" className="line-button">Back to gallery</Link>
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Secure sign in</span>
          </div>
        </CardContent>
      </Card>

      <figure className="painting-frame signature-hover overflow-hidden">
        <LazyImage
          src={artworks[0].image}
          alt={artworks[0].alt}
          width={1024}
          height={1280}
          className="h-[70vh] min-h-[420px] w-full object-cover"
        />
      </figure>
    </main>
  );
};

export default Login;