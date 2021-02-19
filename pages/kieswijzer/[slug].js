import { useEffect, useState } from "react"
import Link from "next/link"
import Error from "next/error"
import { useRouter } from "next/router"
import matter from "gray-matter"
import styled from "styled-components"
import { useStateValue } from "../../state/StateProvider"
import { actionTypes } from "../../state/reducer"

import Head from "@components/head"
import Container from "@components/container"
import Layout from "@components/layout"
// import PostFeedback from "@components/post-feedback"
import DocWrapper from "@components/doc-wrapper"
import MarkdownWrapper from "@components/markdown-wrapper"
import { PrimaryAnchor } from "@components/Anchor"
import RichText from "@components/rich-text"
import { createToc, getKieswijzerTheme } from "@utils"
import useCreateKieswijzerPage from "../../hooks/useCreateKieswijzerPage"

export const Button = styled.a`
  bottom: 16px;
  right: 16px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.highlightBorder};
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  color: #1e1c1c;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 14px;
  padding-top: 6px;
  max-width: 264px;
  margin: 0 8px;
  ${({ valueChoice }) =>
    valueChoice &&
    `
    color: #fff !important;
    background-color: #1e1c1c;
  `}
  &:hover {
    color: #fff;
    background-color: #1e1c1c;
  }
  /* @media all and (min-width: 768px) {
    margin-right: 0;
  } */
`
const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  margin: 20px auto;
`

const WrapperControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
`

const WrapperButtonsBlock = styled.div`
  padding: 25px 14px;
  border: 2px solid black;

  @media all and (min-width: 768px) {
    padding: 25px 70px;
    margin: 25px;
  }
`
const Center = styled.h3`
  margin-top: 60px;
  text-align: center;
`
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const getNextUrl = (index, total) => {
  if (index < total) {
    return `/kieswijzer/thema${index + 1}`
  } else {
    return `/kieswijzer/finish`
  }
}

const previousUrl = (index) => (index <= 1 ? "/kieswijzer" : `/kieswijzer/thema${index - 1}`)

const KieswijzerPage = (props) => {
  const router = useRouter()
  const { asPath } = router
  const [state, dispatch] = useStateValue()
  const [valueChoice, setValueChoice] = useState()

  if (!props.file) {
    return <Error statusCode={404} />
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  useCreateKieswijzerPage(props.posts)

  const { data } = props.file
  const { posts } = props

  // false is not importand
  const pickedValueHandler = (value, choseOption) => {
    dispatch({
      Type: actionTypes.CHOSENVALUE,
      themeValue: {
        id: data.frontmatter.id,
        value,
      },
    })
    // console.log(value)
    // const choseOptions = value ? "agreed" : "notAgreed"
    setValueChoice(choseOption)
    console.log(state)
  }

  useEffect(() => {
    console.log("trigger", state)
    if (state.length === 0) {
      setValueChoice(null)
    } else {
      const stateItem = state.find((item) => item.id === data.frontmatter.id)
      console.log(stateItem)
      if (stateItem) {
        console.log("stateitem is here")
        const choseOptions = stateItem.value ? "agreed" : "notAgreed"
        setValueChoice(choseOptions)
      } else {
        console.log("stateitem is not here")
        setValueChoice(null)
      }
    }
  })

  // <Layout searchText="Search blog posts" showDocsSearcher searchIndex="tina-starter-alpaca-Blogs">
  return (
    <Layout>
      <Container>
        <Head title={`${data.frontmatter.title} | Kieswijzer`} />
        <SpaceBetween>
          <p>
            <Link href="/kieswijzer">
              <PrimaryAnchor>kieswijzer</PrimaryAnchor>
            </Link>
          </p>
          <span>
            {data.frontmatter.id}/{posts.length}
          </span>
        </SpaceBetween>
        <DocWrapper styled={false}>
          <RichText>
            <WrapperButtonsBlock>
              <h1>{data.frontmatter.title}</h1>
              <MarkdownWrapper source={data.markdownBody} />

              <Center>Is dit thema belangrijk voor jou?</Center>
              <WrapperButtons>
                <Button
                  valueChoice={valueChoice === "notAgreed" ? true : false}
                  onClick={() => pickedValueHandler(false, "notAgreed")}
                >
                  Niet belangrijk
                </Button>
                <Button
                  valueChoice={valueChoice === "agreed" ? true : false}
                  onClick={() => pickedValueHandler(true, "agreed")}
                >
                  Belangrijk
                </Button>
              </WrapperButtons>
            </WrapperButtonsBlock>
          </RichText>
          {/* <PostFeedback /> */}
        </DocWrapper>
        <WrapperControls>
          <Link href={previousUrl(data.frontmatter.id)}>
            <Button>{"<<"} Vorige</Button>
          </Link>
          <Link href={getNextUrl(data.frontmatter.id, posts.length)}>
            <Button>Volgende >></Button>
          </Link>
        </WrapperControls>
      </Container>
    </Layout>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ params }) {
  console.log(params)
  const { slug } = params
  const fileRelativePath = `content/kieswijzer/${slug}.md`
  let Alltocs = ""

  let posts = await getKieswijzerTheme("content/kieswijzer")

  const content = await import(`../../content/kieswijzer/${slug}.md`)
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
  const contentDir = "content/kieswijzer"
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

export default KieswijzerPage
