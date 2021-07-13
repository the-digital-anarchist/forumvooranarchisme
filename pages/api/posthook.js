import { writeFile } from "fs"
import simpleGit from "simple-git"
import slugify from "slugify"
import { toMarkdownString } from "@utils"
// import tinaGit from "@tinacms/api-git"
// import gitClient from "@tinacms/git-client"
// const git = simpleGit({ baseDir: `${process.cwd()}/` })

import { Octokit } from "@octokit/core"
import { createPullRequest } from "octokit-plugin-create-pull-request"

const MyOctokit = Octokit.plugin(createPullRequest)

const TOKEN = process.env.GITHUB_ACCESS_TOKEN // create token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new MyOctokit({
  auth: TOKEN,
})

export function previewLines(text, maxChars = 300, maxLines = 1) {
  return (
    text
      .slice(0, maxChars)
      .split("\n")
      // Use lines * 2 because markdown requires 2 lines
      .slice(0, maxLines * 2)
      .join("\n") + "..."
  )
}

export default async (req, res) => {
  const request = await JSON.parse(JSON.parse(req.body))
  const { op = null, data = null } = request
  if (op === "CreatePost" || op === "EditPost") {
    console.log(data)
    const { body, name, published, thumbnail_url, ap_id } = data?.post_view.post
    const { name: author, actor_id } = data?.post_view.creator
    const slug = slugify(name, { lower: true })

    const frontMatter = {
      //   date: `${new Date(published * 1000)}`,
      date: published,
      author: author,
      authorUrl: actor_id,
      title: name,
      description: previewLines(body),
      source: ap_id,
      image: thumbnail_url,
    }

    const markdowenSting = toMarkdownString({
      rawFrontmatter: {
        ...frontMatter,
      },
      rawMarkdownBody: body,
    })

    // console.log(markdowenSting)

    // Returns a normal Octokit PR response
    // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
    await octokit
      .createPullRequest({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.REPO,
        title: slug,
        body: "pull request description",
        base: "main" /* optional: defaults to default branch */,
        head: `pull-request-post-${Date.now()}`,
        changes: [
          {
            /* optional: if `files` is not passed, an empty commit is created instead */
            files: {
              [`content/blog/${slug}.md`]: markdowenSting,
              // "path/to/file2.png": {
              //   content: frt,
              //   encoding: "base64",
              // },
              // deletes file if it exists,
              // "path/to/file3.txt": null,
              // updates file based on current content
              // updating file4.txt (if it exists)
              // "path/to/file4.txt": ({ exists, encoding, content }) => {
              //   // do not create the file if it does not exist
              //   if (!exists) return null

              //   return Buffer.from(content, encoding).toString("utf-8").toUpperCase()
              // },
            },
            commit: "Blog post commit",
          },
        ],
      })
      .then((pr) => console.log(pr.data.number))

    res.status(200).end()
  }
}
