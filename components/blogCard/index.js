import Link from "next/link"
import styled from "styled-components"
import { Button } from "../ui"

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

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  margin-bottom: 34px;
`

const BlogCard = ({ post }) => {
  const date = new Date(post.data.frontmatter.date)
  const dateOptions = { year: "numeric", month: "long", day: "numeric" }
  return (
    <BlogCardStyled>
      <Link href="blog/[slug]" as={`blog/${post.fileName}`} passHref>
        <StyledAnchor>
          <Title>{post.data.frontmatter.title}</Title>
        </StyledAnchor>
      </Link>
      <Meta>{`${date.toLocaleDateString("en-US", dateOptions)} | ${
        post.data.frontmatter.author
      }`}</Meta>
      <Description>{post.data.frontmatter.description}</Description>
      <Link href="blog/[slug]" as={`blog/${post.fileName}`} passHref>
        <Button>Lees verder</Button>
      </Link>
    </BlogCardStyled>
  )
}

export default BlogCard
