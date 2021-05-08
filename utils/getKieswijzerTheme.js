import matter from "gray-matter"

const getKieswijzerTheme = async (contentDir) => {
  // console.log("contentDir", contentDir)
  const fs = require("fs")
  const files = await getLocalFiles(contentDir)
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(`${file}`, "utf8")
      const data = matter(content)
      return {
        fileName: file.substring(contentDir.length + 1, file.length - 3),
        fileRelativePath: file,
        data: {
          frontmatter: {
            description: data.data.description || "",
            title: data.data.title,
          },
          markdownBody: data.content,
        },
      }
    })
  )
  return posts
}

const getLocalFiles = async (filePath) => {
  // grab all md files
  const fg = require("fast-glob")
  const files = await fg(`${filePath}**/*.md`)
  return files
}

export default getKieswijzerTheme
