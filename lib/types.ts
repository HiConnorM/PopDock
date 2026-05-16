// ─────────────────────────────────────────────
// Popdock — Core Type System
// ─────────────────────────────────────────────

// ── Enums ─────────────────────────────────────

export type PopupType =
  | "vintage-clothing" | "artist-alley" | "coffee-cart" | "candles-scent"
  | "food-popup" | "farmers-market" | "jewelry" | "streetwear"
  | "zines-books" | "craft-fair" | "tattoo-flash" | "beauty-popup"
  | "photography" | "handmade" | "stickers-pins";

export type AestheticType =
  | "clean-minimal" | "vintage-market" | "bold-editorial" | "earthy-handmade"
  | "premium-boutique" | "streetwear" | "cozy-warm" | "bright-playful"
  | "nostalgic" | "luxury-handmade";

export type BudgetRange = "under-100" | "100-300" | "300-600" | "600-plus";

export type ExperienceLevel = "first-time" | "some-experience" | "regular" | "full-time";

export type ProjectStatus = "planning" | "in-progress" | "ready" | "completed";

export type SectionStatus = "todo" | "in-progress" | "complete";

export type MaterialType =
  | "booth-sign" | "price-card" | "qr-sign" | "setup-checklist"
  | "shopping-list" | "instagram-post" | "instagram-story" | "thank-you-card"
  | "launch-flyer" | "table-tent" | "product-label" | "menu-board"
  | "launch-guide-pdf" | "vendor-sheet" | "packing-checklist";

export type ExportFormat = "pdf" | "png" | "jpg" | "svg" | "csv" | "notion";

// ── Brand System ──────────────────────────────

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export interface TypographyDirection {
  heading: string;       // e.g. "Bold serif", "Condensed grotesk"
  body: string;          // e.g. "Clean sans-serif"
  accent: string;        // e.g. "Handwritten"
  weightStyle: string;   // e.g. "Heavy contrast weights"
}

export interface BrandProfile {
  id: string;
  projectId: string;
  userId: string;

  // Identity
  businessName: string;
  tagline?: string;
  websiteUrl?: string;
  instagramHandle?: string;

  // Products
  productDescription: string;
  productCategories: string[];
  priceRangeMin: number;
  priceRangeMax: number;

  // Audience
  targetCustomer: string;
  ageRange?: string;
  customerMotivation?: string;

  // Visual
  aesthetics: AestheticType[];
  vibeWords: string[];
  colorPalette: ColorPalette;
  typography: TypographyDirection;
  logoUrl?: string;
  productPhotoUrls: string[];
  referenceUrls: string[];

  // AI-extracted
  brandPersonality?: string;
  toneOfVoice?: string;
  visualStyle?: string;
  brandSummary?: string;
  materialStyle?: string;

  createdAt: string;
  updatedAt: string;
}

// ── Popup Project ─────────────────────────────

export interface PopupProject {
  id: string;
  userId: string;
  brandProfileId?: string;

  // Basic info
  title: string;
  popupTypes: PopupType[];
  status: ProjectStatus;
  completionPct: number;

  // Event details
  city: string;
  venue?: string;
  eventTypes: string[];
  eventDate?: string;
  indoorOutdoor: "indoor" | "outdoor" | "both";
  boothSize: string;

  // Setup
  budget: BudgetRange;
  experience: ExperienceLevel;
  inventoryCount?: number;
  amenities: string[];

  // Config
  aesthetics: AestheticType[];
  kitSections: string[];

  createdAt: string;
  updatedAt: string;
}

// ── Kit Section ───────────────────────────────

export interface KitSection {
  id: string;
  projectId: string;
  sectionType: string;
  status: SectionStatus;
  title: string;
  subtitle: string;
  content: Record<string, unknown>;  // flexible JSON content
  generatedAt?: string;
  updatedAt: string;
}

// ── Strategy ──────────────────────────────────

export interface PopupStrategy {
  concept: string;
  audience: string;
  boothHook: string;
  customerExperience: string;
  productFocus: string;
  salesAngle: string;
  brandVoice: string[];
  toneDescription: string;
  positioning: string;
}

// ── Booth Design ──────────────────────────────

export interface BoothLayout {
  id: string;
  projectId: string;
  layoutType: "l-shape" | "linear" | "island" | "corner" | "custom";
  boothSize: string;
  tableCount: number;
  hasGridWall: boolean;
  hasRack: boolean;
  hasTent: boolean;
  focalPoints: string[];
  checkoutPlacement: string;
  displayZones: DisplayZone[];
  customerFlowNotes: string;
  lightingNotes: string;
  photoMomentDescription?: string;
}

export interface DisplayZone {
  zone: string;
  purpose: string;
  items: string[];
  priority: "hero" | "secondary" | "impulse";
}

// ── Materials ─────────────────────────────────

export interface Material {
  id: string;
  projectId: string;
  templateId?: string;
  materialType: MaterialType;
  title: string;
  status: "pending" | "generating" | "ready" | "error";

  // Design data
  contentJson: MaterialContent;
  designJson: MaterialDesign;

  // Exports
  previewUrl?: string;
  exportUrls: Record<ExportFormat, string>;

  // Meta
  dimensions: string;
  format: ExportFormat[];
  generatedAt?: string;
  updatedAt: string;
}

export interface MaterialContent {
  headline?: string;
  subheadline?: string;
  bodyText?: string;
  items?: { label: string; value: string; note?: string }[];
  callToAction?: string;
  qrTarget?: string;
  socialHandle?: string;
  customFields?: Record<string, string>;
}

export interface MaterialDesign {
  palette: ColorPalette;
  typography: TypographyDirection;
  style: AestheticType;
  layout: string;      // e.g. "centered", "left-aligned", "grid"
  texture?: string;    // e.g. "kraft-paper", "linen", "clean"
  border?: string;     // e.g. "none", "thin-rule", "thick-frame"
  iconSet?: string;
}

export interface MaterialTemplate {
  id: string;
  category: string;
  materialType: MaterialType;
  name: string;
  description: string;
  previewUrl: string;
  styleTags: string[];
  dimensions: string;
  formats: ExportFormat[];
  editableFields: string[];
  designSchema: Partial<MaterialDesign>;
  popular: boolean;
}

// ── Checklist ─────────────────────────────────

export interface ChecklistItem {
  id: string;
  projectId: string;
  category: "night-before" | "morning-of" | "setup" | "during-event" | "post-event";
  task: string;
  notes?: string;
  urgent: boolean;
  dueOffset?: string;   // e.g. "-1 day", "-3 hours"
  completed: boolean;
  order: number;
}

// ── Shopping List ─────────────────────────────

export interface ShoppingItem {
  id: string;
  projectId: string;
  category: string;
  name: string;
  quantity: number;
  unit?: string;
  estimatedCost: number;
  priority: "essential" | "recommended" | "optional";
  notes?: string;
  purchased: boolean;
  purchasedAt?: string;
}

// ── Timeline ──────────────────────────────────

export interface TimelineTask {
  id: string;
  projectId: string;
  week: string;         // e.g. "4-weeks-out", "2-weeks-out", "night-before"
  task: string;
  category: string;
  notes?: string;
  completed: boolean;
  dueDate?: string;
}

// ── Inventory ─────────────────────────────────

export interface InventoryItem {
  id: string;
  projectId: string;
  category: string;
  name: string;
  sku?: string;
  quantity: number;
  targetQuantity: number;
  priceTier: "impulse" | "core" | "premium" | "hero";
  priceSuggested: number;
  displayZone?: string;
  notes?: string;
}

// ── Pricing ───────────────────────────────────

export interface PricingTier {
  tier: "impulse" | "core" | "premium" | "hero";
  label: string;
  priceMin: number;
  priceMax: number;
  examples: string[];
  targetPct: number;   // % of inventory in this tier
}

export interface PricingStrategy {
  projectId: string;
  tiers: PricingTier[];
  bundleIdeas: string[];
  averageTransactionGoal: number;
  impulseItemPlacement: string;
  insight: string;
}

// ── Exports ───────────────────────────────────

export interface ExportJob {
  id: string;
  projectId: string;
  type: "full-kit" | "checklist" | "shopping-list" | "materials-pack" | "signage-pack";
  format: ExportFormat;
  status: "pending" | "processing" | "ready" | "failed";
  url?: string;
  createdAt: string;
}

// ── AI Generation ────────────────────────────

export interface GenerationRequest {
  projectId: string;
  sectionType: string;
  prompt?: string;
  brandProfile: Partial<BrandProfile>;
  context: Partial<PopupProject>;
  regenerate?: boolean;
}

export interface GenerationResult {
  success: boolean;
  sectionType: string;
  data: Record<string, unknown>;
  tokensUsed?: number;
  model?: string;
  error?: string;
}

// ── User / Auth ───────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  plan: "free" | "creator" | "studio";
  projectCount: number;
  generationCount: number;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  plan: "creator" | "studio";
  status: "active" | "trialing" | "canceled" | "past_due";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// ── Form State (onboarding) ───────────────────

export interface OnboardingFormData {
  // Step 1
  popupTypes: PopupType[];
  // Step 2
  brandName: string;
  productDescription: string;
  targetCustomer: string;
  brandVibes: string[];
  instagram: string;
  website: string;
  // Step 3
  city: string;
  eventTypes: string[];
  indoorOutdoor: string;
  boothSize: string;
  eventDate: string;
  amenities: string[];
  // Step 4
  budget: BudgetRange | "";
  inventoryCount: string;
  experience: ExperienceLevel | "";
  // Step 5
  aesthetics: AestheticType[];
  // Step 6
  kitSections: string[];
}
