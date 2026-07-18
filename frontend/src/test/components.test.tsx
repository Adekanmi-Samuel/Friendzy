import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SafeSpaceBadge from '../components/SafeSpaceBadge';
import ConnectionRing from '../components/ConnectionRing';
import MoodIndicator from '../components/MoodIndicator';

describe('SafeSpaceBadge', () => {
  it('renders with default size', () => {
    render(<SafeSpaceBadge />);
    expect(screen.getByText('Safe Space')).toBeInTheDocument();
  });

  it('renders with lg size', () => {
    render(<SafeSpaceBadge size="lg" />);
    expect(screen.getByText('Safe Space')).toBeInTheDocument();
  });
});

describe('ConnectionRing', () => {
  it('renders score percentage', () => {
    render(<ConnectionRing score={85} />);
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<ConnectionRing score={85} showLabel={false} />);
    expect(screen.queryByText('85%')).not.toBeInTheDocument();
  });
});

describe('MoodIndicator', () => {
  it('renders all mood options', () => {
    render(<MoodIndicator />);
    expect(screen.getByText('\u{1F60A}')).toBeInTheDocument();
    expect(screen.getByText('\u{1F642}')).toBeInTheDocument();
    expect(screen.getByText('\u{1F610}')).toBeInTheDocument();
    expect(screen.getByText('\u{1F614}')).toBeInTheDocument();
  });
});
