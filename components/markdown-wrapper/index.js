import ReactMarkdown from "react-markdown/with-html"
import { shape } from "prop-types"

import CodeBlock from "./CodeBlock"
import Heading from "./Heading"

// import { ReactMarkdowStyled } from "./styles"

const MarkdownWrapper = ({ source, escapeHtml, skipHtml }) => (
  <ReactMarkdown
    source={source}
    escapeHtml={escapeHtml === false ? escapeHtml : true}
    skipHtml={skipHtml ? skipHtml : false}
    renderers={{ code: CodeBlock, heading: Heading }}
  />
)

MarkdownWrapper.propTypes = {
  post: shape(),
}

export default MarkdownWrapper
