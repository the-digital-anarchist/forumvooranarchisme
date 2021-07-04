import { useEffect, useState } from "react"
import { node, bool, any, string } from "prop-types"
import { useGithubToolbarPlugins } from "react-tinacms-github"
import { ThemeProvider } from "styled-components"

import TopBar from "@components/topbar"
import Footer from "@components/footer"

import { LayoutStyled, LayoutBodyStyled } from "./styles"

const Layout = ({
  children,
  showDocsSearcher,
  splitView,
  theme,
  searchIndex,
  searchText,
  noFooter = false,
  isHomePage = false,
  isWiki = false,
}) => {
  useGithubToolbarPlugins()
  return (
    // if the theme isnt avaible load it from the file system
    <ThemeProvider theme={theme || require("../../content/styles.json")}>
      <LayoutStyled>
        <TopBar
          showDocsSearcher={showDocsSearcher}
          theme={theme || require("../../content/styles.json")}
          searchIndex={searchIndex}
          searchText={searchText}
          isFixed={isHomePage}
        />
        <LayoutBodyStyled isHomePage={isHomePage} isWiki={isWiki} splitView={splitView}>
          {children}
        </LayoutBodyStyled>
        {!noFooter && <Footer />}
      </LayoutStyled>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: node,
  showDocsSearcher: bool,
  splitView: bool,
  searchIndex: string,
  theme: any,
  searchText: string,
  noFooter: bool,
  isHomePage: bool,
  isWiki: bool,
}

Layout.defaultProps = {
  showDocsSearcher: false,
  splitView: false,
  noFooter: false,
  isHomePage: false,
  isWiki: false,
}

export default Layout
