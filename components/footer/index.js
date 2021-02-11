import Link from "next/link"
import { FooterWrapper, FooterLink, EditWithTinaButton } from "./styles"
import { useCMS } from "tinacms"

const Footer = ({ preview }) => {
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
            <Link href="/docs" passHref>
              <FooterLink>Resources</FooterLink>
            </Link>
          </section>
        </div>
      </FooterWrapper>
      <EditLink />
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
export default Footer
