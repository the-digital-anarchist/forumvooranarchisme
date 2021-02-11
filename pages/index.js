import { useEffect } from "react"
import styled from "styled-components"
import { getGithubPreviewProps, parseJson } from "next-tinacms-github"
import { useGithubJsonForm } from "react-tinacms-github"
import { InlineWysiwyg } from "react-tinacms-editor"
import { InlineForm } from "react-tinacms-inline"
import Router from "next/router"
import { usePlugin, useCMS } from "tinacms"

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
  //     Router.push("/docs")
  //   }
  // })
  const cms = useCMS()

  const formOptions = {
    label: "home page",
    fields: [
      {
        name: "title",
        component: "text",
      },
    ],
  }
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  const [styleData, styleForm] = useGlobalStyleForm(styleFile, preview)

  // const formOptions = {
  //   label: 'Home Page',
  //   fields: [{ name: 'title', component: 'text' }],
  // }

  // const [data, form] = useGithubJsonForm(file, formOptions)
  // usePlugin(form)

  return (
    <Layout theme={styleData}>
      <Head title="Home" />
      <Container className="container">
        <InlineForm form={form}>
          <Title className="title">{data.title}</Title>
          <InlineWysiwyg
            name="markdownBody"
            sticky={"calc(var(--tina-toolbar-height) + var(--tina-padding-small))"}
            imageProps={{
              uploadDir: () => "/images/",
              parse: (media) => media.id,
              previewSrc(src) {
                return cms.media.previewSrc(src)
              },
            }}
          >
            <MarkdownWrapper source={data.markdownBody} />
          </InlineWysiwyg>
        </InlineForm>
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

  if (preview) {
    // get data from github
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: "content/home.json",
        parse: parseJson,
      })
    ).props

    return {
      props: {
        ...file,
        ...global,
      },
    }
  }
  // render from the file system.
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
      ...global,
    },
  }
}

export default Page
