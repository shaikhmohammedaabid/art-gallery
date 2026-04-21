import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/sonner";
import { artworks } from "@/data/galleryData";

const OTP_LENGTH = 6;

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const email = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("email") ?? "collector@aureagallery.com";
  }, [location.search]);

  const isCodeComplete = code.length === OTP_LENGTH;

  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isCodeComplete) {
      toast.error("Enter the 6-digit OTP code.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);

    toast.success("OTP verified (demo mode).");
    navigate("/");
  };

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsResending(false);
    toast.success("A new OTP has been sent (demo mode).");
  };

  return (
    <main className="gallery-shell grid min-h-[calc(100vh-5rem)] gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <Card className="border-gallery-line bg-card/90 backdrop-blur">
        <CardHeader className="space-y-4">
          <p className="editorial-kicker">Verification</p>
          <CardTitle className="section-title text-4xl md:text-5xl">Enter OTP code</CardTitle>
          <CardDescription className="max-w-xl text-base text-muted-foreground">
            We sent a one-time code to <span className="font-medium text-foreground">{email}</span>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Use the 6-digit code from your inbox.</p>
              <InputOTP maxLength={OTP_LENGTH} value={code} onChange={setCode} containerClassName="justify-start">
                <InputOTPGroup>
                  {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !isCodeComplete}>
              {isSubmitting ? "Verifying…" : "Verify OTP"}
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="story-link text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResending ? "Resending…" : "Resend code"}
              </button>
              <Link to="/login" className="line-button">Change email</Link>
            </div>

            <p className="text-xs text-muted-foreground" aria-live="polite">
              This OTP verification is simulated for UI preview.
            </p>
          </form>
        </CardContent>
      </Card>

      <figure className="painting-frame signature-hover overflow-hidden">
        <LazyImage
          src={artworks[2].image}
          alt={artworks[2].alt}
          width={1024}
          height={1280}
          className="h-[70vh] min-h-[420px] w-full object-cover"
        />
      </figure>
    </main>
  );
};

export default OtpVerify;