import styled from "styled-components"
import { Button } from "../ui"

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  .linksWrapper {
    padding-top: 32px;
  }
  @media all and (min-width: 768px) {
    & > div {
      display: flex;
      align-items: center;
      /* padding: 24px 0; */
    }
    .linksWrapper {
      padding-top: 0;
      border-top: 0;
      display: flex;
    }
  }
`

export const FooterLink = styled.a`
  font-size: 15px;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-bottom: 24px;
  color: #fff;
  @media all and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 40px;
  }
  &:hover {
    text-decoration: underline;
  }
`

export const CreatePostButtonStyle = styled(Button)`
  bottom: 0;
  right: 16px;
  position: fixed;
  margin-bottom: 16px;
`

export const EditWithTinaButton = styled.a`
  bottom: 16px;
  right: 16px;
  position: fixed;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.highlightBorder};
  background-color: #eff6fe;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 14px;
  padding-top: 6px;
  max-width: 264px;
  margin: 0 auto;
  i {
    margin-right: 7px;
    font-size: 18px;
    position: relative;
    top: -2px;
    color: ${({ theme }) => theme.colors.text};
  }
  &:hover {
    /* border-color: #77b1fa; */
    background-color: #000;
    color: #ffffff;
    font-weight: bold;
    i {
      color: #ffffff;
    }
  }
  @media all and (min-width: 768px) {
    margin-right: 0;
  }
`
