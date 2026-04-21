import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { artworks } from "@/data/galleryData";
import LazyImage from "@/components/LazyImage";
import FavouriteButton from "@/components/FavouriteButton";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { ExternalLink, TrendingUp, BarChart3 } from "lucide-react";
//  akefvv jkslwhfevjdj
const ArtworkDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const artwork = artworks.find((item) => item.id === id);
  const relatedArtworks = artworks.filter((item) => item.id !== id).slice(0, 3);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    collectorName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [shareDurationValue, setShareDurationValue] = useState(7);
  const [shareDurationUnit, setShareDurationUnit] = useState<"hours" | "days">("days");
  const [generatedShareLink, setGeneratedShareLink] = useState("");
  const [generatedShareExpiry, setGeneratedShareExpiry] = useState("");

  const sharedLinkStatus = useMemo(() => {
    if (!artwork) return null;

    const params = new URLSearchParams(location.search);
    const expiresAtRaw = params.get("expiresAt");
    if (!expiresAtRaw) return null;

    const expiresAt = Number(expiresAtRaw);
    if (Number.isNaN(expiresAt)) {
      return { isExpired: true, message: "This shared link is invalid." };
    }

    const expiresAtLabel = new Date(expiresAt).toLocaleString();
    if (Date.now() > expiresAt) {
      return { isExpired: true, message: `This shared link expired on ${expiresAtLabel}.` };
    }

    return { isExpired: false, message: `This shared link is valid until ${expiresAtLabel}.` };
  }, [artwork, location.search]);

  useEffect(() => {
    if (!artwork) return;

    setInquiryForm((prev) => ({
      ...prev,
      message:
        prev.message ||
        `Hello Aurea Gallery,\n\nI would like to inquire about \"${artwork.title}\" (${artwork.year}) by ${artwork.artist}.\n\nPlease share availability, pricing, and viewing details.`,
    }));
  }, [artwork]);

  const updateField = (field: keyof typeof inquiryForm, value: string) => {
    setInquiryForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInquiryOpen(false);
    toast({
      title: "Inquiry prepared",
      description: `Your inquiry for ${artwork?.title} is ready for review.`,
    });
  };

  const createShareLink = () => {
    if (!artwork) return;

    const safeDuration = Math.max(1, shareDurationValue);
    const durationMs = shareDurationUnit === "hours" ? safeDuration * 60 * 60 * 1000 : safeDuration * 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + durationMs;
    const shareId = Math.random().toString(36).slice(2, 10);
    const params = new URLSearchParams({
      shareId,
      expiresAt: String(expiresAt),
    });
    const shareUrl = `${window.location.origin}/artwork/${artwork.id}?${params.toString()}`;

    setGeneratedShareLink(shareUrl);
    setGeneratedShareExpiry(new Date(expiresAt).toLocaleString());
    toast({
      title: "Share link created",
      description: `This link is valid for ${safeDuration} ${shareDurationUnit}.`,
    });
  };

  const copyShareLink = async () => {
    if (!generatedShareLink) return;

    try {
      await navigator.clipboard.writeText(generatedShareLink);
      toast({
        title: "Link copied",
        description: "The share link is now in your clipboard.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
      });
    }
  };

  const shareMessage = generatedShareLink
    ? `Take a look at this artwork from Aurea Gallery: ${artwork?.title} by ${artwork?.artist}.\n${generatedShareLink}\n\nValid until: ${generatedShareExpiry}`
    : "";
  const emailShareHref = `mailto:?subject=${encodeURIComponent(`Aurea Gallery | ${artwork?.title ?? "Artwork"}`)}&body=${encodeURIComponent(shareMessage)}`;
  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  if (!artwork) {
    return (
      <main className="gallery-shell animate-fade-in py-20">
        <h1 className="section-title animate-scale-in">Artwork not found</h1>
        <p className="mt-4 animate-fade-in text-muted-foreground">The requested painting is unavailable.</p>
        <Link to="/" className="line-button mt-8">
          Back to collection
        </Link>
      </main>
    );
  }

  return (
    <main className="gallery-shell animate-fade-in py-12 md:py-16">
      <Link to="/" className="editorial-kicker story-link">
        ← Back to gallery
      </Link>

      <section className="mt-6 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <figure className="painting-frame hover-scale animate-scale-in relative overflow-hidden">
          <LazyImage
            src={artwork.image}
            alt={artwork.alt}
            width={1024}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <FavouriteButton artworkId={artwork.id} className="absolute right-6 top-6 z-10 h-12 w-12" />
        </figure>

        <aside className="animate-enter space-y-8 border border-gallery-line bg-card p-6 md:p-8">
          <div className="animate-fade-in">
            <p className="editorial-kicker">Artwork Detail</p>
            <h1 className="mt-2 text-4xl md:text-5xl">{artwork.title}</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">{artwork.artist}</p>
          </div>

          <dl className="animate-fade-in space-y-4 border-y border-gallery-line py-6 text-sm">
            <div className="flex items-center justify-between gap-6">
              <dt className="text-muted-foreground">Title</dt>
              <dd>{artwork.title}</dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="text-muted-foreground">Artist</dt>
              <dd>{artwork.artist}</dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="text-muted-foreground">Medium</dt>
              <dd>{artwork.medium}</dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="text-muted-foreground">Dimensions</dt>
              <dd>{artwork.dimensions}</dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="text-muted-foreground">Year</dt>
              <dd>{artwork.year}</dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="text-muted-foreground">Availability</dt>
              <dd>{artwork.availability}</dd>
            </div>
            <div className="space-y-2 border-t border-gallery-line pt-4">
              <dt className="text-muted-foreground">Provenance</dt>
              <dd className="leading-relaxed">{artwork.provenance}</dd>
            </div>
          </dl>

          <button type="button" onClick={() => setIsInquiryOpen(true)} className="line-button w-full justify-center">
            Inquire about this work
          </button>

          <button type="button" onClick={() => setIsShareDialogOpen(true)} className="line-button w-full justify-center">
            Share
          </button>

          {sharedLinkStatus ? (
            <p className="border-t border-gallery-line pt-6 text-sm text-muted-foreground" role="status" aria-live="polite">
              {sharedLinkStatus.message}
            </p>
          ) : null}

          {artwork.marketContext && artwork.marketContext.length > 0 && (
            <div className="animate-fade-in space-y-4 border-t border-gallery-line pt-8">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Market Context</h3>
              </div>
              <div className="space-y-3">
                {artwork.marketContext.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-gallery-line bg-background/50 p-3 transition-colors hover:bg-background"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{link.source}</span>
                      <span className="text-[10px] text-muted-foreground line-clamp-1">{link.title}</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      <section className="mt-16 grid gap-10 border-t border-gallery-line pt-16 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl md:text-3xl">Estimated Valuation History</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            A historical overview of market appraisals and estimated fair market value for this work over time.
          </p>
          <div className="h-[280px] w-full border border-gallery-line bg-card p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={artwork.valuationHistory} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(val) => new Date(val).getFullYear().toString()}
                />
                <YAxis
                  hide
                  domain={['dataMin - 5000', 'dataMax + 5000']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Estimated Value"]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl">Collector Notes</h2>
          <div className="prose prose-sm text-muted-foreground max-w-none">
            <p>
              This work represent a significant period in {artwork.artist}'s career. The valuation reflects the increasing scarcity of major works from this series and strong secondary market performance in recent key auctions.
            </p>
            <p>
              The provenance is impeccable, traceably linked back to the artist's primary representation. Significant interest from institutional collections suggests potential for future inclusion in mid-career survey exhibitions.
            </p>
            <ul className="text-[11px] uppercase tracking-wider space-y-2 list-none p-0 mt-8">
              <li className="flex justify-between border-b border-gallery-line pb-2">
                <span>Rarity Score</span>
                <span className="text-foreground font-semibold">High / Museum Grade</span>
              </li>
              <li className="flex justify-between border-b border-gallery-line pb-2">
                <span>Market Trend</span>
                <span className="text-foreground font-semibold text-green-600">↑ Trending Up</span>
              </li>
              <li className="flex justify-between border-b border-gallery-line pb-2">
                <span>Investment Grade</span>
                <span className="text-foreground font-semibold">AAA</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquire about this work</DialogTitle>
            <DialogDescription>
              The form is prefilled with the selected artwork details so your request is specific and accurate.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <div className="grid gap-3 border border-gallery-line bg-card p-4 text-sm md:grid-cols-2">
              <p>
                <span className="text-muted-foreground">Artist:</span> {artwork.artist}
              </p>
              <p>
                <span className="text-muted-foreground">Title:</span> {artwork.title}
              </p>
              <p>
                <span className="text-muted-foreground">Year:</span> {artwork.year}
              </p>
              <p>
                <span className="text-muted-foreground">Medium:</span> {artwork.medium}
              </p>
              <p>
                <span className="text-muted-foreground">Dimensions:</span> {artwork.dimensions}
              </p>
              <p className="md:col-span-2">
                <span className="text-muted-foreground">Provenance:</span> {artwork.provenance}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="collectorName">Your Name</Label>
                <Input
                  id="collectorName"
                  value={inquiryForm.collectorName}
                  onChange={(event) => updateField("collectorName", event.target.value)}
                  placeholder="Collector name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collectorEmail">Email</Label>
                <Input
                  id="collectorEmail"
                  type="email"
                  value={inquiryForm.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectorPhone">Phone (optional)</Label>
              <Input
                id="collectorPhone"
                value={inquiryForm.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+1 212 000 0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectorMessage">Inquiry Message</Label>
              <Textarea
                id="collectorMessage"
                value={inquiryForm.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="min-h-36"
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="line-button">
                Submit inquiry
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Time-Limited Share Link</DialogTitle>
            <DialogDescription>
              Generate a custom share link for email and WhatsApp with a chosen expiry window.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Duration
                <Input
                  type="number"
                  min={1}
                  value={shareDurationValue}
                  onChange={(event) => setShareDurationValue(Number(event.target.value) || 1)}
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Unit
                <select
                  value={shareDurationUnit}
                  onChange={(event) => setShareDurationUnit(event.target.value as "hours" | "days")}
                  className="h-10 w-full border border-gallery-line bg-background px-3 text-sm focus:ring-2 focus:ring-ring"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </label>
              <button type="button" onClick={createShareLink} className="line-button self-end">
                Generate
              </button>
            </div>

            {generatedShareLink ? (
              <div className="space-y-3 border border-gallery-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Expires: {generatedShareExpiry}</p>
                <Input value={generatedShareLink} readOnly />
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={copyShareLink} className="line-button">
                    Copy link
                  </button>
                  <a href={emailShareHref} className="line-button">
                    Share via Email
                  </a>
                  <a href={whatsappShareHref} target="_blank" rel="noreferrer" className="line-button">
                    Share via WhatsApp
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <section className="mt-14 animate-fade-in">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl">Related Works</h2>
          <Link to="/" className="story-link editorial-kicker">
            View full collection
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArtworks.map((item) => (
            <article key={item.id} className="group space-y-3">
              <div className="painting-frame relative block overflow-hidden">
                <Link to={`/artwork/${item.id}`}>
                  <LazyImage
                    src={item.image}
                    alt={item.alt}
                    width={700}
                    height={840}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <FavouriteButton artworkId={item.id} className="absolute right-4 top-4 z-10" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{item.artist}</p>
                <Link to={`/artwork/${item.id}`} className="story-link mt-1 inline-flex text-lg">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.year} · {item.medium}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ArtworkDetail;