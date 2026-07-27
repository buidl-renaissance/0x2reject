import styled from 'styled-components';
import type { MouseEvent } from 'react';

const Float = styled.a`
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 40;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.15rem;
  border-radius: 999px;
  border: 1px solid #4f46e5;
  background: #1a1a1a;
  color: #c7d2fe;
  font-family: 'IBM Plex Mono', 'SF Mono', ui-monospace, monospace;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  text-decoration: none;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;

  &:hover {
    background: #4f46e5;
    color: #fff;
    transform: translateY(-1px);
  }
`;

type Props = {
  href: string;
  label?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function FloatingTextJohn({
  href,
  label = 'Text John',
  onClick,
}: Props) {
  return (
    <Float href={href} onClick={onClick}>
      {label}
    </Float>
  );
}
