import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PricingCard from '../components/PricingCard';

describe('PricingCard', () => {
  it('renders free tier', () => {
    render(
      <PricingCard
        tier="Free"
        price="$0"
        period="forever"
        features={['10 matches/day', 'Basic chat']}
        cta="Get Started"
      />
    );
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('renders popular tier with badge', () => {
    render(
      <PricingCard
        tier="Premium"
        price="$9.99"
        period="month"
        features={['Unlimited matches']}
        popular
        cta="Start Premium"
      />
    );
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });
});
