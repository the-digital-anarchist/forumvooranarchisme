import { useState, useEffect } from "react"
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

  const [screenDevice, setScreenDevice] = useState(null)

  useEffect(() => {
    window.screensize = window
      .getComputedStyle(document.querySelector("body"), ":before")
      .getPropertyValue("content")
      .replace(/"/g, "")
    setScreenDevice(window.screensize)
  }, [])

  return (
    <>
      <Layout theme={styleData} isHomePage={true}>
        <Head title="Home" />
        <Container className="container">
          <Title className="title">{data.frontmatter.title}</Title>
          <MarkdownWrapper source={data.markdownBody} />
          {/* <p className="description">{data.description}</p> */}
        </Container>
        {/* {screenDevice !== "mobile" && (
          <IframeContainer>
            <Iframe
              id="preview"
              data-dark-color="FFFFFF"
              src="https://xn--r1a.website/s/forumvooranarchisme"
            ></Iframe>
          </IframeContainer>
        )} */}
      </Layout>
    </>
  )
}

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Iframe = styled.iframe`
  position: fixed;
  right: 0;
  height: 100%;
  border: none;
  border-left: solid 2px;
  z-index: 0;
  bottom: 0;
  width: 320px;
  height: calc(100% - 80px);
`

const IframeContainer = styled.div`
  width: 320px;
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
