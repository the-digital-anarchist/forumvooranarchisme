import Link from "next/link"
import { FooterWrapper, FooterLink, EditWithTinaButton, CreatePostButtonStyle } from "./styles"

import { useCMS } from "tinacms"
import { useRouter } from "next/router"

const Footer = ({ preview }) => {
  const router = useRouter()
  const firstStringInPath = router.asPath.split("/")[1]
  return (
    <>
      <FooterWrapper>
        <div>
          <section className="linksWrapper">
            {/* <Link href="/blog" passHref>
              <FooterLink>Blog</FooterLink>
            </Link> */}
            <Link href="https://forum.forumvooranarchisme.nl" passHref>
              <FooterLink>Forum</FooterLink>
            </Link>
            <Link href="/wiki" passHref>
              <FooterLink>Wiki</FooterLink>
            </Link>
          </section>
        </div>
      </FooterWrapper>
      {firstStringInPath === "wiki" && <EditLink />}
      {firstStringInPath === "blog" && <CreatePostButton />}
    </>
  )
}
export const EditLink = () => {
  const cms = useCMS()
  return (
    <EditWithTinaButton onClick={() => cms.toggle()}>
      <i className="icon-edit" />
      {cms.enabled ? "Exit Edit Mode" : "Edit website"}
    </EditWithTinaButton>
  )
}

const CreatePostButton = () => (
  <Link href="https://forum.forumvooranarchisme.nl/create_post?community_id=20" passHref>
    <CreatePostButtonStyle>Create post</CreatePostButtonStyle>
  </Link>
)

export default Footer
