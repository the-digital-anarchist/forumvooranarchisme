import { useState } from "react"
import { bool } from "prop-types"
import Link from "next/link"

import GitHubLogo from "../../public/icons/github.svg"

import Search from "@components/search"

// import { theme } from "@utils"

import {
  TopBarStyled,
  LogoWrapperStyled,
  SearchWrapperStyled,
  NavWrapperStyled,
  NavBarLink,
  LogoImg,
  IconButton,
} from "./styles"

const TopBar = ({ showDocsSearcher, theme, searchIndex, searchText, isFixed = false }) => {
  /* States */
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  /* Methods */
  const handleToggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

  const handleToggleSearchInput = () => setShowMobileSearch(!showMobileSearch)

  return (
    <TopBarStyled isFixed={isFixed} showMobileMenu={showMobileMenu}>
      <LogoWrapperStyled>
        <Link href="/">
          <a>
            <LogoImg alt={theme.siteName} src={`/${theme.logo}`} />
          </a>
        </Link>
        <div>
          {showDocsSearcher && (
            <IconButton onClick={handleToggleSearchInput}>
              <i className="icon-search" />
            </IconButton>
          )}
          <IconButton onClick={handleToggleMobileMenu}>
            {!showMobileMenu ? <i className="icon-menu_icon" /> : <i className="icon-close" />}
          </IconButton>
        </div>
      </LogoWrapperStyled>
      {showDocsSearcher && (
        <SearchWrapperStyled active={showMobileSearch}>
          <div>
            <Search
              handleToggleSearchInput={handleToggleSearchInput}
              showMobileSearch={showMobileSearch}
              searchIndex={searchIndex}
              searchText={searchText}
            />
          </div>
        </SearchWrapperStyled>
      )}
      <NavWrapperStyled showMobileMenu={showMobileMenu}>
        {/* <Link href="/blog" passHref>
          <NavBarLink>Blog</NavBarLink>
        </Link>
        {/* <Link href="/features" passHref>
          <NavBarLink>Features</NavBarLink>
        </Link> */}
        <Link href="/wiki/anarchisme-101" passHref>
          <NavBarLink>Anarchisme 101</NavBarLink>
        </Link>
        <Link href="/wiki" passHref>
          <NavBarLink>Wiki</NavBarLink>
        </Link>
        <Link href="/telegram-feed" passHref>
          <NavBarLink>Telegram feed</NavBarLink>
        </Link>
        <NavBarLink href="https://forum.forumvooranarchisme.nl">Forum</NavBarLink>
      </NavWrapperStyled>
    </TopBarStyled>
  )
}

TopBar.propTypes = {
  showDocsSearcher: bool,
}

export default TopBar
