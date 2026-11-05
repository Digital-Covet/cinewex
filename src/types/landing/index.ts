export interface PortfolioItem {
  readonly id: string;
  readonly title: string;
  readonly backgroundId: BackgroundId;
  readonly hoverColor: "cyan" | "purple";
  readonly imagePath: string;
  readonly backgroundColor: string;
}

export type BackgroundId = "bg-neon" | "bg-aura" | "bg-lumina" | "bg-orion";

export interface PortfolioBackgroundState {
  readonly "bg-neon": boolean;
  readonly "bg-aura": boolean;
  readonly "bg-lumina": boolean;
  readonly "bg-orion": boolean;
}

export interface WorkflowStep {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly prompt?: string;
  readonly tagline: string;
  readonly imagePath: string;
  readonly activeColor: "cyan" | "purple";
}

export interface OrbConfig {
  readonly width: string;
  readonly height: string;
  readonly color: string;
  readonly blur: string;
}

export interface NavigationLink {
  readonly label: string;
  readonly href: string;
  readonly isActive?: boolean;
}

export interface ClientBrand {
  readonly name: string;
  readonly id: string;
}

export interface TestimonialData {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly avatarPath: string;
}

export type ButtonVariant = "primary" | "secondary" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly ariaLabel?: string;
}

// NEW: ToolBrand interface for ToolsUsedSection
export interface ToolBrand {
  readonly id: string;
  readonly name: string;
  readonly imagePath: string;
}
