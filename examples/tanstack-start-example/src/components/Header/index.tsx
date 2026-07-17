import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  header, logo, logoText, navContainer, desktopNav, navLink, navButton, container, 
  mobileNavToggle, mobileMenu, mobileNavLink
} from "./style";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={header.className}>
      <div className={container.className}>
        <div className={navContainer.className}>
          <Link to="/" className={logo.className} onClick={closeMobileMenu}>
            <div className={logoText.className}>MorphCSS</div>
          </Link>
          
          {/* Desktop Nav */}
          <div className={desktopNav.className}>
            <Link to="/docs" className={navLink.className}>
              Docs
            </Link>
            <Link to="/benchmarks" className={navLink.className}>
              Benchmarks
            </Link>
            <Link to="/installation" className={navLink.className}>
              Installation
            </Link>
            <a
              href="https://github.com/CodeReb00t/morphcss"
              target="_blank"
              rel="noreferrer"
              className={navButton.className}
            >
              GitHub
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className={mobileNavToggle.className} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={mobileMenu.className}>
            <Link to="/docs" className={mobileNavLink.className} onClick={closeMobileMenu}>
              Docs
            </Link>
            <Link to="/benchmarks" className={mobileNavLink.className} onClick={closeMobileMenu}>
              Benchmarks
            </Link>
            <Link to="/installation" className={mobileNavLink.className} onClick={closeMobileMenu}>
              Installation
            </Link>
            <a
              href="https://github.com/CodeReb00t/morphcss"
              target="_blank"
              rel="noreferrer"
              className={mobileNavLink.className}
              onClick={closeMobileMenu}
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
