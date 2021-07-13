import styled from "styled-components"

export const Button = styled.a`
  display: blok;
  background-color: white;
  bottom: 16px;
  right: 16px;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.colors.highlightBorder};
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.util};
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 14px;
  padding-top: 6px;
  max-width: 264px;
  width: max-content;
  margin: 44px auto;
  ${({ valueChoice }) =>
    valueChoice &&
    `
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  `}
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
  /* @media all and (min-width: 768px) {
    margin-right: 0;
  } */
`
