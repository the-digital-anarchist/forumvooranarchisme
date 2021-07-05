import styled, { css } from "styled-components"

export const LayoutStyled = styled.main`
  margin: 0;
  font-family: Roboto, system-ui, sans-serif;
  /* "alte_haas_groteskbold", "Helvetica Neue", Helvetica, Arial, sans-serif */
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 40px;
    margin: 0;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 56px;
    font-weight: 700;
  }
  h1,
  h2,
  h3,
  h4,
  h4,
  h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    & > a {
      text-decoration: none;
    }
  }
`

export const LayoutBodyStyled = styled.main`
  min-height: calc(100vh - 250px);
  max-width: calc(1048px + 40px);
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 1px;
  padding-top: 16px;
  width: 100%;
  display: flex;
  flex: 1;
  ${({ isHomePage }) =>
    isHomePage &&
    css`
      @media all and (min-width: 768px) {
        max-width: 100%;
        width: 100%;
        padding: 80px 0 0 20px;
      }
    `}
  ${({ isWiki }) =>
    isWiki &&
    css`
      @media all and (max-width: 768px) {
        flex-direction: column;
      }
    `}
  ${({ splitView }) =>
    splitView &&
    css`
      @media all and (min-width: 768px) {
        display: flex;
        padding-top: 24px;
      }
    `}
`
