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
  &:hover {
    color: #fff !important;
    background-color: #1e1c1c;
  }
  /* @media all and (min-width: 768px) {
    margin-right: 0;
  } */
`

const Kieswijzer = (props) => {
  useCreateKieswijzerPage(props.posts)
  const [styleData] = useGlobalStyleForm(props.styleFile, props.preview) // createPost(,3)

  return (
    <Layout theme={styleData}>
      <Head title="Kieswijzer" />
      <Container>
        <h1>Anarchistische Kieswijzer</h1>
        <p>
          Text intro Pour-over biodiesel thundercats freegan ramps, intelligentsia hammock tote bag
          neutra microdosing hell of DIY green juice artisan hexagon. Taiyaki vice disrupt
          readymade. Kale chips affogato etsy, polaroid godard next level intelligentsia banh mi.
          Poke pork belly chicharrones blog distillery messenger bag.
        </p>
        <p>
          Disrupt skateboard neutra tousled viral, taxidermy direct trade slow-carb art party
          church-key. Chambray beard blue bottle venmo. Vape bitters taxidermy, asymmetrical
          leggings whatever photo booth ethical vinyl meggings VHS salvia meh chartreuse waistcoat.
          Poutine artisan PBR&B, truffaut hell of jean shorts blue bottle fam. Squid air plant man
          bun prism. Humblebrag activated charcoal church-key lomo 8-bit 3 wolf moon fixie hexagon
          unicorn cliche truffaut.
        </p>

        <Link
          href={`kieswijzer/${props.posts[0].filename}`}
          as={`kieswijzer/${props.posts[0].fileName}`}
        >
          <Button>START</Button>
        </Link>

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

export default Kieswijzer
