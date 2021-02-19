import { useEffect } from "react"
import Link from "next/link"
import styled from "styled-components"
import Head from "@components/head"
import Layout from "@components/layout"
import Container from "@components/container"
import { getBlogPosts } from "@utils"
import { useGlobalStyleForm } from "@hooks"
import getGlobalStaticProps from "../../utils/getGlobalStaticProps"
import useCreateKieswijzerPage from "../../hooks/useCreateBlogPage"

export const StyledAnchor = styled.a`
  color: inherit;
  text-decoration: inherit; /* no underline */
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`

const Resultaat = (props) => {
  useCreateKieswijzerPage(props.posts)
  const [styleData] = useGlobalStyleForm(props.styleFile, props.preview) // createPost(,3)

  return (
    <Layout theme={styleData}>
      <Head title="Kieswijzer" />
      <Container>
        <h1>Resultaat</h1>
        {/* {props.posts.map((post, index) => (
          <Link key={index} href="kieswijzer/[slug]" as={`kieswijzer/${post.fileName}`}>
            <StyledAnchor>
              <h1>{post.data.frontmatter.title}</h1>
              <p>{post.data.frontmatter.description}</p>
            </StyledAnchor>
          </Link>
        ))} */}
      </Container>
    </Layout>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  try {
    const posts = await getBlogPosts(preview, previewData, "content/kieswijzer")
    const global = await getGlobalStaticProps(preview, previewData)
    if (preview) {
      return {
        props: {
          ...global,
          preview,
          posts,
        },
      }
    }
    return {
      props: {
        ...global,
        posts,
        preview: false,
        error: null,
      },
    }
  } catch (e) {
    return {
      props: {
        ...global,
      },
    }
  }
}

export default Resultaat
