import { useState } from "react"
import { array, string } from "prop-types"

import isNavActive from "@utils/isNavActive"
import NavItem from "./nav-item"

import { SideNavStyled, H3Styled } from "./styles"

const SideNav = ({ allNestedDocs, currentSlug, groupIn }) => {
  allNestedDocs.sort((a, b) => {
    var nameA = a.title.toUpperCase() // ignore upper and lowercase
    var nameB = b.title.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1 //nameA comes first
    }
    if (nameA > nameB) {
      return 1 // nameB comes first
    }
    return 0 // names must be equal
  })
  const [showDocs, setShowDocs] = useState(false)
  return (
    <SideNavStyled>
      <H3Styled onClick={() => setShowDocs(!showDocs)} active={showDocs}>
        <i className="icon-arrow_right" />
        Wiki
      </H3Styled>
      <div className={`sideNavDocsList ${showDocs && "active"}`}>
        {allNestedDocs &&
          allNestedDocs.length > 0 &&
          allNestedDocs.map((doc) => (
            <NavItem
              itemData={doc}
              key={doc.id}
              active={isNavActive(doc, currentSlug.join("/"))}
              currentSlug={currentSlug}
            />
          ))}
      </div>
    </SideNavStyled>
  )
}

SideNav.propTypes = {
  allNestedDocs: array,
  currentSlug: array,
  groupIn: string,
}

export default SideNav
