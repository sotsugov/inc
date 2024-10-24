import { render, screen } from '@testing-library/react';
import { SiteHeader } from '../header';

// Mock the next/link component
jest.mock('next/link', () => {
  const NextLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  NextLink.displayName = 'NextLink';
  return NextLink;
});

// Mock the ModeToggle component
jest.mock('../theme-dropdown', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

// Mock the Avatar components
jest.mock('../ui/avatar', () => ({
  Avatar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div className={className} data-testid="avatar">
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar-fallback">{children}</div>
  ),
}));

describe('SiteHeader', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('renders correctly', () => {
    render(<SiteHeader user={mockUser} />);

    // Test the logo link
    const logoLink = screen.getByRole('link', { name: /increment/i });
    expect(logoLink).toBeInTheDocument();

    // Test the heading text
    expect(screen.getByText('API credit usage dashboard')).toBeInTheDocument();

    // Test avatar
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toHaveAttribute(
      'src',
      mockUser.avatar,
    );
    expect(screen.getByTestId('avatar-image')).toHaveAttribute(
      'alt',
      mockUser.username,
    );

    // Test avatar fallback
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent(
      mockUser.username,
    );

    // Test the mode toggle
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('maintains correct layout structure', () => {
    render(<SiteHeader user={mockUser} />);

    // Test the main container layout
    const mainContainer = screen.getByRole('banner').firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('flex items-center justify-between');

    // Test the right side container
    const rightContainer = screen.getByTestId('mode-toggle')
      .parentElement as HTMLElement;
    expect(rightContainer).toHaveClass('flex flex-row items-center gap-x-6');
  });
});
