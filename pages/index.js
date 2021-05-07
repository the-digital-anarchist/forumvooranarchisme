import styled from "styled-components"
import matter from "gray-matter"

import Head from "@components/head"
import Layout from "@components/layout"
import Container from "@components/container"
import MarkdownWrapper from "@components/markdown-wrapper"
import getGlobalStaticProps from "../utils/getGlobalStaticProps"
import { useGlobalStyleForm } from "@hooks"

const Page = ({ file, preview, styleFile }) => {
  // can remove this if you want to use the index page
  // useEffect(() => {
  //   const { pathname } = Router
  //   if (pathname == "/") {
  //     Router.push("/wiki")
  //   }
  // })
  const { data } = file
  const [styleData, styleForm] = useGlobalStyleForm(styleFile, preview)

  return (
    <Layout theme={styleData}>
      <Head title="Home" />
      <Container className="container">
        <Title className="title">{data.frontmatter.title}</Title>
        <MarkdownWrapper source={data.markdownBody} />
        {/* <p className="description">{data.description}</p> */}
      </Container>
    </Layout>
  )
}

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  const global = await getGlobalStaticProps(preview, previewData)

  const content = await import(`../content/home.md`)
  const data = matter(content.default)

  // render from the file system.
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.md",
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      },
      ...global,
    },
  }
}

export default Page
