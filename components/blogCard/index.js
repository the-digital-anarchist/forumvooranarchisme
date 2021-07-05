import Link from "next/link"
import styled from "styled-components"

import { StyledAnchor } from "../Anchor"

const BlogCardStyled = styled.div`
  transition: 0.3s;
  padding: 10px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 3px solid black;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.util};
  text-transform: uppercase;
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    font-size: 46px;
  }
`
const Meta = styled.span`
  text-align: center;
  display: block;
  margin-bottom: 32px;
  text-transform: uppercase;
  font-weight: 200;
  font-size: 16px;
`

const Button = styled.a`
  bottom: 16px;
  right: 16px;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.colors.highlightBorder};
  background-color: transparent;
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
  margin: 0 auto 44px;
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

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  margin-bottom: 34px;
`

const BlogCard = ({ post }) => {
  const date = new Date(post.data.frontmatter.date)
  const dateOptions = { year: "numeric", month: "long", day: "numeric" }
  return (
    <Link href="blog/[slug]" as={`blog/${post.fileName}`}>
      <StyledAnchor>
        <BlogCardStyled>
          <Title>{post.data.frontmatter.title}</Title>
          <Meta>{`${date.toLocaleDateString("en-US", dateOptions)} | ${
            post.data.frontmatter.author
          }`}</Meta>
          <Description>{post.data.frontmatter.description}</Description>
          <Button>Lees verder</Button>
        </BlogCardStyled>
      </StyledAnchor>
    </Link>
  )
}

export default BlogCard
