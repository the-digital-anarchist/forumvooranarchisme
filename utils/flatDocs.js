/*
  This function turns a doc structure like this
  [
    {
      "type": "link",
      "slug": "getting-started/TOP",
      "title": "Getting Started",
      "children": []
    },
    {
      "type": "link",
      "slug": "features/TOP",
      "title": "Features",
      "children": [
        {
          "type": "link",
          "slug": "features/new-child-page-for-features",
          "title": "New cool sub page for Features",
          "children": []
        },
    }
  ]
  and flattens it into this
  [
    {
      "type": "link",
      "slug": "getting-started/TOP",
      "title": "Getting Started",
      "children": []
    },
    {
      "type": "link",
      "slug": "features/TOP",
      "title": "Features",
    },
    {
      "type": "link",
      "slug": "features/new-child-page-for-features",
      "title": "New cool sub page for Features",
      "children": []
    }
  ]
  this is what is used for the next aritical button
*/

const flatDocs = (wiki) =>
  wiki.reduce((newArray, item) => [...newArray, ...[item], ...flatChilds(item.children)], [])

const flatChilds = (wiki) =>
  wiki.reduce(
    (a, b) => a.concat(b.children && b.children.length > 0 ? flatChilds(b.children) : b),
    []
  )

export default flatDocs
