import { useEffect } from "react"
import Link from "next/link"
import Error from "next/error"
import { useRouter } from "next/router"
import { InlineForm, InlineTextField } from "react-tinacms-inline"
import matter from "gray-matter"
import { useGithubMarkdownForm } from "react-tinacms-github"
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github"
import { InlineWysiwyg } from "react-tinacms-editor"
import styled from "styled-components"
import Head from "@components/head"
import Container from "@components/container"
import Layout from "@components/layout"
import Toc from "@components/Toc"
// import PostFeedback from "@components/post-feedback"
import DocWrapper from "@components/doc-wrapper"
import MarkdownWrapper from "@components/markdown-wrapper"
import { PrimaryAnchor } from "@components/Anchor"
import { usePlugin, useCMS } from "tinacms"
import RichText from "@components/rich-text"
import { createToc, getBlogPosts } from "@utils"
import useCreateBlogPage from "../../hooks/useCreateBlogPage"
import { Button } from "../../components/ui"

const dateOptions = { year: "numeric", month: "long", day: "numeric" }

const Meta = styled.span`
  display: block;
  margin-bottom: 32px;
  text-transform: uppercase;
  font-weight: 200;
  font-size: 16px;
`

const ContentWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`

const BreadCrum = styled.p`
  margin-bottom: 24px;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 450px;
  margin: auto;
  display: block;
  margin-bottom: 25px;
`

const BlogPage = (props) => {
  const cms = useCMS()
  const previewURL = props.previewURL || ""
  const router = useRouter()
  const { asPath } = router

  if (!props.file) {
    return <Error statusCode={404} />
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  useCreateBlogPage(props.posts)
  const formOptions = {
    label: "Edit doc page",
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
    ],
  }

  const [data, form] = useGithubMarkdownForm(props.file, formOptions)
  usePlugin(form)
  const date = new Date(data.frontmatter.date)
  const { title, author, authorUrl, image, source } = data.frontmatter

  return (
    <Layout>
      <Container>
        <BreadCrum>
          <Link href="/blog">
            <PrimaryAnchor>Blog</PrimaryAnchor>
          </Link>{" "}
          / {data.frontmatter.title}
        </BreadCrum>
        <Head title={`${title} | Blog`} />
        {image && <Img src={image} alt={title} />}
        <InlineForm form={form}>
          <DocWrapper styled={false}>
            <RichText>
              <main>
                <h1>
                  <InlineTextField name="frontmatter.title" />
                </h1>

                {authorUrl ? (
                  <Meta>
                    {`${date.toLocaleDateString("en-US", dateOptions)} | `}{" "}
                    <a href={authorUrl}>{author}</a>
                  </Meta>
                ) : (
                  <Meta>{`${date.toLocaleDateString("en-US", dateOptions)} | ${author}`}</Meta>
                )}

                {/* {!props.preview && props.Alltocs.length > 0 && <Toc tocItems={props.Alltocs} />} */}
                <ContentWrapper>
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
                </ContentWrapper>
              </main>
            </RichText>
            {/* <PostFeedback /> */}
          </DocWrapper>
        </InlineForm>
        {source && (
          <Link href={source + "#comments"} passHref>
            <Button>Comments</Button>
          </Link>
        )}
      </Container>
    </Layout>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params
  const fileRelativePath = `content/blog/${slug}.md`
  let Alltocs = ""

  let posts = await getBlogPosts()
  if (preview) {
    const previewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    })
    if (typeof window === "undefined") {
      Alltocs = createToc(previewProps.props.file.data.markdownBody)
    }
    return {
      props: {
        posts,
        Alltocs,
        previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
        ...previewProps.props,
      },
    }
  }

  const content = await import(`../../content/blog/${slug}.md`)
  const data = matter(content.default)

  if (typeof window === "undefined") {
    Alltocs = createToc(data.content)
  }
  return {
    props: {
      posts,
      Alltocs,
      sourceProvider: null,
      error: null,
      preview: false,
      // the markdown file
      file: {
        fileRelativePath,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      },
    },
  }
}

export const getStaticPaths = async function () {
  const fg = require("fast-glob")
  const contentDir = "content/blog"
  const files = await fg(`${contentDir}**/*.md`)
  const paths = files
    .filter((file) => !file.endsWith("index.md"))
    .map((file) => {
      const path = file.substring(contentDir.length + 1, file.length - 3)
      return { params: { slug: path } }
    })
  return {
    fallback: true,
    paths,
  }
}

export default BlogPage
