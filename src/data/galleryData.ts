import heroPainting from "@/assets/painting-1.jpg";
import paintingTwo from "@/assets/painting-2.jpg";
import paintingThree from "@/assets/painting-3.jpg";
import paintingFour from "@/assets/painting-4.jpg";

export type ValuationPoint = {
  date: string;
  value: number;
};

export type MarketLink = {
  title: string;
  url: string;
  source: string;
};

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  medium: string;
  dimensions: string;
  provenance: string;
  year: number;
  availability: "Available" | "Reserved" | "Sold";
  image: string;
  alt: string;
  collectionId: string;
  valuationHistory: ValuationPoint[];
  marketContext: MarketLink[];
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
};

export type ExhibitionEvent = {
  id: string;
  date: string;
  title: string;
  location: string;
  phase: "Current" | "Upcoming";
  summary: string;
  mapEmbedUrl: string;
  speakers: Array<{
    name: string;
    role: string;
  }>;
  program: Array<{
    time: string;
    title: string;
    description: string;
  }>;
};

export const collections: Collection[] = [
  {
    id: "contemporary-figuration",
    name: "Contemporary Figuration",
    description: "A selection of works exploring the human form in the 21st century.",
    coverImage: heroPainting,
  },
  {
    id: "abstract-gestures",
    name: "Abstract Gestures",
    description: "Works focused on the physicality of paint and non-representational forms.",
    coverImage: paintingThree,
  },
  {
    id: "editorial-spotlight",
    name: "Editorial Spotlight",
    description: "Curated selections from our weekly feature program.",
    coverImage: paintingTwo,
  },
];

const baseArtworks: Artwork[] = [
  {
    id: "nocturne-figure-2026",
    title: "Nocturne Figure",
    artist: "Cinga Samson",
    medium: "Oil on canvas",
    dimensions: "190 x 160 cm",
    provenance: "Acquired directly from the artist's studio, Johannesburg (2026)",
    year: 2026,
    availability: "Available",
    image: heroPainting,
    alt: "Portrait painting in earthy tones with dramatic gallery lighting",
    collectionId: "contemporary-figuration",
    valuationHistory: [
      { date: "2024-01-10", value: 45000 },
      { date: "2025-01-15", value: 58000 },
      { date: "2026-01-20", value: 72000 },
    ],
    marketContext: [
      { title: "Artnet: Rising Market of Cinga Samson", url: "https://artnet.com", source: "Artnet" },
      { title: "Sotheby's: Recent Auction Results", url: "https://sothebys.com", source: "Sotheby's" },
    ],
  },
  {
    id: "crimson-echo-2025",
    title: "Crimson Echo",
    artist: "Mara K. Adebayo",
    medium: "Oil and pigment on linen",
    dimensions: "170 x 140 cm",
    provenance: "Private collection, Lagos; consigned through Aurea Gallery",
    year: 2025,
    availability: "Reserved",
    image: paintingTwo,
    alt: "Expressionist portrait painting in deep red and indigo palette",
    collectionId: "contemporary-figuration",
    valuationHistory: [
      { date: "2023-01-10", value: 32000 },
      { date: "2024-01-15", value: 41000 },
      { date: "2025-01-20", value: 55000 },
    ],
    marketContext: [
      { title: "Christie's: African Contemporary Art Preview", url: "https://christies.com", source: "Christie's" },
    ],
  },
  {
    id: "fault-line-composition-2024",
    title: "Fault Line Composition",
    artist: "Elias Morrow",
    medium: "Mixed media on canvas",
    dimensions: "150 x 150 cm",
    provenance: "Exhibited in Fault Lines, Berlin (2024); estate release",
    year: 2024,
    availability: "Sold",
    image: paintingThree,
    alt: "Abstract painting with ochre black ivory and crimson gestures",
    collectionId: "abstract-gestures",
    valuationHistory: [
      { date: "2022-01-10", value: 28000 },
      { date: "2023-01-15", value: 35000 },
      { date: "2024-01-20", value: 48000 },
    ],
    marketContext: [
      { title: "Artforum Review: Elias Morrow", url: "https://artforum.com", source: "Artforum" },
    ],
  },
  {
    id: "silent-interval-2025",
    title: "Silent Interval",
    artist: "Helene Strauss",
    medium: "Oil on wood panel",
    dimensions: "120 x 90 cm",
    provenance: "From the artist archive, Vienna; first market appearance",
    year: 2025,
    availability: "Available",
    image: paintingFour,
    alt: "Contemporary classical portrait on dark background",
    collectionId: "editorial-spotlight",
    valuationHistory: [
      { date: "2024-06-10", value: 18000 },
      { date: "2025-01-20", value: 24000 },
    ],
    marketContext: [],
  },
];

const dummyArtists = [
  "Iris Vale",
  "Theo Maren",
  "Nadia Sol",
  "Julian Crest",
  "Amina Rowe",
  "Luca Arden",
  "Sora Elan",
  "Mila Corvin",
  "Noah Quill",
  "Elise Mora",
];

const dummyMediums = [
  "Oil on canvas",
  "Acrylic on linen",
  "Mixed media on canvas",
  "Oil and charcoal on board",
  "Pigment on paper mounted on panel",
  "Tempera on wood",
];

const dummyDimensions = [
  "90 x 70 cm",
  "110 x 90 cm",
  "120 x 100 cm",
  "140 x 110 cm",
  "160 x 130 cm",
  "180 x 150 cm",
];

const dummyTitles = [
  "Evening Current",
  "Blue Relay",
  "Quiet Monument",
  "Velvet Geometry",
  "Amber Passage",
  "Distant Choir",
  "Paper Horizon",
  "Second Bloom",
  "Open Silence",
  "Shadow Almanac",
  "Northern Room",
  "Glass Orchard",
];

const dummyProvenance = [
  "Consigned from a private New York collection",
  "Acquired directly from the artist studio archive",
  "Released from a European estate collection",
  "Exhibited in a regional survey before consignment",
  "First market appearance via Aurea Gallery",
  "From a corporate collection deaccession program",
];

const dummyAvailabilities: Artwork["availability"][] = ["Available", "Reserved", "Sold"];
const artworkImages = [heroPainting, paintingTwo, paintingThree, paintingFour];

const generatedDummyArtworks: Artwork[] = Array.from({ length: 96 }, (_, index) => {
  const sequence = index + 1;
  const year = 2019 + (sequence % 8);
  const baseValue = 10000 + (index * 500);

  return {
    id: `dummy-painting-${sequence.toString().padStart(3, "0")}`,
    title: `${dummyTitles[index % dummyTitles.length]} ${sequence}`,
    artist: dummyArtists[index % dummyArtists.length],
    medium: dummyMediums[index % dummyMediums.length],
    dimensions: dummyDimensions[index % dummyDimensions.length],
    provenance: `${dummyProvenance[index % dummyProvenance.length]} (${year})`,
    year,
    availability: dummyAvailabilities[index % dummyAvailabilities.length],
    image: artworkImages[index % artworkImages.length],
    alt: `Dummy painting ${sequence} in contemporary gallery style`,
    collectionId: index % 2 === 0 ? "contemporary-figuration" : "abstract-gestures",
    valuationHistory: [
      { date: `${year}-01-01`, value: baseValue },
      { date: `${year + 1}-01-01`, value: baseValue * 1.15 },
      { date: `${year + 2}-01-01`, value: baseValue * 1.3 },
    ],
    marketContext: [
      { title: "See Auction Results on Sotheby's", url: "https://sothebys.com", source: "Sotheby's" },
    ],
  };
});

export const artworks: Artwork[] = [...baseArtworks, ...generatedDummyArtworks];

export const exhibitionEvents: ExhibitionEvent[] = [
  {
    id: "cinga-opening",
    date: "2026-01-16",
    title: "Opening Night — Cinga Samson: New York 2026",
    location: "Aurea Gallery, New York",
    phase: "Current",
    summary: "Private view and curator introduction with limited RSVP seating.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=545%20W%2022nd%20St%2C%20New%20York%2C%20NY&output=embed",
    speakers: [
      { name: "Leila Hargrove", role: "Curator" },
      { name: "Cinga Samson", role: "Featured Artist" },
      { name: "Milo Aster", role: "Collector Programs Lead" },
    ],
    program: [
      {
        time: "18:00",
        title: "Doors Open & Welcome Reception",
        description: "Arrival, private viewing access, and first look at the full hanging.",
      },
      {
        time: "19:00",
        title: "Curator Introduction",
        description: "Curatorial framing of themes, influences, and collection highlights.",
      },
      {
        time: "19:30",
        title: "Artist Conversation",
        description: "Dialogue with the artist followed by audience Q&A.",
      },
    ],
  },
  {
    id: "collector-breakfast",
    date: "2026-02-07",
    title: "Collectors Breakfast & Studio Dialogue",
    location: "Aurea Gallery, New York",
    phase: "Current",
    summary: "Morning program focused on acquisition context and artist process.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=545%20W%2022nd%20St%2C%20New%20York%2C%20NY&output=embed",
    speakers: [
      { name: "Nora Welles", role: "Director" },
      { name: "Julien Park", role: "Art Advisor" },
      { name: "Kia Mensah", role: "Collections Specialist" },
    ],
    program: [
      {
        time: "09:00",
        title: "Breakfast & Early Access",
        description: "Coffee service with an intimate walkthrough before public hours.",
      },
      {
        time: "09:45",
        title: "Acquisition Context Session",
        description: "Market context, provenance, and portfolio placement conversation.",
      },
      {
        time: "10:30",
        title: "Studio Process Dialogue",
        description: "Discussion on methods, materials, and conservation considerations.",
      },
    ],
  },
  {
    id: "spring-preview",
    date: "2026-04-18",
    title: "Spring Preview — New Voices in Figuration",
    location: "Aurea Gallery, Paris",
    phase: "Upcoming",
    summary: "Preview event introducing six emerging painters before public opening.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Marais%2C%20Paris%2C%20France&output=embed",
    speakers: [
      { name: "Amelie Rousseau", role: "Guest Curator" },
      { name: "Rene Duval", role: "Critic" },
      { name: "Ines Barlow", role: "Program Moderator" },
    ],
    program: [
      {
        time: "17:30",
        title: "Preview Registration",
        description: "Guest check-in with collector packet and exhibition guide.",
      },
      {
        time: "18:15",
        title: "New Voices Introduction",
        description: "Curator-led overview of the featured painters and themes.",
      },
      {
        time: "19:00",
        title: "Panel & Toast",
        description: "Roundtable with invited voices and closing champagne toast.",
      },
    ],
  },
  {
    id: "london-opening",
    date: "2026-06-03",
    title: "Opening — Material Light",
    location: "Aurea Gallery, London",
    phase: "Upcoming",
    summary: "Summer exhibition launch with evening talks and curator walk-through.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Mayfair%2C%20London%2C%20UK&output=embed",
    speakers: [
      { name: "Tobias Reed", role: "Curator" },
      { name: "Hana Idris", role: "Light & Materials Researcher" },
      { name: "Eva Clark", role: "Collector Relations" },
    ],
    program: [
      {
        time: "18:30",
        title: "Opening Reception",
        description: "Welcome drinks and first viewing of Material Light.",
      },
      {
        time: "19:15",
        title: "Curator Walk-through",
        description: "Guided sequence through key works and spatial rhythm.",
      },
      {
        time: "20:00",
        title: "Evening Talk",
        description: "Short talk on technique, materiality, and archival practice.",
      },
    ],
  },
];